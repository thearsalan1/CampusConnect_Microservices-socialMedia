import type { ListingFilters } from "../types/listing.types";

export const listingKeys = {
  all: ["listing"] as const,
  list: (filters: ListingFilters) => ["listing", "list", filters] as const,
  detail: (itemId: string) => ["listing", "detail", itemId] as const,
  mine: ["listing", "mine"] as const,
};
