import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createListingApi } from "../api/listing.api";
import { listingKeys } from "./listing.keys";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const useCreateListing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createListingApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: listingKeys.all });
      toast.success(data.message || "Item created successfully.");
    },
    onError: (error: AxiosError<{ success: boolean; message: string }>) => {
      const message = error.response?.data.message;
      toast.error(message || "Error in creating item.");
    },
  });
};
