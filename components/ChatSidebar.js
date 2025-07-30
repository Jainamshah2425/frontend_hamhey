"use client"

const mockChats = [
  { id: 1, title: "Project Ideas", lastMessage: "Let's brainstorm some innovative ideas!" },
  { id: 2, title: "Travel Plans", lastMessage: "Where should we explore next?" },
  { id: 3, title: "Shopping List", lastMessage: "Don't forget the oranges!" },
  { id: 4, title: "Code Review", lastMessage: "Here are some suggestions..." },
  { id: 5, title: "Design Feedback", lastMessage: "The layout looks fantastic!" },
]

export default function ChatSidebar({ selectedChatId, onSelectChat, onNewChat, onClose }) {
  return (
    <aside
      className="w-64 bg-gradient-to-b from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-900/70 backdrop-blur-md border-r border-orange-200/50 dark:border-gray-700/50 flex flex-col h-full transition-all duration-300">
      <div
        className="flex items-center justify-between p-4 relative border-b border-orange-100/50 dark:border-gray-700/50">
        {/* Close button */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 border border-orange-300/50 dark:border-gray-600/50 text-orange-500 dark:text-orange-400 rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-sm hover:shadow-md hover:bg-orange-50 dark:hover:bg-gray-600 focus:outline-none transition-all duration-200 transform hover:scale-105"
          onClick={onClose}
          aria-label="Close sidebar">
          ←
        </button>

        <span
          className="font-bold text-orange-600 dark:text-orange-400 text-lg mx-auto">Chats</span>

        {/* New chat button */}
        <button
          className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-full px-4 py-2 text-sm font-medium absolute right-4 top-1/2 -translate-y-1/2 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          onClick={onNewChat}>
          New
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {mockChats.map((chat) => (
            <button
              key={chat.id}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none group transform hover:scale-[1.02] ${
                selectedChatId === chat.id
                  ? "bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 text-orange-600 dark:text-orange-400 font-semibold shadow-md border border-orange-200/50 dark:border-orange-700/30"
                  : "hover:bg-white/60 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:shadow-sm"
              }`}
              onClick={() => onSelectChat(chat.id)}>
              <div className="truncate font-medium text-sm mb-1">{chat.title}</div>
              <div
                className="text-xs text-gray-500 dark:text-gray-400 truncate opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                {chat.lastMessage}
              </div>
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}
