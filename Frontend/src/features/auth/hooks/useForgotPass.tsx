import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "../store/auth.api";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordApi,
  });
};
