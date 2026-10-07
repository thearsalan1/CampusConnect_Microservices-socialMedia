import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../store/auth.api";
import type { LogoutResponse } from "../types/auth.types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

export const useLogOut = () => {
  const naviagte = useNavigate();
  return useMutation({
    mutationFn: logoutApi,
    onSuccess: (data: LogoutResponse) => {
      toast.success(data.message || "LogOut successfully.");
      naviagte("/");
    },
    onError: (error: AxiosError<LogoutResponse>) => {
      toast.error(error.response?.data?.message || "Error in logging out.");
    },
  });
};
