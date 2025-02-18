import { useState, useEffect } from 'react';
import { backend_service_chat } from '@/declarations/backend_service_chat';
import { Principal } from '@dfinity/principal';

// Define types
interface User {
  username: string;
  principal: Principal;
}

interface Message {
  sender: string;
  text: string;
  time: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [user, setUser] = useState<string | null>(null);
  const [receiver, setReceiver] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const fetchedUsers: User[] = await backend_service_chat.getUsers();
    setUsers(fetchedUsers);
  };

  const registerUser = async (username: string) => {
    const result = await backend_service_chat.registerUser(username);
    alert(result);
    fetchUsers();
    setUser(username);
  };

  const fetchMessages = async () => {
    if (!receiver) return;
    const receiverPrincipal = Principal.fromText(receiver);
    const messagesHistory =
      await backend_service_chat.getMessagesWith(receiverPrincipal);
    setMessages(
      messagesHistory.map((msg: any) => ({
        sender: msg.sender.toText(),
        text: msg.content,
        time: new Date(
          Number(msg.timestamp / BigInt(1_000_000)),
        ).toLocaleTimeString(),
      })),
    );
  };

  const sendMessage = async () => {
    if (newMessage.trim() === '' || !receiver) return;

    const receiverPrincipal = Principal.fromText(receiver);
    await backend_service_chat.sendMessage(receiverPrincipal, newMessage);
    setNewMessage('');
    fetchMessages();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-blue-600 text-white text-center py-4 text-xl font-bold">
        Chat Room
      </div>

      <div className="p-4 flex space-x-2">
        {!user && (
          <>
            <input
              type="text"
              className="border p-2"
              placeholder="Enter username"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === 'Enter' &&
                registerUser((e.target as HTMLInputElement).value)
              }
            />
          </>
        )}
        {user && (
          <select
            className="border p-2"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setReceiver(e.target.value)
            }
            value={receiver}
          >
            <option value="">Select Receiver</option>
            {users.map((u, index) => (
              <option key={index} value={u.principal.toText()}>
                {u.username}
              </option>
            ))}
          </select>
        )}
        <button
          className="bg-green-600 text-white px-4 py-2"
          onClick={fetchMessages}
        >
          Load Messages
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-lg max-w-xs ${msg.sender === user ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-black'}`}
          >
            <p className="text-sm font-semibold">{msg.sender}</p>
            <p>{msg.text}</p>
            <p className="text-xs text-gray-500 text-right">{msg.time}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 border-t bg-white">
        <input
          type="text"
          className="flex-1 border rounded-lg p-2 outline-none"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewMessage(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' && sendMessage()
          }
        />
        <button
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
