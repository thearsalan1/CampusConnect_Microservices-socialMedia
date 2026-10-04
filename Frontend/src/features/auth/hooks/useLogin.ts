import { useNavigate } from "react-router-dom";
import { loginApi } from "../store/auth.api";
import { useAuthStore } from "../store/authStore";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setUser(data.user);
      toast.success(data.message || "Welcome back mate");
      navigate("/");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message =
        error.response?.data?.message || "Login failed. Try again.";
      toast.error(message);
    },
  });
};
