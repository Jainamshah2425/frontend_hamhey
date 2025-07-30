"use client";
import { useEffect, useRef } from "react"
import { Send, MessageCircle, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const mockChatSessions = [
  {
    id: "1",
    title: "Getting Started",
    lastMessage: "Hello! How can I help...",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    messageCount: 5,
  },
  {
    id: "2",
    title: "Project Planning",
    lastMessage: "Let me help you plan...",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    messageCount: 12,
  },
  {
    id: "3",
    title: "Code Review",
    lastMessage: "Here are some suggestions...",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    messageCount: 8,
  },
]

function ChatSidebar() {
  const { setOpen } = useSidebar()

  const handleNewChat = () => {
    // In a real app, this would create a new chat session
    window.location.reload()
  }

  const selectChat = (chat) => {
    // In a real app, this would load the selected chat
    console.log("Selected chat:", chat.id)
    setOpen(false)
  }

  const formatRelativeTime = (date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return `${Math.floor(diffInHours / 24)}d ago`;
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Button onClick={handleNewChat} className="w-full" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Recent Chats</h3>
          <SidebarMenu>
            {mockChatSessions.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton
                  onClick={() => selectChat(chat)}
                  className="w-full justify-start p-3 h-auto">
                  <div className="flex flex-col items-start w-full">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-sm truncate">{chat.title}</span>
                      <Badge variant="secondary" className="text-xs">
                        {chat.messageCount}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground truncate w-full text-left">{chat.lastMessage}</span>
                    <span className="text-xs text-muted-foreground">{formatRelativeTime(chat.timestamp)}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg max-w-xs">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
        <div
          className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]" />
        <div
          className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
      </div>
      <span className="text-sm text-muted-foreground">AI is thinking...</span>
    </div>
  );
}

function MessageBubble({
  message,
  isLast
}) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn("flex gap-3 max-w-4xl", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarFallback>
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
        <Card
          className={cn(
            "p-3 max-w-[80%] break-words",
            isUser ? "bg-primary text-primary-foreground" : "bg-muted"
          )}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </Card>

        {isLast && (
          <span className="text-xs text-muted-foreground mt-1 px-1">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>
      {isUser && (
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export function ChatInterface({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  error,
  reload,
  stop
}) {
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isLoading])

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading && input.trim()) {
        handleSubmit(e)
      }
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <ChatSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header
            className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-6" />
                <h1 className="text-lg font-semibold">AI Assistant</h1>
              </div>

              {error && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={reload}
                  className="text-destructive bg-transparent">
                  Retry
                </Button>
              )}

              {isLoading && (
                <Button variant="outline" size="sm" onClick={stop}>
                  Stop
                </Button>
              )}
            </div>
          </header>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 mx-auto max-w-4xl">
              {messages.map((message, index) => (
                <MessageBubble key={message.id} message={message} isLast={index === messages.length - 1} />
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}

              {error && (
                <div className="flex justify-center">
                  <Card className="p-4 border-destructive bg-destructive/10">
                    <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
                  </Card>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t bg-background p-4">
            <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message here..."
                  disabled={isLoading}
                  className="flex-1"
                  autoComplete="off"
                  aria-label="Chat message input" />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  aria-label="Send message">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
