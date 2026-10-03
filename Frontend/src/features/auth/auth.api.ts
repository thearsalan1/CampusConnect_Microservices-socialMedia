import {
  type LoginPayLoad,
  type LoginResponse,
  type MeResponse,
  type ResendOtpPayload,
  type ResendOtpResponse,
  type SignUpPayload,
  type SignUpResponse,
  type VerifyOtpPayload,
  type VerifyOtpResponse,
} from "./auth.types";
import { axiosClient } from "../../api/axiosClient";
import { AUTH_ENDPOINTS } from "../../api/endpoints";

export const loginApi = async (
  payLoad: LoginPayLoad,
): Promise<LoginResponse> => {
  const { data } = await axiosClient.post(AUTH_ENDPOINTS.LOGIN, payLoad);
  return data;
};

export const signUpApi = async (
  payload: SignUpPayload,
): Promise<SignUpResponse> => {
  const { data } = await axiosClient.post(AUTH_ENDPOINTS.SIGN_UP, payload);
  return data;
};

export const verifyOtpApi = async (
  payload: VerifyOtpPayload,
): Promise<VerifyOtpResponse> => {
  const { data } = await axiosClient.post(AUTH_ENDPOINTS.VERIFY, payload);
  return data;
};

export const resendOtp = async (
  payload: ResendOtpPayload,
): Promise<ResendOtpResponse> => {
  const { data } = await axiosClient.post(AUTH_ENDPOINTS.RESEND_OTP, payload);
  return data;
};

export const me = async (): Promise<MeResponse> => {
  const { data } = await axiosClient.get(AUTH_ENDPOINTS.ME);
  return data;
};
