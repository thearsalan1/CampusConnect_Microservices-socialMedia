// src/features/auth/hooks/useAuthInit.ts
import { useEffect } from "react";
import { me } from "../store/auth.api";
import { useAuthStore } from "../store/authStore";

export const useAuthInit = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setInitializing = useAuthStore((state) => state.setInitializing);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await me();
        setUser(data.user);
      } catch {
        // cookies invalid/expired — user simply not logged in, that's fine
        setInitializing(false);
      }
    };
    init();
  }, []);
};
