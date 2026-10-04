import {
  type ForgotPasswordPayload,
  type ForgotPasswordResponse,
  type LoginPayLoad,
  type LoginResponse,
  type MeResponse,
  type ResendOtpPayload,
  type ResendOtpResponse,
  type ResetPasswordPayload,
  type ResetPasswordResponse,
  type SignUpPayload,
  type SignUpResponse,
  type VerifyOtpPayload,
  type VerifyOtpResponse,
} from "../types/auth.types";
import { axiosClient } from "../../../api/axiosClient";
import { AUTH_ENDPOINTS } from "../../../api/endpoints";

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

export const resetPassword = async (
  payload: ResetPasswordPayload,
): Promise<ResetPasswordResponse> => {
  const { data } = await axiosClient.post(
    AUTH_ENDPOINTS.RESET_PASSWORD,
    payload,
  );
  return data;
};

export const forgotPasswordApi = async (
  payload: ForgotPasswordPayload,
): Promise<ForgotPasswordResponse> => {
  const { data } = await axiosClient.post(
    AUTH_ENDPOINTS.FORGOT_PASSWORD,
    payload,
  );
  return data;
};
