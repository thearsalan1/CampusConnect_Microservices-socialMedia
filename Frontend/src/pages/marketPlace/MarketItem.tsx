import { Link } from "react-router-dom";
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
  console.log(data?.data);

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }
  return (
    <div className="flex flex-col gap-6 p-4">
      {data?.data?.map((item) => (
        <Link to={`/market-place/${item._id}`}>
          <div
            key={item._id}
            className="w-full max-w-xl bg-card shadow-md rounded-lg p-4 flex flex-col gap-3"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-heading text-primary capitalize">
                {item.title}
              </h2>
              <span className="text-text-primary font-semibold">
                ₹{item.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-body text-text-muted w-[90%]">
              {item.description}
            </p>

            {/* Images */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {item.images.map((image) => (
                <img
                  key={image.publicId}
                  src={image.url}
                  alt={item.title}
                  className="w-32 h-32 object-cover rounded"
                />
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between text-sm text-body text-text-secondary mt-2">
              <span>
                Posted by <strong>{item.userName}</strong> ({item.branch},{" "}
                {item.collegeName})
              </span>
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MarketItem;
