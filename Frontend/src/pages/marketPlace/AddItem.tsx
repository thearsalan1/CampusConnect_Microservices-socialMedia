import React, { useState, useRef } from "react";
import { useCreateListing } from "../../features/listing/hoooks/useCreateListing";
import { ItemCategory } from "../../features/listing/types/listing.types";
import toast from "react-hot-toast";

const AddItem = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState<ItemCategory>(ItemCategory.Other);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate: createItem, isPending, error } = useCreateListing();

  if (error) {
    return <div>{error.message}</div>;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);
    const updatedFiles = [...images, ...selectedFiles].slice(0, 5);

    setImages(updatedFiles);
  };

  const removeImage = (index: number) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    setImages(updatedFiles);

    if (updatedFiles.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCreateItem = () => {
    if (title.trim().length < 3)
      return toast.error("Title kam se kam 3 characters ka ho.");
    if (description.trim().length < 50 || description.trim().length > 300)
      return toast.error("Description 50 se 300 characters ke beech ho.");
    if (price < 10 || price > 10000)
      return toast.error("Price 10 se 10000 ke beech ho.");
    if (images.length === 0) return toast.error("Kam se kam ek image chahiye.");
    createItem({ title, price, description, images, category });
  };

  return (
    <div className="h-full w-full p-5">
      <h1 className="text-heading text-4xl text-text-muted text-center ">
        Add New Item
      </h1>
      <div className="w-[90%] p-5 mx-auto flex flex-col gap-5">
        <div className="grid grid-cols-2 w-full gap-10">
          <div>
            <label className="text-sm text-body text-text-muted ml-3">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-card rounded-xl px-4 py-2 outline-none border border-card-hover focus:border-primary placeholder:text-text-muted text-text-muted mt-2 text-sm"
              placeholder="Enter Item title..."
            />
          </div>
          <div>
            <label className="text-sm text-body text-text-muted ml-3">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full bg-card rounded-xl px-4 py-2 outline-none border border-card-hover focus:border-primary placeholder:text-text-muted text-text-muted mt-2 text-sm"
              placeholder="Enter Item Price..."
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-body text-text-muted ml-3">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-card rounded-xl px-4 py-2 outline-none border border-card-hover focus:border-primary placeholder:text-text-muted text-text-muted mt-2 text-sm"
            placeholder="Enter items description..."
            rows={5}
          ></textarea>
        </div>

        {/* Images + Category side by side */}
        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="text-sm text-body text-text-muted ml-3">
              Images (max 5)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="w-full bg-card rounded-xl px-4 py-2 outline-none border border-card-hover focus:border-primary placeholder:text-text-muted text-text-muted mt-2 text-sm"
            />

            {/* Preview Section */}
            {images.length > 0 && (
              <div className="flex gap-4 flex-wrap mt-4">
                {images.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative w-24 h-24 border border-accent rounded-xl overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${idx}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm text-body text-text-muted ml-3">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ItemCategory)}
              className="w-full bg-card rounded-xl px-4 py-2 outline-none border border-card-hover focus:border-primary text-text-muted mt-2 text-sm"
            >
              {Object.values(ItemCategory).map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Create Item Button */}
        <button
          onClick={handleCreateItem}
          disabled={isPending}
          className="mt-6 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Create Item"}
        </button>
      </div>
    </div>
  );
};

export default AddItem;
