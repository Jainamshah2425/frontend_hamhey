"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  PenSquare,
  Search,
  MessageSquare,
  Users,
  Settings,
  Plus,
  Mic,
  Paperclip,
  ArrowUp,
  Menu,
  Sun,
  Moon,
  Sparkles,
  PenLine,
} from "lucide-react"

const sidebarItems = [
  { icon: PenSquare, label: "New Chat", id: "new-chat" },
  { icon: Search, label: "Search", id: "search" },
  { icon: MessageSquare, label: "Chats", id: "chats" },
  { icon: Users, label: "Team", id: "team" },
  { icon: Settings, label: "Settings", id: "settings" },
]

const mockChats = [
  { id: 1, title: "Project Planning", preview: "Let's discuss the roadmap...", time: "2h ago" },
  { id: 2, title: "Code Review", preview: "Here are some suggestions...", time: "1d ago" },
  { id: 3, title: "Design Ideas", preview: "What about this layout?", time: "3d ago" },
  { id: 4, title: "Marketing Strategy", preview: "The campaign looks great...", time: "1w ago" },
]

const mockAIResponses = [
  "I'd be happy to help you with that! Let me break this down step by step.",
  "That's a great question. Here's what I think would work best for your situation.",
  "I can definitely assist you with this. Let me provide some detailed insights.",
  "Excellent! I can see you're thinking strategically about this. Here's my take.",
  "Let me help you explore this topic thoroughly with some comprehensive information.",
]

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeItem, setActiveItem] = useState("chats")
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingMessageContent, setEditingMessageContent] = useState("");
  const messagesEndRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("hamhey-theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark)

    setIsDark(shouldBeDark)
    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("hamhey-theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("hamhey-theme", "light")
    }
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleEdit = (message) => {
    setEditingMessageId(message.id);
    setEditingMessageContent(message.content);
  };

  const handleSave = (messageId) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, content: editingMessageContent } : m
      )
    );
    setEditingMessageId(null);
  };

  const handleNewChat = () => {
    setMessages([])
    setSelectedChat(null)
    setActiveItem("new-chat")
  }

  const handleChatSelect = (chat) => {
    setSelectedChat(chat)
    setMessages([
      {
        id: 1,
        role: "assistant",
        content: `Continuing our conversation about "${chat.title}". How can I help you further?`,
        timestamp: new Date(),
      },
    ])
    setActiveItem("chats")
  }

  if (!mounted) return null

  return (
    <div
      className="flex h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 p-2">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id)
                  if (item.id === "new-chat") handleNewChat()
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  activeItem === item.id
                    ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                title={item.label}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Chat History */}
          {sidebarOpen && activeItem === "chats" && (
            <div className="mt-6">
              <h3
                className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Recent Chats
              </h3>
              <div className="space-y-1">
                {mockChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleChatSelect(chat)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors group ${
                      selectedChat?.id === chat.id
                        ? "bg-orange-100 dark:bg-orange-900/30"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{chat.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{chat.preview}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{chat.time}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full 
               flex items-center justify-center">
              <Image src="/logo.png" alt="Hamhey User" width={20} height={20} />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Hamhey User</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Free Plan</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full  p-1.5">
                <Image src="/logo.png" alt="Hamhey User" width={32} height={32} className="w-8 h-8 object-contain" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Hamhey AI</h1>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8">
              <div
                className="w-16 h-16 rounded-full  flex items-center justify-center mb-6 shadow-lg">
                <Image
                  src="/logo.png"
                  alt="Hamhey User"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain " />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Every step made simple.</h2>
              <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                {/* Start a conversation with Hamhey AI. Ask questions, get help with tasks, or just chat! */}
                Trusted relocation is just a prompt away. Start a new chat to get personalized assistance.
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "assistant" && (
                    <div
                      className="w-8 h-8 rounded-full  flex items-center justify-center flex-shrink-0">
                      <Image src="/logo.png" alt="Hamhey User" width={32} height={32} className="w-8 h-8 object-contain" />
                    </div>
                  )}
                  <div
                    className={`relative group max-w-[70%] px-4 py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-orange-500 dark:bg-orange-800 text-white rounded-br-md"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md"
                    }`}>
                    {editingMessageId === message.id ? (
                      <div className="flex flex-col gap-2">
                        <textarea
                          value={editingMessageContent}
                          onChange={(e) => setEditingMessageContent(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-sm leading-relaxed"
                        />
                        <div className="flex gap-2 self-end">
                          <button onClick={() => handleSave(message.id)} className="text-xs font-bold">Save</button>
                          <button onClick={() => setEditingMessageId(null)} className="text-xs">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    )}
                    {message.role === "user" && editingMessageId !== message.id && (
                        <button onClick={() => handleEdit(message)} className="absolute top-1/2 -left-10 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                            <PenLine className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                    )}
                  </div>
                  {message.role === "user" && (
                    <div
                      className="w-8 h-8 rounded-full  flex items-center justify-center flex-shrink-0">
                     
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4 justify-start">
                  <div
                    className="w-8 h-8 rounded-full  flex items-center justify-center flex-shrink-0">
                    <Image src="/logo.png" alt="Hamhey User" width={32} height={32} className="w-8 h-8 object-contain" />
                  </div>
                  <div
                    className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}></div>
                      <div
                        className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6">
          <div className="max-w-3xl mx-auto">
            <div
              className="relative bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus-within:border-orange-500 dark:focus-within:border-orange-400 transition-colors">
              <div className="flex items-center p-4">
                <button
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  <Plus className="w-4 h-4" />
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">Tools</span>
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Ask anything"
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
                  disabled={isTyping} />

                <div className="flex items-center gap-2">
                  <button
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none">
                    <ArrowUp className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
