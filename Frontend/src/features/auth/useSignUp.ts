import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "./auth.api";

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUpApi,
  });
};
