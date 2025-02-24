'use client';

import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Mic, Send, MoreVertical, Phone, Paperclip } from 'lucide-react';
import CountdownTimer from '../countdown-timer/countdown-timer';

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
  isPast: boolean;
  specialization: string;
}

interface ChatInterfaceProps {
  chatId: number;
  onMessageSend: (chatId: number, message: Message) => void;
  chats: Chat[];
}

export default function ChatInterface({
  chatId,
  onMessageSend,
  chats,
}: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentChat = chats.find((c) => c.id === chatId) || chats[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        content: newMessage,
        sender: 'user',
        timestamp: new Date(),
        read: true,
      };
      onMessageSend(chatId, message);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="bg-[#516AF5] p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-white font-medium">{currentChat.name}</h2>
            <p className="text-white/80 text-sm">
              {currentChat.specialization
                ? `${currentChat.specialization} • `
                : ''}
              {currentChat.status}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <CountdownTimer initialMinutes={60} />
          <button className="text-white hover:text-white/80">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-blue-50">
        <div className="space-y-4">
          {[...currentChat.messages]
            .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
            .map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-[#516AF5] text-white'
                      : 'bg-white text-[#516AF5]'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t p-3">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-blue-50 border-0 focus:ring-1 focus:ring-[#516AF5] px-4 py-2 text-black"
          />
          <button
            className="rounded-full bg-[#516AF5] hover:bg-[#516AF5]/80 text-white p-2"
            onClick={handleSendMessage}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
