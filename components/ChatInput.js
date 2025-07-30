"use client"

import { useRef } from "react"

export default function ChatInput({ value, onChange, onSend, onFile, onVoice, disabled }) {
  const fileInputRef = useRef()

  return (
    <div
      className="w-full px-6 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50">
      <div
        className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-200 focus-within:ring-2 focus-within:ring-orange-500/20 dark:focus-within:ring-orange-400/20">
        {/* File upload button */}
        <button
          type="button"
          className="mr-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-all duration-200 transform hover:scale-105"
          onClick={() => fileInputRef.current.click()}
          disabled={disabled}
          aria-label="Upload file">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={onFile}
            disabled={disabled} />
        </button>

        {/* Voice input button */}
        <button
          type="button"
          className="mr-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-all duration-200 transform hover:scale-105"
          onClick={onVoice}
          disabled={disabled}
          aria-label="Voice input">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 10v2a7 7 0 01-14 0v-2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19v4" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 23h8" />
          </svg>
        </button>

        {/* Text input */}
        <input
          className="flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder:text-gray-500 dark:placeholder:text-gray-400 px-2 py-1 text-base"
          placeholder="Message Hamhey AI..."
          value={value}
          onChange={onChange}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
          disabled={disabled}
          style={{ minWidth: 0 }} />

        {/* Send button */}
        <button
          type="button"
          onClick={onSend}
          disabled={!value.trim() || disabled}
          className="ml-3 w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FFA500] to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none"
          aria-label="Send message">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
