import { type LoginPayLoad, type LoginResponse } from "./auth.types";
import { axiosClient } from "../../api/axiosClient";
import { AUTH_ENDPOINTS } from "../../api/endpoints";

export const loginApi = async (
  payLoad: LoginPayLoad,
): Promise<LoginResponse> => {
  const { data } = await axiosClient.post(AUTH_ENDPOINTS.LOGIN, payLoad);
  return data;
};
