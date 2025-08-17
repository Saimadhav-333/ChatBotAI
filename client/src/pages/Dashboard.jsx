import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";

export default function Dashboard() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/50 overflow-hidden">
      {/* Navigation Header */}
      <Navbar />
      
      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated Background Gradients */}
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-300/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-200/15 to-indigo-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
          
          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-indigo-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}></div>
          <div className="absolute top-3/4 left-2/3 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4s' }}></div>
          <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-pink-400/35 rounded-full animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '5s' }}></div>
        </div>

        {/* Chat Container */}
        <div className="relative h-full flex items-center justify-center p-4 md:p-6 lg:p-8">
          <div className="w-full max-w-5xl h-full relative">
            {/* Subtle container glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-indigo-100/30 rounded-3xl blur-xl scale-105 opacity-60"></div>
            
            {/* Main Chat Interface */}
            <div className="relative h-full">
              <ChatBox />
            </div>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200/50 to-transparent"></div>
      </div>

      {/* Loading Overlay (if needed for future enhancements) */}
      {/* You can uncomment and use this for loading states
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center hidden">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4 animate-spin">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading your chat...</p>
        </div>
      </div>
      */}
    </div>
  );
}