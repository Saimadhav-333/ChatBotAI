// src/components/ChatBox.jsx
import { useState, useEffect, useRef } from "react";
import API from "../utils/api"; // using your centralized axios instance

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load existing chat history when component mounts
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        setIsLoading(true);
        const res = await API.get("/chat/history"); // New endpoint to get chat history
        if (res.data.messages) {
          setMessages(res.data.messages);
        }
      } catch (err) {
        console.error("Error loading chat history:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadChatHistory();
  }, []);

  // Start a new chat (clear history)
  const startNewChat = async () => {
    try {
      await API.delete("/chat/clear"); // hitting your backend route
      setMessages([]); // reset state also
    } catch (err) {
      console.error("Error clearing chat history:", err);
    }
  };

  // Send a message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await API.post("/chat/bot", { message: input });
      const botMessage = { role: "bot", content: res.data.reply, timestamp: new Date() };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
      const errorMessage = { 
        role: "bot", 
        content: "Sorry, I'm having trouble responding right now. Please try again.", 
        timestamp: new Date() 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-sm overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                <span className="text-xl">🤖</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-semibold text-lg">AI Assistant</h3>
              <p className="text-xs text-white/80">Online • Ready to help</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-white/70 hidden sm:block">
              {messages.length} message{messages.length !== 1 ? 's' : ''}
            </div>
            {/* New Chat Button */}
            <button
              onClick={startNewChat}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg backdrop-blur-sm border border-white/30 hover:border-white/50 flex items-center gap-2 group"
              title="Start a new chat"
            >
              <svg 
                className="w-4 h-4 transition-transform group-hover:rotate-90" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="hidden sm:inline">New Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white min-h-0">
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg animate-spin">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <p className="text-gray-600">Loading your chat history...</p>
          </div>
        )}

        {/* Welcome Message */}
        {!isLoading && messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <span className="text-2xl">👋</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Welcome to AI Chat!</h4>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              I'm here to help you with any questions or tasks. Just type your message below to get started.
            </p>
          </div>
        )}

        {/* Messages */}
        {!isLoading && messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} group`}
          >
            <div className={`flex items-end gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shadow-lg transform transition-transform group-hover:scale-110 ${
                msg.role === "user" 
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white" 
                  : "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
              }`}>
                {msg.role === "user" ? "U" : "🤖"}
              </div>

              {/* Message Bubble */}
              <div className="relative">
                <div
                  className={`relative rounded-2xl px-4 py-3 shadow-lg transform transition-all duration-200 group-hover:shadow-xl group-hover:-translate-y-0.5 ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white shadow-blue-500/25 rounded-br-md"
                      : "bg-white text-gray-800 border border-gray-200/60 shadow-gray-300/30 backdrop-blur-sm rounded-bl-md"
                  }`}
                >
                  {/* Message tail */}
                  <div className={`absolute bottom-0 w-3 h-3 transform rotate-45 ${
                    msg.role === "user" 
                      ? "-right-1 bg-gradient-to-br from-blue-500 to-indigo-600" 
                      : "-left-1 bg-white border-l border-b border-gray-200/60"
                  }`}></div>
                  
                  <div className="text-sm leading-relaxed relative z-10 whitespace-pre-wrap break-words">
                    {msg.content}
                  </div>
                  
                  {msg.timestamp && (
                    <div className={`text-xs mt-2 flex items-center gap-1 ${
                      msg.role === "user" ? "text-blue-100/80 justify-end" : "text-gray-500/80"
                    }`}>
                      <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )}
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-2xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 ${
                  msg.role === "user" 
                    ? "bg-gradient-to-br from-blue-400/20 to-indigo-600/20" 
                    : "bg-gradient-to-br from-purple-400/10 to-pink-500/10"
                }`}></div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end gap-3 max-w-[80%]">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-medium shadow-lg">
                🤖
              </div>
              <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-lg border border-gray-200/60">
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">AI is typing...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm p-4">
        <div className="flex items-end gap-3 max-w-4xl">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here... (Press Enter to send)"
              className="w-full resize-none border border-gray-300/50 rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md text-sm leading-relaxed max-h-32 min-h-[44px]"
              rows="1"
              style={{ 
                resize: 'none',
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e1 transparent'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
              }}
              disabled={isTyping}
            />
            
            {/* Character count (optional) */}
            {input.length > 0 && (
              <div className="absolute bottom-1 right-12 text-xs text-gray-400">
                {input.length}
              </div>
            )}
          </div>
          
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-xl shadow-lg hover:shadow-xl disabled:shadow-sm transform transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <svg 
              className={`w-5 h-5 relative z-10 transition-transform duration-200 ${isTyping ? 'animate-spin' : 'group-hover:translate-x-0.5'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isTyping ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}