import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useItemDetails } from "../../features/listing/hoooks/useItemDetails";
import { useUpdateItem } from "../../features/listing/hoooks/useUpdateItem";
import { ItemCategory } from "../../features/listing/types/listing.types";
import toast from "react-hot-toast";

interface ImageData {
  url: string;
  publicId: string;
}

const EditItem = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data, isLoading, error: fetchError } = useItemDetails(itemId || "");
  const { mutate: updateItem, isPending, error: updateError } = useUpdateItem();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ItemCategory>(ItemCategory.Other);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ImageData[]>([]);

  useEffect(() => {
    if (data?.data) {
      const item = data.data;
      setTitle(item.title);
      setPrice(item.price);
      setDescription(item.description);
      setCategory(item.category);
      setExistingImages(item.images || []);
    }
  }, [data]);

  useEffect(() => {
    if (fetchError) toast.error(fetchError.message);
    if (updateError) toast.error(updateError.message);
  }, [fetchError, updateError]);

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

  const removeExistingImage = (index: number) => {
    const updatedFiles = existingImages.filter((_, i) => i !== index);
    setExistingImages(updatedFiles);
  };

  const handleUpdateItem = () => {
    if (!itemId) return toast.error("Item ID not found in URL!");
    if (title.trim().length < 3)
      return toast.error("Title must be at least 3 characters.");
    if (description.trim().length < 50 || description.trim().length > 300)
      return toast.error("Description must be between 50 and 300 characters.");
    if (price < 10 || price > 10000)
      return toast.error("Price must be between 10 and 10000.");

    updateItem({
      itemId,
      payLoad: {
        title,
        price,
        description,
        category,
        images,
      },
    });
  };

  if (isLoading) return <p>Loading item details...</p>;

  return (
    <div className="h-full w-full p-5">
      <h1 className="text-heading text-4xl text-text-muted text-center">
        Edit Item
      </h1>
      <div className="w-[90%] p-5 mx-auto flex flex-col gap-5">
        <div className="grid grid-cols-2 w-full gap-10">
          <div>
            <label className="text-sm text-body text-text-muted ml-3">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-card rounded-xl px-4 py-2 outline-none border border-card-hover focus:border-primary text-text-muted placeholder:text-text-muted mt-2 text-sm"
              placeholder="Enter Item title..."
            />
          </div>
          <div>
            <label className="text-sm text-body text-text-muted ml-3">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full bg-card rounded-xl px-4 py-2 outline-none border border-card-hover focus:border-primary text-text-muted placeholder:text-text-muted mt-2 text-sm"
              placeholder="Enter Item Price..."
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-body text-text-muted ml-3">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-card rounded-xl px-4 py-2 outline-none border border-card-hover focus:border-primary text-text-muted placeholder:text-text-muted mt-2 text-sm"
            placeholder="Enter item description..."
            rows={5}
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="text-sm text-body text-text-muted ml-3">Images (max 5)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="w-full bg-card rounded-xl px-4 py-2 outline-none border border-card-hover focus:border-primary text-text-muted placeholder:text-text-muted mt-2 text-sm"
            />

            {existingImages.length > 0 && (
              <div className="flex gap-4 flex-wrap mt-4">
                {existingImages.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24 border rounded-xl overflow-hidden">
                    <img src={img.url} alt={`existing-${idx}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeExistingImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {images.length > 0 && (
              <div className="flex gap-4 flex-wrap mt-4">
                {images.map((file, idx) => (
                  <div key={idx} className="relative w-24 h-24 border rounded-xl overflow-hidden">
                    <img src={URL.createObjectURL(file)} alt={`new-${idx}`} className="w-full h-full object-cover" />
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
            <label className="text-sm text-body text-text-muted ml-3">Category</label>
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

        <button
          onClick={handleUpdateItem}
          disabled={isPending}
          className="mt-6 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition disabled:opacity-50"
        >
          {isPending ? "Updating..." : "Update Item"}
        </button>
      </div>
    </div>
  );
};

export default EditItem;
