import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createListingApi } from "../api/listing.api";
import { listingKeys } from "./listing.keys";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useCreateListing = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createListingApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: listingKeys.all });
      toast.success(data.message || "Item created successfully.");
      navigate("/market-place");
    },
    onError: (error: AxiosError<{ message: string; errors?: string[] }>) => {
      const data = error.response?.data;
      toast.error(
        data?.errors?.join(", ") || data?.message || "Error in creating item.",
      );
    },
  });
};
