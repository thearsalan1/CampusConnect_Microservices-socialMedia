// src/features/auth/useResetPass.ts
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../store/auth.api";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useResetPass = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successfully");
      navigate("/login");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message = error.response?.data?.message || "Can't reset password";
      toast.error(message);
    },
  });
};
