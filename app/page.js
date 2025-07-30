"use client";
import React, { useState, useEffect, useRef } from 'react';

// Mock data
const initialChats = [
  {
    id: 1,
    title: "Project Ideas",
    messages: [
      { id: 1, role: "ai", content: "Let's brainstorm some innovative ideas!" },
    ],
  },
  {
    id: 2,
    title: "Travel Plans",
    messages: [
      { id: 1, role: "ai", content: "Where should we explore next?" },
    ],
  },
  {
    id: 3,
    title: "Shopping List",
    messages: [
      { id: 1, role: "ai", content: "Don't forget the oranges!" },
    ],
  },
  {
    id: 4,
    title: "Code Review",
    messages: [
      { id: 1, role: "ai", content: "Here are some suggestions..." },
    ],
  },
  {
    id: 5,
    title: "Design Feedback",
    messages: [
      { id: 1, role: "ai", content: "The layout looks fantastic!" },
    ],
  },
];

const mockAIResponses = [
  "Interesting question! Let me think about that...",
  "Sure, I can help with that!",
  "Can you clarify a bit more?",
  "Here's something you might find useful.",
  "That's a great idea!",
  "Let me look that up for you.",
  "I'd be happy to assist you with that.",
];

// Dark Mode Toggle Component
function DarkModeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors duration-200"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
        </svg>
      )}
    </button>
  );
}

