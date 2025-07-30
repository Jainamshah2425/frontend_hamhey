"use client";
import Image from "next/image";
import React from 'react';
import EditIcon from './EditIcon';

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
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <p className="text-xl mb-2 text-orange-500 font-semibold">Welcome to Hamhey AI!</p>
          <p className={welcomeTextClass}>Start a conversation by typing a message below. Here are some ideas:</p>
          <div className="flex justify-center gap-2 mt-4">
            <button className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm">"What's the weather?"</button>
            <button className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm">"Tell me a joke"</button>
            <button className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm">"Explain quantum computing"</button>
          </div>
        </div>
      )}
      {messages.map((msg, idx) => (
        <div
          key={msg.id || idx}
          className={`group flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-center gap-2`}
        >
          {msg.role === "ai" && (
            <>
              <div className="mr-2 flex-shrink-0 flex items-end">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <img src="/logo.png" alt="Hamhey AI Logo" className="w-full h-full object-cover" />
                </div>
              </div>
              <div
                className={`relative max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-2xl shadow-md text-sm break-words ${
                  isDark
                    ? "bg-gray-700 text-gray-200 rounded-bl-lg"
                    : "bg-gray-200 text-gray-800 rounded-bl-lg"
                }`}
              >
                {msg.content}
              </div>
            </>
          )}

          {msg.role === "user" && (
            <>
              <button
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onEditLast && onEditLast(msg)}
              >
                <EditIcon className={isDark ? "text-gray-400" : "text-gray-500"} />
              </button>
              <div
                className={`relative max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-2xl shadow-md text-sm break-words ${
                  isDark 
                    ? "bg-blue-800 text-white rounded-br-lg"
                    : "bg-orange-500 text-white rounded-br-lg"
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
              </div>
            </>
          )}
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
