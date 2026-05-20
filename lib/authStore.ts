import { create } from "zustand";
import type { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  // Modal control
  isAuthModalOpen: boolean;
  authModalTab: "login" | "register";
  openAuthModal: (tab?: "login" | "register") => void;
  closeAuthModal: () => void;
  // State setters
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthModalOpen: false,
  authModalTab: "login",

  openAuthModal: (tab = "login") =>
    set({ isAuthModalOpen: true, authModalTab: tab }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
}));
