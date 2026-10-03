export interface LoginPayLoad {
  collegeId: string;
  password: string;
}

export interface AuthUser {
  userId: string;
  name: string;
  branch: string;
  role: string;
  collegeId: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: AuthUser;
}

export interface SignUpPayload {
  collegeId: string;
  password: string;
  name: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  maskedEmail: string;
}

export interface VerifyOtpPayload {
  collegeId: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
}

export interface ResendOtpPayload {
  collegeId: string;
}

export interface ResendOtpResponse {
  success: boolean;
  message: string;
}

export interface MeResponse {
  success: boolean;
  user: AuthUser; 
}
