"use client";
import React, { useRef } from 'react';


export default function ChatInput({ value, onChange, onSend, onFile, onVoice, disabled, isDark }) {
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

// export default function ChatInput({ value, onChange, onSend, onFile, onVoice, disabled, isDark }) {
//   const fileInputRef = useRef();
//   const bgClass = isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200';
//   const iconClass = isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-100';
//   const inputClass = isDark ? 'text-gray-200 placeholder:text-gray-500' : 'text-gray-700 placeholder:text-gray-400';

//   return (
//     <div className="w-full px-2 py-2">
//       <div className={`flex items-center ${bgClass} border rounded-full px-4 py-2`}>
//         <button
//           type="button"
//           className={`mr-2 p-0.5 rounded-full ${iconClass} focus:outline-none transition-colors`}
//           onClick={() => fileInputRef.current.click()}
//           disabled={disabled}
//           aria-label="Upload file"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 13.5V7a4.5 4.5 0 0 0-9 0v7a6 6 0 0 0 12 0V9"/>
//           </svg>
//           <input
//             type="file"
//             ref={fileInputRef}
//             className="hidden"
//             onChange={onFile}
//             disabled={disabled}
//           />
//         </button>
//         <button
//           type="button"
//           className={`mr-3 p-0.5 rounded-full ${iconClass} focus:outline-none transition-colors`}
//           onClick={onVoice}
//           disabled={disabled}
//           aria-label="Voice input"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v2m0 0h3m-3 0H9m6-6a3 3 0 1 1-6 0V7a3 3 0 1 1 6 0v7z"/>
//           </svg>
//         </button>
//         <input
//           className={`flex-1 bg-transparent border-none outline-none ${inputClass} px-0 py-0 text-base`}
//           placeholder="Message Hamhey AI..."
//           value={value}
//           onChange={onChange}
//           onKeyDown={e => e.key === "Enter" && onSend()}
//           disabled={disabled}
//           style={{ minWidth: 0 }}
//         />
//         <button
//           type="button"
//           onClick={onSend}
//           disabled={!value.trim() || disabled}
//           className="ml-2 w-10 h-10 flex items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//           aria-label="Send"
//         >
//           <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" />
//             <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L15 22L11 13L2 9L22 2Z" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }