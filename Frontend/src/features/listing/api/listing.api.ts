import { axiosClient } from "../../../api/axiosClient";
import { LISTINGS_ENDPOINTS } from "../../../api/endpoints";
import type {
  CreateListingPayload,
  CreateListingResponse,
  DeleteItemResponse,
  ItemDeletePayload,
  ItemsDetailPayLoad,
  ItemsDetailResponse,
  ItemTogglePayload,
  ListingFilters,
  ListingsResponse,
  MyItemsResponse,
  ToggleItemStatusResponse,
  UpdateItemPayLoad,
  UpdateItemResponse,
} from "../types/listing.types";

export const getListingApi = async (
  filters: ListingFilters,
): Promise<ListingsResponse> => {
  const { data } = await axiosClient.get(
    LISTINGS_ENDPOINTS.GET_MARKETPLACE_POSTS,
    {
      params: filters,
    },
  );
  return data;
};

export const createListingApi = async (
  payload: CreateListingPayload,
): Promise<CreateListingResponse> => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("price", String(payload.price));
  formData.append("category", payload.category);
  payload.images.forEach((file) => formData.append("images", file));

  const { data } = await axiosClient.post(
    LISTINGS_ENDPOINTS.CREATE_MARKETPLACE_POST,
    formData,
  );
  return data;
};

export const myItemsApi = async (): Promise<MyItemsResponse> => {
  const { data } = await axiosClient.get(LISTINGS_ENDPOINTS.MY_ITEMS);
  return data;
};

export const getItemDetailApi = async ({
  itemId,
}: ItemsDetailPayLoad): Promise<ItemsDetailResponse> => {
  const { data } = await axiosClient.get(
    `${LISTINGS_ENDPOINTS.ITEM_DETAILS}/${itemId}`,
  );
  return data;
};

export const UpdateItemApi = async (
  itemId: string,
  payLoad: UpdateItemPayLoad,
): Promise<UpdateItemResponse> => {
  const formData = new FormData();
  formData.append("title", payLoad.title);
  formData.append("price", String(payLoad.price));
  formData.append("description", payLoad.description);
  formData.append("category", payLoad.category);
  payLoad.images?.forEach((file) => formData.append("images", file));

  const { data } = await axiosClient.patch(
    `${LISTINGS_ENDPOINTS.UPDATE_ITEM}/${itemId}`,
    formData,
  );
  return data;
};

export const DeleteItemApi = async ({
  itemId,
}: ItemDeletePayload): Promise<DeleteItemResponse> => {
  const { data } = await axiosClient.delete(
    `${LISTINGS_ENDPOINTS.DELETE_ITEM}/${itemId}`,
  );
  return data;
};

export const ToggleItemStatusApi = async ({
  itemId,
}: ItemTogglePayload): Promise<ToggleItemStatusResponse> => {
  const { data } = await axiosClient.patch(
    `${LISTINGS_ENDPOINTS.ITEM_STATUS}/${itemId}`,
  );
  return data;
};
