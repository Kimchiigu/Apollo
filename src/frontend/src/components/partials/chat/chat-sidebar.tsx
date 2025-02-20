'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Search } from 'lucide-react';

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
  status: string;
  messages: Message[];
}

interface ChatListProps {
  chats: Chat[];
  onChatSelect: (chatId: number) => void;
  selectedChat: number | null;
}

export default function ChatList({
  chats,
  onChatSelect,
  selectedChat,
}: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getUnreadCount = (chat: Chat) => {
    return chat.messages.filter((msg) => !msg.read && msg.sender === 'other')
      .length;
  };

  const getLastMessage = (chat: Chat) => {
    // Sort msg
    return [...chat.messages].sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
    )[0];
  };

  const filteredChats = chats
    .filter((chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const lastMessageA = getLastMessage(a);
      const lastMessageB = getLastMessage(b);
      return (
        lastMessageB.timestamp.getTime() - lastMessageA.timestamp.getTime()
      );
    });

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-md focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => {
          const lastMessage = getLastMessage(chat);
          const unreadCount = getUnreadCount(chat);

          return (
            <div
              key={chat.id}
              className={`flex items-center space-x-4 p-4 hover:bg-gray-50 cursor-pointer ${
                selectedChat === chat.id ? 'bg-purple-50' : ''
              }`}
              onClick={() => onChatSelect(chat.id)}
            >
              {/* <Avatar src={chat.avatar} alt={chat.name} />
               */}
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h2 className="text-sm font-semibold truncate">
                    {chat.name}
                  </h2>
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(lastMessage.timestamp)}
                  </span>
                </div>
                <p
                  className={`text-sm truncate ${
                    !lastMessage.read && lastMessage.sender === 'other'
                      ? 'font-semibold text-gray-900'
                      : 'text-gray-500'
                  }`}
                >
                  {lastMessage.sender === 'user' ? 'You: ' : ''}
                  {lastMessage.content}
                </p>
              </div>
              {unreadCount > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
