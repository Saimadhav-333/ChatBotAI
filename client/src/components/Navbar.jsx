import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl backdrop-blur-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">🤖</span>
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100 drop-shadow-sm">
              SMART BOT
            </h1>
            <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-500"></div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user?.name && (
            <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>
              <span className="text-sm font-medium">
                Welcome, <span className="text-purple-100 font-semibold">{user.name}</span>
              </span>
            </div>
          )}
          
          <button
            onClick={logout}
            className="group relative overflow-hidden rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 transition-all duration-300 px-4 py-2 text-sm font-medium backdrop-blur-sm border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
      </div>
      
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </header>
  );
}