// Chat Sidebar Component
function ChatSidebar({ selectedChatId, onSelectChat, onNewChat, onClose, isDark }) {
  const bgClass = isDark ? 'bg-gray-800 border-gray-700' : 'bg-orange-50 border-orange-200';
  const textClass = isDark ? 'text-orange-400' : 'text-orange-500';
  const buttonClass = isDark ? 'bg-orange-500 hover:bg-orange-600' : 'bg-orange-400 hover:bg-orange-500';
  const itemClass = isDark ? 'border-gray-700' : 'border-orange-100';
  const selectedClass = isDark ? 'bg-gray-700 text-orange-400' : 'bg-white text-orange-500';
  const hoverClass = isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-orange-50 text-black';
  const closeButtonClass = isDark ? 'bg-gray-700 border-gray-600 text-orange-400 hover:bg-gray-600' : 'bg-white border-orange-300 text-orange-500 hover:bg-orange-100';

  return (
    <aside className={`w-64 ${bgClass} border-r flex flex-col h-full`}>
      <div className="flex items-center justify-between p-4 relative">
        <button
          className={`absolute left-0 top-1/2 -translate-y-1/2 ${closeButtonClass} border rounded-full px-2 py-1 font-bold shadow focus:outline-none transition-colors`}
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ⟨
        </button>
        <span className={`font-bold ${textClass} text-lg mx-auto`}>Chats</span>
        <button
          className={`${buttonClass} text-white rounded-full px-3 py-1 text-sm font-medium absolute right-0 top-1/2 -translate-y-1/2 transition-colors`}
          onClick={onNewChat}
        >
          New
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {initialChats.map((chat) => (
          <button
            key={chat.id}
            className={`w-full text-left px-4 py-3 border-b ${itemClass} transition-colors duration-150 focus:outline-none ${
              selectedChatId === chat.id ? `${selectedClass} font-semibold` : hoverClass
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            <div className="truncate font-medium">{chat.title}</div>
            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-orange-400'} truncate`}>
              {chat.messages[0]?.content}
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
}

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
function ChatMessages({ messages, isTyping, onEditLast, onDelete, onFileClick, isDark }) {
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
                <img src="/logo.png" alt="Hamhey AI Logo" className="w-full h-full object-cover" />
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

// Chat Input Component
function ChatInput({ value, onChange, onSend, onFile, onVoice, disabled, isDark }) {
  const fileInputRef = useRef();
  const bgClass = isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200';
  const iconClass = isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-100';
  const inputClass = isDark ? 'text-gray-200 placeholder:text-gray-500' : 'text-gray-700 placeholder:text-gray-400';

  return (
    <div className="w-full px-2 py-2">
      <div className={`flex items-center ${bgClass} border rounded-full px-4 py-2`}>
        <button
          type="button"
          className={`mr-2 p-0.5 rounded-full ${iconClass} focus:outline-none transition-colors`}
          onClick={() => fileInputRef.current.click()}
          disabled={disabled}
          aria-label="Upload file"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 13.5V7a4.5 4.5 0 0 0-9 0v7a6 6 0 0 0 12 0V9"/>
          </svg>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={onFile}
            disabled={disabled}
          />
        </button>
        <button
          type="button"
          className={`mr-3 p-0.5 rounded-full ${iconClass} focus:outline-none transition-colors`}
          onClick={onVoice}
          disabled={disabled}
          aria-label="Voice input"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v2m0 0h3m-3 0H9m6-6a3 3 0 1 1-6 0V7a3 3 0 1 1 6 0v7z"/>
          </svg>
        </button>
        <input
          className={`flex-1 bg-transparent border-none outline-none ${inputClass} px-0 py-0 text-base`}
          placeholder="Message Hamhey AI..."
          value={value}
          onChange={onChange}
          onKeyDown={e => e.key === "Enter" && onSend()}
          disabled={disabled}
          style={{ minWidth: 0 }}
        />
        <button
          type="button"
          onClick={onSend}
          disabled={!value.trim() || disabled}
          className="ml-2 w-10 h-10 flex items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Main Chat Component
export default function HamheyAIChat() {
  const [chats, setChats] = useState(initialChats);
  const [selectedChatId, setSelectedChatId] = useState(initialChats[0].id);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [editingMsg, setEditingMsg] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(true); // Default to dark mode
  const [isDesktop, setIsDesktop] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      if (desktop) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const selectedChat = chats.find((c) => c.id === selectedChatId);
  const messages = selectedChat ? selectedChat.messages : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, selectedChatId]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    if (editingMsg) {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === selectedChatId
            ? {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg.id === editingMsg.id ? { ...msg, content: input } : msg
                ),
              }
            : chat
        )
      );
      setEditingMsg(null);
      setInput("");
      return;
    }

    const userMsg = {
      id: Date.now(),
      role: "user",
      content: input,
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChatId
          ? { ...chat, messages: [...chat.messages, userMsg] }
          : chat
      )
    );
    
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        role: "ai",
        content: mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)],
      };
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === selectedChatId
            ? { ...chat, messages: [...chat.messages, aiMsg] }
            : chat
        )
      );
      setIsTyping(false);
    }, 1500);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const userMsg = {
      id: Date.now(),
      role: "user",
      content: `Sent a file: ${file.name}`,
      file: { name: file.name },
    };
    
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChatId
          ? { ...chat, messages: [...chat.messages, userMsg] }
          : chat
      )
    );
    
    setInput("");
    setIsTyping(true);
    
    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        role: "ai",
        content: `Received your file (${file.name})! How can I help you with it?`,
      };
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === selectedChatId
            ? { ...chat, messages: [...chat.messages, aiMsg] }
            : chat
        )
      );
      setIsTyping(false);
    }, 1500);
  };

  const handleVoice = () => {
    setInput("[Voice message]");
  };

  const handleEditLast = (msg) => {
    setEditingMsg(msg);
    setInput(msg.content);
  };

  const handleDelete = (msg) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChatId
          ? { ...chat, messages: chat.messages.filter((m) => m.id !== msg.id) }
          : chat
      )
    );
    setEditingMsg(null);
    setInput("");
  };

  const handleFileClick = (file) => {
    alert(`Opening file: ${file.name}`);
  };

  const handleSelectChat = (id) => {
    setSelectedChatId(id);
    setEditingMsg(null);
    setInput("");
    if (!isDesktop) setSidebarOpen(false);
  };

  const handleNewChat = () => {
    const newId = Date.now();
    const newChat = {
      id: newId,
      title: `New Chat ${chats.length + 1}`,
      messages: [
        { id: newId, role: "ai", content: "Hi! How can I help you today?" },
      ],
    };
    setChats((prev) => [newChat, ...prev]);
    setSelectedChatId(newId);
    setEditingMsg(null);
    setInput("");
    if (!isDesktop) setSidebarOpen(false);
  };

  const mainBgClass = isDark 
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    : 'bg-gradient-to-b from-white to-orange-50';
    
  const headerBgClass = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const headerTextClass = isDark ? 'text-gray-200' : 'text-gray-900';
  const subtitleClass = isDark ? 'text-gray-400' : 'text-gray-400';
  const menuButtonClass = isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600';

  return (
    <div className={`flex h-screen ${mainBgClass}`}>
      {/* Sidebar Overlay */}
      {sidebarOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`
          fixed md:relative top-0 left-0 h-full z-40
          transition-transform duration-300
          w-64
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${isDesktop ? "" : "md:translate-x-0"}
        `}
        style={{ minWidth: sidebarOpen ? 256 : 0 }}
      >
        <ChatSidebar
          selectedChatId={selectedChatId}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          onClose={() => setSidebarOpen(false)}
          isDark={isDark}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Header */}
        <header className={`relative flex items-center justify-between gap-4 px-6 py-3 ${headerBgClass} border-b shadow-sm z-10`}>
          <div className="flex items-center gap-3">
            {/* Menu Button */}
            <button
              className={`${menuButtonClass} rounded-lg p-2 transition-colors duration-200`}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
            
            {/* Logo and Title */}
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Hamhey AI Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg ${headerTextClass}`}>Hamhey AI</span>
              <span className={`text-sm ${subtitleClass} leading-tight`}>Always here to help</span>
            </div>
          </div>
          
          <DarkModeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </header>

        {/* Chat Messages */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatMessages
            messages={messages}
            isTyping={isTyping}
            onEditLast={handleEditLast}
            onDelete={handleDelete}
            onFileClick={handleFileClick}
            isDark={isDark}
          />
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSend={handleSend}
          onFile={handleFile}
          onVoice={handleVoice}
          disabled={isTyping}
          isDark={isDark}
        />
      </div>
    </div>
  );
}