"use client";
import Image from "next/image";
import React from 'react';

// Typing Indicator Component
function TypingIndicator({ isDark }) {
  const bgClass = isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-orange-200';
  
  return (
    <div className={`flex items-center space-x-2 p-3 ${bgClass} rounded-2xl shadow-sm border max-w-xs animate-pulse`}>
      <span className="text-orange-500 text-sm">AI is typing</span>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      </div>
    </div>
  );
}

// Chat Messages Component
export default function ChatMessages({ messages, isTyping, onEditLast, onDelete, onFileClick, isDark }) {
  const welcomeTextClass = isDark ? 'text-gray-300' : 'text-black';
  
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 && (
        <div className="text-center mt-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-500 flex items-center justify-center">
            <Image src="/logo.png" alt="Hamhey AI Logo" width={80} height={80} />
          </div>
          <p className="text-xl mb-2 text-orange-500 font-semibold">Welcome to Hamhey AI!</p>
          <p className={welcomeTextClass}>Start a conversation by typing a message below.</p>
        </div>
      )}
      {messages.map((msg, idx) => (
        <div
          key={msg.id || idx}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end`}
        >
          {msg.role === "ai" && (
            <div className="mr-2 flex-shrink-0 flex items-end">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                <Image src="/logo.png" alt="Hamhey AI Logo" width={32} height={32} />
              </div>
            </div>
          )}
          <div
            className={`relative max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-2xl shadow-sm text-sm break-words ${
              msg.role === "user"
                ? isDark 
                  ? "bg-gray-700 text-gray-200 rounded-br-md border border-gray-600"
                  : "bg-orange-100 text-black rounded-br-md border border-orange-200"
                : isDark
                  ? "bg-gray-800 text-orange-400 border border-gray-600 rounded-bl-md"
                  : "bg-white text-orange-500 border border-orange-400 rounded-bl-md"
            }`}
          >
            {msg.content}
            {msg.file && (
              <button
                className="block mt-2 text-xs text-orange-500 underline"
                onClick={() => onFileClick && onFileClick(msg.file)}
              >
                {msg.file.name}
              </button>
            )}
            {msg.role === "user" && idx === messages.length - 1 && (
              <div className="flex gap-2 mt-2 justify-end">
                <button
                  className="text-xs text-orange-500 hover:underline"
                  onClick={() => onEditLast && onEditLast(msg)}
                >
                  Edit
                </button>
                <button
                  className="text-xs text-orange-600 hover:underline"
                  onClick={() => onDelete && onDelete(msg)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex justify-start">
          <TypingIndicator isDark={isDark} />
        </div>
      )}
    </div>
  );
}