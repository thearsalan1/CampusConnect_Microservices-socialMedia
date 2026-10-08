import React, { useState } from "react";
import { useItemDetails } from "../../features/listing/hoooks/useItemDetails";
import { useNavigate, useParams } from "react-router-dom";

const ItemDetails = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { data, isPending, error } = useItemDetails(itemId);
  const [selected, setSelected] = useState("");

  if (!itemId) {
    navigate("/market-place");
  }

  if (isPending) {
    return <div className="text-2xl text-primary">Loading...</div>;
  }
  if (error) {
    return <div className="text-2xl text-red-500">{error.message}</div>;
  }

  const item = data.data;

  return (
    <div className="w-[80%] h-full mx-auto p-5 grid grid-cols-[120px_1fr] gap-6">
      {/* Thumbnail list */}
      <div className="flex flex-col gap-4">
        {item.images.map((image) => (
          <div
            key={image.publicId}
            className="border rounded-xl h-20 w-20 overflow-hidden flex items-center justify-center cursor-pointer hover:border-primary"
            onClick={() => setSelected(image.url)}
          >
            <img
              src={image.url}
              alt=""
              className="object-cover h-full w-full"
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex gap-6">
        {/* Main image */}
        <div className="w-1/2 flex items-center justify-center border border-accent rounded-2xl overflow-hidden">
          <img
            src={selected === "" ? item.images[0].url : selected}
            alt={item.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Content details */}
        <div className="bg-card w-1/2 p-6 rounded-2xl flex flex-col gap-6 hover:bg-card-hover transition">
          {/* Title + Price */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl text-logo text-text-primary capitalize">
              {item.title}
            </h1>
            <span className="text-heading text-success text-2xl font-semibold">
              ₹{item.price}
            </span>
          </div>

          {/* Description */}
          <p className="text-body text-text-secondary leading-relaxed">
            {item.description}
          </p>

          {/* Info list */}
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-heading text-text-muted">Category</span>
              <span className="text-body text-text-primary capitalize">
                {item.category}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-heading text-text-muted">Status</span>
              <span className="text-body text-success font-medium">
                {item.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-heading text-text-muted">Seller</span>
              <span className="text-body text-text-primary">
                {item.userName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-heading text-text-muted">Branch</span>
              <span className="text-body text-text-primary">{item.branch}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-heading text-text-muted">College</span>
              <span className="text-body text-text-primary">
                {item.collegeName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-heading text-text-muted">Posted on</span>
              <span className="text-body text-text-secondary">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 mt-6">
            <button className="flex-1 px-5 py-2 bg-primary text-text-on-primary rounded-lg hover:bg-primary-hover text-body font-medium">
              Contact Seller
            </button>
            <button className="flex-1 px-5 py-2 bg-danger text-text-on-primary rounded-lg hover:bg-danger/80 text-body font-medium">
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
