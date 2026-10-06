import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToggleItemStatusApi } from "../api/listing.api";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { listingKeys } from "./listing.keys";

export const useToggleItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ToggleItemStatusApi,
    onSuccess: (data) => {
      toast.success(data.message || "Item status updated.");
      queryClient.invalidateQueries({ queryKey: listingKeys.all });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message =
        error.response?.data.message || "Error in updating item status.";
      toast.error(message);
    },
  });
};
