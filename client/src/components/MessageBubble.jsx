/* Renders a single chat message bubble */
export default function MessageBubble({ role, content, timestamp }) {
  const isUser = role === "user";

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} mb-4 group`}>
      <div className={`flex items-end gap-2 max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shadow-lg ${
          isUser 
            ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white" 
            : "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
        }`}>
          {isUser ? "U" : "🤖"}
        </div>

        {/* Message Container */}
        <div className="relative">
          {/* Message Bubble */}
          <div
            className={`relative rounded-2xl px-5 py-3 shadow-lg transform transition-all duration-200 group-hover:shadow-xl group-hover:-translate-y-0.5 break-words whitespace-pre-wrap ${
              isUser
                ? "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white shadow-blue-500/25 border border-blue-400/20"
                : "bg-white text-gray-800 border border-gray-200/60 shadow-gray-300/30 backdrop-blur-sm"
            } ${isUser ? "rounded-br-md" : "rounded-bl-md"}`}
          >
            {/* Message tail */}
            <div className={`absolute bottom-0 w-3 h-3 transform rotate-45 ${
              isUser 
                ? "-right-1 bg-gradient-to-br from-blue-500 to-indigo-600 border-r border-b border-blue-400/20" 
                : "-left-1 bg-white border-l border-b border-gray-200/60"
            }`}></div>
            
            {/* Content */}
            <div className="text-sm leading-relaxed relative z-10">{content}</div>
            
            {/* Timestamp */}
            {timestamp && (
              <div
                className={`text-xs mt-2 flex items-center gap-1 ${
                  isUser ? "text-blue-100/80 justify-end" : "text-gray-500/80"
                }`}
              >
                <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">
                  {new Date(timestamp).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Subtle background glow for user messages */}
          {isUser && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-2xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          )}
          
          {/* Subtle background glow for AI messages */}
          {!isUser && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-2xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          )}
        </div>
      </div>
    </div>
  );
}