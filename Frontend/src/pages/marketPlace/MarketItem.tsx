import { useListing } from "../../features/listing/hoooks/useListing";
import type { ListingFilters } from "../../features/listing/types/listing.types";

export interface ListingItems {
  filters: ListingFilters | null;
}

const MarketItem = (filters: ListingFilters) => {
  const { data, isPending, error } = useListing({ ...filters });

  if (isPending) {
    return <div>Loding items</div>;
  }
  console.log(data?.message);

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }
  return <div></div>;
};

export default MarketItem;
