import { useState, useEffect } from 'react';
import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from '@/declarations/backend_service_chat';
import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';
import { useAuth } from '../../hooks/use-auth-client';

// Define types
interface User {
  username: string;
  principal: string;
}

interface Message {
  sender: string;
  text: string;
  time: string;
}

const getUserActor = async () => {
  const authClient = await AuthClient.create();
  const identity = authClient.getIdentity();

  const canisterId = process.env.CANISTER_ID_BACKEND_SERVICE_CHAT;
  if (!canisterId) {
    throw new Error('Canister ID is missing! Check your .env file.');
  }

  const agent = new HttpAgent({ identity });
  await agent.fetchRootKey();

  return Actor.createActor(idlFactory, {
    agent,
    canisterId: canisterId as string,
  });
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [session, setSession] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [sessions, setSessions] = useState<string[]>([]);
  const { principal, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && principal) {
      initializeUser();
      const interval = setInterval(() => {
        fetchUsers();
        fetchSessions();
        fetchMessages();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [session, isAuthenticated, principal]);

  const initializeUser = async () => {
    if (!principal) return;
    await fetchUsers();
    await fetchSessions();
  };

  const fetchUsers = async () => {
    const userActor = await getUserActor();
    const fetchedUsers = (await userActor.getUsers()) as any[];
    const mappedUsers: User[] = fetchedUsers.map((u) => ({
      username: u.username as string,
      principal: (u.principal as Principal).toText(),
    }));
    setUsers(mappedUsers);
  };

  const fetchSessions = async () => {
    const userActor = await getUserActor();
    const fetchedSessions: string[] =
      (await userActor.getSessions()) as string[];
    setSessions(fetchedSessions);
  };

  const createSession = async () => {
    if (!session.trim()) return;
    const userActor = await getUserActor();
    await userActor.createSession(session);
    setSession('');
    await fetchSessions();
  };

  const joinSession = async (selectedSession: string) => {
    setSession(selectedSession);
  };

  const fetchMessages = async () => {
    if (!session) return;
    const userActor = await getUserActor();
    const messagesHistory = (await userActor.getMessages(session)) as any[];
    setMessages(
      messagesHistory.map((msg: any) => ({
        sender: (msg.sender as Principal).toText(),
        text: msg.content as string,
        time: new Date(Number(msg.timestamp) / 1_000_000).toLocaleTimeString(),
      })),
    );
  };

  const sendMessage = async () => {
    if (newMessage.trim() === '' || !session) return;
    const userActor = await getUserActor();
    await userActor.sendMessage(session, newMessage);
    setNewMessage('');
    await fetchMessages();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white p-4 border-r overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Chat Sessions</h2>
        {isAuthenticated && principal && (
          <div className="p-2 bg-green-300 text-black font-semibold rounded-lg mb-2">
            Logged in as: {`User_${principal.slice(-6)}`}
          </div>
        )}
        <input
          type="text"
          className="border rounded-lg p-2 w-full mb-2"
          placeholder="Enter session name"
          value={session}
          onChange={(e) => setSession(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg w-full mb-4"
          onClick={createSession}
        >
          Create Session
        </button>
        <ul>
          {sessions.map((s, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer ${session === s ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => joinSession(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-3/4 flex flex-col">
        <div className="bg-blue-600 text-white text-center py-4 text-xl font-bold">
          {session ? `Session: ${session}` : 'Select or Create a Session'}
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-3 rounded-lg max-w-xs ${msg.sender === principal ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-black'}`}
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
    </div>
  );
}
