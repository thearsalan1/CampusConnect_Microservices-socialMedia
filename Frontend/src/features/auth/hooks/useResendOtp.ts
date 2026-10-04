import { useMutation } from "@tanstack/react-query";
import { resendOtp } from "../store/auth.api";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOtp,
    onSuccess: (data) => {
      toast.success(data.message || "OTP resend successfully");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data.message || "Failed to resend OTP.");
    },
  });
};
