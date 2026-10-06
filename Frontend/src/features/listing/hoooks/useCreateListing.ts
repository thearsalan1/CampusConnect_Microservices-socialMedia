import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createListingApi } from "../api/listing.api";
import { listingKeys } from "./listing.keys";

export const useCreateListing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createListingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listingKeys.all });
    },
  });
};
