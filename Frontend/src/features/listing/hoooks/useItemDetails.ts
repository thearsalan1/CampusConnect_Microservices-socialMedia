import { useQuery } from "@tanstack/react-query";
import { getItemDetailApi } from "../api/listing.api";
import { listingKeys } from "./listing.keys";

export const useItemDetails = (itemId: string) => {
  return useQuery({
    queryKey: listingKeys.detail(itemId),
    queryFn: () => getItemDetailApi({ itemId }),
    enabled: !!itemId,
  });
};
