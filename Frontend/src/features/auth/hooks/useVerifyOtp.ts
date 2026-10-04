import { useMutation } from "@tanstack/react-query";
import { me, verifyOtpApi } from "../store/auth.api";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

export const useVerifyOtp = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: async (data) => {
      toast.success(data.message || "User verification successfull");
      const user = await me();
      setUser(user.user);
      navigate("/");
    },
    onError: (
      error: AxiosError<{ message?: string; attemptLeft?: number }>,
    ) => {
      const message = error.response?.data.message || "Verification failed";
      const attemptLeft = error.response?.data.attemptLeft;
      toast.error(
        attemptLeft != undefined
          ? `${message} (${attemptLeft} attempts left)`
          : message,
      );
    },
  });
};
