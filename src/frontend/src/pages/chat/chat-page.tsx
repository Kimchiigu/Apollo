'use client';

import { useEffect, useState } from 'react';
import ChatInterface from '../../components/partials/chat/chat-interface';
import ChatList from '../../components/partials/chat/chat-sidebar';
import { Menu, X } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'other';
  timestamp: Date;
  read: boolean;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'typing';
  messages: Message[];
}

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);

  // TODO
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('/public/temp_db/chats.json');
        if (!response.ok) {
          throw new Error('Failed to fetch chat data');
        }

        const data = await response.json();

        const formattedChats: Chat[] = data.map((chat: Chat) => ({
          ...chat,
          messages: chat.messages.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }));

        setChats(formattedChats);
      } catch (error) {
        console.error('Error loading chats:', error);
      }
    };

    fetchChats();
  }, []);

  //TODO
  const handleChatSelect = (chatId: number) => {
    setSelectedChat(chatId);
    setIsSidebarOpen(false);

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) => ({ ...msg, read: true })),
            }
          : chat,
      ),
    );
  };

  //TODO
  const handleMessageSend = (chatId: number, message: Message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, message].sort(
                (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
              ),
            }
          : chat,
      ),
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-1/3 max-w-md bg-white border-r">
        <ChatList
          chats={chats}
          onChatSelect={handleChatSelect}
          selectedChat={selectedChat}
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition duration-200 ease-in-out z-30 w-64 bg-white shadow-lg`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Chats</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <ChatList
          chats={chats}
          onChatSelect={handleChatSelect}
          selectedChat={selectedChat}
        />
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b md:hidden">
          <div className="px-4 py-3 flex justify-between items-center">
            <button
              className="p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold">Chats</h1>
            <div className="w-6"></div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          {selectedChat ? (
            <ChatInterface
              chatId={selectedChat}
              onMessageSend={handleMessageSend}
              chats={chats}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
