import type { MyItemsResponse } from "../types/listing.types";
import { useQuery } from "@tanstack/react-query";
import { myItemsApi } from "../api/listing.api";
import { listingKeys } from "./listing.keys";

export const useMyItems = () => {
  return useQuery({
    queryKey: listingKeys.mine,
    queryFn: () => myItemsApi,
  });
};
