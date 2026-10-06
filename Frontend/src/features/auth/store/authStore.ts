import { create } from "zustand";
import type { AuthUser } from "../types/auth.types";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  setInitializing: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitializing: true,
  setUser: (user) =>
    set({ user, isAuthenticated: true, isInitializing: false }),
  clearUser: () =>
    set({ user: null, isAuthenticated: false, isInitializing: false }),
  setInitializing: (value) => set({ isInitializing: value }),
}));
