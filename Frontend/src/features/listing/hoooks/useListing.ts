import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ListingFilters } from "../types/listing.types";
import { getListingApi } from "../api/listing.api";
import { listingKeys } from "./listing.keys";

export const useListing = (filters: ListingFilters) => {
  return useQuery({
    queryKey: listingKeys.list(filters),
    queryFn: () => getListingApi(filters),
    placeholderData: keepPreviousData,
  });
};
