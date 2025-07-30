// "use client";
// import Image from "next/image";
// import React from 'react';
// import EditIcon from './EditIcon';

// // Typing Indicator Component
// function TypingIndicator({ isDark }) {
//   const bgClass = isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-orange-200';
  
//   return (
//     <div className={`flex items-center space-x-2 p-3 ${bgClass} rounded-2xl shadow-sm border max-w-xs animate-pulse`}>
//       <span className="text-orange-500 text-sm">AI is typing</span>
//       <div className="flex space-x-1">
//         <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
//         <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
//         <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
//       </div>
//     </div>
//   );
// }

// // Chat Messages Component
// export default function ChatMessages({ messages, isTyping, onEditLast, onDelete, onFileClick, isDark }) {
//   const welcomeTextClass = isDark ? 'text-gray-300' : 'text-black';
  
//   return (
//     <div className="flex-1 overflow-y-auto p-4 space-y-4">
//       {messages.length === 0 && (
//         <div className="text-center mt-8">
//           <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-500 flex items-center justify-center">
//             <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
//             </svg>
//           </div>
//           <p className="text-xl mb-2 text-orange-500 font-semibold">Welcome to Hamhey AI!</p>
//           <p className={welcomeTextClass}>Start a conversation by typing a message below. Here are some ideas:</p>
//           <div className="flex justify-center gap-2 mt-4">
//             <button className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm">"What's the weather?"</button>
//             <button className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm">"Tell me a joke"</button>
//             <button className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm">"Explain quantum computing"</button>
//           </div>
//         </div>
//       )}
//       {messages.map((msg, idx) => (
//         <div
//           key={msg.id || idx}
//           className={`group flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-center gap-2`}
//         >
//           {msg.role === "ai" && (
//             <>
//               <div className="mr-2 flex-shrink-0 flex items-end">
//                 <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
//                   <img src="/logo.png" alt="Hamhey AI Logo" className="w-full h-full object-cover" />
//                 </div>
//               </div>
//               <div
//                 className={`relative max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-2xl shadow-md text-sm break-words ${
//                   isDark
//                     ? "bg-gray-700 text-gray-200 rounded-bl-lg"
//                     : "bg-gray-100 text-gray-800 rounded-bl-lg"
//                 }`}
//               >
//                 {msg.content}
//               </div>
//             </>
//           )}

//           {msg.role === "user" && (
//             <>
//               <button
//                 className="opacity-0 group-hover:opacity-100 transition-opacity"
//                 onClick={() => onEditLast && onEditLast(msg)}
//               >
//                 <EditIcon className={isDark ? "text-gray-400" : "text-gray-500"} />
//               </button>
//               <div
//                 className={`relative max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-2xl shadow-md text-sm break-words ${
//                   isDark 
//                     ? "bg-blue-800 text-white rounded-br-lg"
//                     : "bg-orange-500 text-white rounded-br-lg"
//                 }`}
//               >
//                 {msg.content}
//                 {msg.file && (
//                   <button
//                     className="block mt-2 text-xs text-orange-500 underline"
//                     onClick={() => onFileClick && onFileClick(msg.file)}
//                   >
//                     {msg.file.name}
//                   </button>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       ))}
//       {isTyping && (
//         <div className="flex justify-start">
//           <TypingIndicator isDark={isDark} />
//         </div>
//       )}
//     </div>
//   );
// }



"use client"

function TypingIndicator() {
  return (
    <div className="flex items-center space-x-3 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200/30 dark:border-gray-700/30 max-w-xs animate-pulse transition-all duration-300">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-sm">
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-orange-600 dark:text-orange-400 text-sm font-medium">AI is thinking</span>
        <div className="flex space-x-1 mt-1">
          <div
            className="w-2 h-2 bg-orange-400 dark:bg-orange-500 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 bg-orange-400 dark:bg-orange-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-orange-400 dark:bg-orange-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default function ChatMessages({ messages, isTyping, onEditLast, onDelete, onFileClick, aiLogo }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.length === 0 && (
        <div className="text-center mt-12 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg">
            <span className="text-2xl">👋</span>
          </div>
          <div>
            <p className="text-xl font-semibold mb-2 text-orange-600 dark:text-orange-400">Welcome to Hamhey AI!</p>
            <p className="text-gray-600 dark:text-gray-400">Start a conversation by typing a message below.</p>
          </div>
        </div>
      )}

      {messages.map((msg, idx) => (
        <div
          key={msg.id || idx}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end space-x-3 group`}
        >
          {msg.role === "ai" && (
            <div className="flex-shrink-0 flex items-end">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-md">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
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
            }`}
          >
            <div className="leading-relaxed">{msg.content}</div>

            {msg.file && (
              <button
                className="block mt-3 text-xs text-orange-500 dark:text-orange-400 underline hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-200"
                onClick={() => onFileClick && onFileClick(msg.file)}
              >
                📎 {msg.file.name}
              </button>
            )}

            {/* Edit/Delete for last user message */}
            {msg.role === "user" && idx === messages.length - 1 && (
              <div className="flex gap-3 mt-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  className="text-xs text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 hover:underline transition-colors duration-200"
                  onClick={() => onEditLast && onEditLast(msg)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="text-xs text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:underline transition-colors duration-200"
                  onClick={() => onDelete && onDelete(msg)}
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>

          {msg.role === "user" && (
            <div className="flex-shrink-0 flex items-end">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center shadow-md">
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
  )
}

