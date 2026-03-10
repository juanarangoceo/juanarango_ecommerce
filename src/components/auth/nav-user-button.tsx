"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/auth/login-modal";
import { LogIn, LogOut, User } from "lucide-react";

interface NavUserButtonProps {
  mobile?: boolean;
}

export function NavUserButton({ mobile = false }: NavUserButtonProps) {
  const { user, loading, signOut } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  if (loading) return null;

  // Logged in — show avatar + dropdown
  if (user) {
    const initials = user.email
      ? user.email.slice(0, 2).toUpperCase()
      : "U";

    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`flex items-center justify-center rounded-full font-bold text-xs transition-all duration-200 ring-2 ring-offset-2 ring-offset-black ${
            mobile
              ? "w-7 h-7 bg-purple-500/20 text-purple-300 ring-purple-500/30"
              : "w-8 h-8 bg-purple-600 text-white ring-purple-500/40 hover:ring-purple-400"
          }`}
          aria-label="Tu cuenta"
        >
          {initials}
        </button>

        {showDropdown && (
          <>
            {/* backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowDropdown(false)}
            />
            <div className="absolute right-0 top-full mt-2 z-50 min-w-[200px] bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-800">
                <p className="text-[11px] text-zinc-500 uppercase tracking-wide font-semibold">Sesión activa</p>
                <p className="text-sm text-white font-medium truncate mt-0.5">{user.email}</p>
              </div>
              <button
                onClick={async () => { setShowDropdown(false); await signOut(); }}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Not logged in — show login button
  return (
    <>
      <button
        onClick={() => setShowLogin(true)}
        className={`flex items-center transition-all duration-200 ${
          mobile
            ? "text-purple-400/70 hover:text-purple-300"
            : "bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-purple-500/50 text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium gap-1.5"
        }`}
        aria-label="Iniciar sesión"
      >
        {mobile ? (
          <User className="w-5 h-5" />
        ) : (
          <>
            <LogIn className="w-4 h-4" />
            Acceder
          </>
        )}
      </button>

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
    </>
  );
}
