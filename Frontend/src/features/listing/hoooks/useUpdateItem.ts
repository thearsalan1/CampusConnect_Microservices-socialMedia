import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { UpdateItemApi } from "../api/listing.api";
import { listingKeys } from "./listing.keys";

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, payLoad }: { itemId: string; payLoad: Parameters<typeof UpdateItemApi>[1] }) =>
      UpdateItemApi(itemId, payLoad),
    onSuccess: (data, { itemId }) => {
      toast.success(data.message || "Item updated successfully");
      queryClient.invalidateQueries({ queryKey: listingKeys.all });
      queryClient.invalidateQueries({ queryKey: listingKeys.detail(itemId) });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Error in updating item");
    },
  });
};
