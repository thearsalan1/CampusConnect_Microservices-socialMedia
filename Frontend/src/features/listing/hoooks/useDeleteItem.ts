import { listingKeys } from "./listing.keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteItemApi } from "../api/listing.api";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteItemApi,
    onSuccess: (data) => {
      toast.success(data.message || "Item deleted successfully");
      queryClient.invalidateQueries({ queryKey: listingKeys.all });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const messaage =
        error.response?.data.message || "Error in deleting the item.";
      toast.error(messaage);
    },
  });
};
