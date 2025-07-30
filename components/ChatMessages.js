"use client"

function TypingIndicator() {
  return (
    <div
      className="flex items-center space-x-3 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200/30 dark:border-gray-700/30 max-w-xs animate-pulse transition-all duration-300">
      <div
        className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-sm">
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-orange-600 dark:text-orange-400 text-sm font-medium">AI is thinking</span>
        <div className="flex space-x-1 mt-1">
          <div
            className="w-2 h-2 bg-orange-400 dark:bg-orange-500 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}></div>
          <div
            className="w-2 h-2 bg-orange-400 dark:bg-orange-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}></div>
          <div
            className="w-2 h-2 bg-orange-400 dark:bg-orange-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  );
}

export default function ChatMessages({ messages, isTyping, onEditLast, onDelete, onFileClick, aiLogo }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.length === 0 && (
        <div className="text-center mt-12 space-y-4">
          <div
            className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg">
            <span className="text-2xl">👋</span>
          </div>
          <div>
            <p
              className="text-xl font-semibold mb-2 text-orange-600 dark:text-orange-400">Welcome to Hamhey AI!</p>
            <p className="text-gray-600 dark:text-gray-400">Start a conversation by typing a message below.</p>
          </div>
        </div>
      )}
      {messages.map((msg, idx) => (
        <div
          key={msg.id || idx}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end space-x-3 group`}>
          {msg.role === "ai" && (
            <div className="flex-shrink-0 flex items-end">
              <div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-md">
                <div
                  className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <span className="text-orange-500 font-bold text-xs">H</span>
                </div>
              </div>
            </div>
          )}

          <div
            className={`relative max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-5 py-4 rounded-2xl shadow-lg text-sm break-words transition-all duration-200 group-hover:shadow-xl transform group-hover:scale-[1.02] ${
              msg.role === "user"
                ? "bg-gradient-to-br from-[#F5F5DC] to-[#F5F5DC]/80 dark:from-orange-900/20 dark:to-orange-800/10 text-gray-800 dark:text-gray-200 rounded-br-md border border-orange-200/50 dark:border-orange-700/30"
                : "bg-gradient-to-br from-white to-white/80 dark:from-gray-800 dark:to-gray-800/80 text-orange-600 dark:text-orange-400 border border-orange-300/50 dark:border-gray-700/50 rounded-bl-md backdrop-blur-sm"
            }`}>
            <div className="leading-relaxed">{msg.content}</div>

            {msg.file && (
              <button
                className="block mt-3 text-xs text-orange-500 dark:text-orange-400 underline hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-200"
                onClick={() => onFileClick && onFileClick(msg.file)}>
                📎 {msg.file.name}
              </button>
            )}

            {/* Edit/Delete for last user message */}
            {msg.role === "user" && idx === messages.length - 1 && (
              <div
                className="flex gap-3 mt-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  className="text-xs text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 hover:underline transition-colors duration-200"
                  onClick={() => onEditLast && onEditLast(msg)}>
                  ✏️ Edit
                </button>
                <button
                  className="text-xs text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:underline transition-colors duration-200"
                  onClick={() => onDelete && onDelete(msg)}>
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>

          {msg.role === "user" && (
            <div className="flex-shrink-0 flex items-end">
              <div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xs">U</span>
              </div>
            </div>
          )}
        </div>
      ))}
      {isTyping && (
        <div className="flex justify-start">
          <TypingIndicator />
        </div>
      )}
    </div>
  );
}
