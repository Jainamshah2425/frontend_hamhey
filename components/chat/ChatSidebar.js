// "use client";
// import React from 'react';

// // This is a placeholder for initial chat data.
// // In a real application, you would fetch this from an API.
// const initialChats = [
//   {
//     id: 1,
//     title: "Project Ideas",
//     messages: [
//       { id: 1, role: "ai", content: "Let's brainstorm some innovative ideas!" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Travel Plans",
//     messages: [
//       { id: 1, role: "ai", content: "Where should we explore next?" },
//     ],
//   },
//   {
//     id: 3,
//     title: "Shopping List",
//     messages: [
//       { id: 1, role: "ai", content: "Don't forget the oranges!" },
//     ],
//   },
//   {
//     id: 4,
//     title: "Code Review",
//     messages: [
//       { id: 1, role: "ai", content: "Here are some suggestions..." },
//     ],
//   },
//   {
//     id: 5,
//     title: "Design Feedback",
//     messages: [
//       { id: 1, role: "ai", content: "The layout looks fantastic!" },
//     ],
//   },
// ];

// export default function ChatSidebar({ selectedChatId, onSelectChat, onNewChat, onClose, isDark }) {
//   const bgClass = isDark ? 'bg-gray-800 border-gray-700' : 'bg-orange-50 border-orange-200';
//   const textClass = isDark ? 'text-orange-400' : 'text-orange-500';
//   const buttonClass = isDark ? 'bg-orange-500 hover:bg-orange-600' : 'bg-orange-400 hover:bg-orange-500';
//   const itemClass = isDark ? 'border-gray-700' : 'border-orange-100';
//   const selectedClass = isDark ? 'bg-gray-700 text-orange-400' : 'bg-white text-orange-500';
//   const hoverClass = isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-orange-50 text-black';
//   const closeButtonClass = isDark ? 'bg-gray-700 border-gray-600 text-orange-400 hover:bg-gray-600' : 'bg-white border-orange-300 text-orange-500 hover:bg-orange-100';

//   return (
//     <aside className={`w-64 ${bgClass} border-r flex flex-col h-full`}>
//       <div className="flex items-center justify-between p-4 relative">
//         <button
//           className={`absolute left-0 top-1/2 -translate-y-1/2 ${closeButtonClass} border rounded-full px-2 py-1 font-bold shadow focus:outline-none transition-colors`}
//           onClick={onClose}
//           aria-label="Close sidebar"
//         >
//           ⟨
//         </button>
//         <span className={`font-bold text-orange text-lg mx-auto`}>Chats</span>
//         <button
//           className={`${buttonClass} text-white rounded-full px-3 py-1 text-sm font-medium absolute right-0 top-1/2 -translate-y-1/2 transition-colors`}
//           onClick={onNewChat}
//         >
//           New
//         </button>
//       </div>
//       <nav className="flex-1 overflow-y-auto">
//         {initialChats.map((chat) => (
//           <button
//             key={chat.id}
//             className={`w-full text-left px-4 py-3 border-b ${itemClass} transition-colors duration-150 focus:outline-none ${
//               selectedChatId === chat.id ? `${selectedClass} font-semibold` : hoverClass
//             }`}
//             onClick={() => onSelectChat(chat.id)}
//           >
//             <div className="truncate font-medium">{chat.title}</div>
//             <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-orange-400'} truncate`}>
//               {chat.messages[0]?.content}
//             </div>
//           </button>
//         ))}
//       </nav>
//     </aside>
//   );
// }


"use client";
import React from 'react';

// This is a placeholder for initial chat data.
// In a real application, you would fetch this from an API.
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

export default function ChatSidebar({ selectedChatId, onSelectChat, onNewChat, onClose }) {
  return (
    <aside className="w-64 bg-orange-50 border-orange-200 dark:bg-gray-800 dark:border-gray-700 border-r flex flex-col h-full">
      <div className="flex items-center justify-between p-4 relative">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border-orange-300 text-orange-500 hover:bg-orange-100 dark:bg-gray-700 dark:border-gray-600 dark:text-orange-400 dark:hover:bg-gray-600 border rounded-full px-2 py-1 font-bold shadow focus:outline-none transition-colors"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ⟨
        </button>
        <span className="font-bold text-orange-500 dark:text-orange-400 text-lg mx-auto">Chats</span>
        <button
          className="bg-orange-400 hover:bg-orange-500 dark:bg-orange-500 dark:hover:bg-orange-600 text-white rounded-full px-3 py-1 text-sm font-medium absolute right-0 top-1/2 -translate-y-1/2 transition-colors"
          onClick={onNewChat}
        >
          New
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {initialChats.map((chat) => (
          <button
            key={chat.id}
            className={`w-full text-left px-4 py-3 border-b border-orange-100 dark:border-gray-700 transition-colors duration-150 focus:outline-none ${
              selectedChatId === chat.id ? "bg-white text-orange-500 dark:bg-gray-700 dark:text-orange-400 font-semibold" : "hover:bg-orange-50 text-black dark:hover:bg-gray-700 dark:text-gray-300"
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            <div className="truncate font-medium">{chat.title}</div>
            <div className="text-xs text-orange-400 dark:text-gray-500 truncate">
              {chat.messages[0]?.content}
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
}