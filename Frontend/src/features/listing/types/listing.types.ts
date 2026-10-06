export const ItemCategory = {
  Books: "books",
  Electronics: "electronics",
  Cycle: "cycle",
  Furniture: "furniture",
  Stationery: "stationery",
  Other: "other",
} as const;

export type ItemCategory = (typeof ItemCategory)[keyof typeof ItemCategory];

export interface MarketPlaceItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: ItemCategory;
  images: { url: string; publicId: string }[];
  status: "AVAILABLE" | "SOLD";
  userId: string;
  userName: string;
  collegeName: string;
  branch: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListingFilters {
  category?: ItemCategory;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "oldest" | "priceLowToHigh" | "priceHighToLow";
  userId?: string;
  page?: number;
  limit?: number;
}

export interface ListingsResponse {
  success: boolean;
  message: string;
  data: MarketPlaceItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface CreateListingPayload {
  title: string;
  description: string;
  price: number;
  category: ItemCategory;
  images: File[];
}

export interface CreateListingResponse {
  success: boolean;
  message: string;
  data: MarketPlaceItem;
}

export interface MyItemsResponse {
  success: boolean;
  message: string;
  data: MarketPlaceItem[];
}

export interface ItemsDetailPayLoad {
  itemId: string;
}

export interface ItemsDetailResponse {
  success: boolean;
  message: string;
  data: MarketPlaceItem;
}

export interface UpdateItemPayLoad {
  title: string;
  description: string;
  price: number;
  category: ItemCategory;
  images?: File[];
}

export interface UpdateItemResponse {
  success: boolean;
  message: string;
  data: MarketPlaceItem;
}

export interface ItemDeletePayload{
  itemId:string
}

export interface DeleteItemResponse {
  success: boolean;
  message: string;
}

export interface ItemTogglePayload{
  itemId:string
}

export interface ToggleItemStatusResponse {
  success: boolean;
  message: string;
  data: MarketPlaceItem;
}
