"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/auth/login-modal";
import { LogIn, LogOut } from "lucide-react";

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
              ? "h-11 w-full bg-primary/10 text-primary ring-primary/20"
              : "h-9 w-9 bg-primary text-[#111311] ring-primary/25 hover:ring-primary/50"
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
            <div className="absolute right-0 top-full mt-2 z-50 min-w-[200px] bg-[#0b0e0c] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-[11px] text-white/45 uppercase tracking-wide font-semibold">Sesión activa</p>
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
            ? "min-h-11 w-full justify-center gap-2 rounded-xl border border-white/12 bg-white/[.025] px-4 text-sm font-semibold text-white/78 hover:border-primary/35 hover:text-white"
            : "gap-1.5 rounded-full border border-white/12 bg-[#0d110e] px-4 py-2 text-sm font-medium text-white/74 hover:border-primary/35 hover:bg-[#111512] hover:text-white"
        }`}
        aria-label="Iniciar sesión"
      >
        <LogIn className="h-4 w-4" />
        Acceder
      </button>

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
    </>
  );
}
