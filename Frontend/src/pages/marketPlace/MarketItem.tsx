import { useListing } from "../../features/listing/hoooks/useListing";
import type { ListingFilters } from "../../features/listing/types/listing.types";

const MarketItem = (filters: ListingFilters) => {
  const { data, isPending, isError, error } = useListing(filters);

  if (isPending) {
    return <div>Loding items</div>;
  }
  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }
  return <div></div>;
};

export default MarketItem;
