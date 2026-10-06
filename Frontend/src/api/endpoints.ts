export const AUTH_ENDPOINTS = {
  SIGN_UP: "/auth/sign-up",
  VERIFY: "/auth/verify",
  LOGIN: "/auth/login",
  REFRESH: "/auth/refresh-token",
  LOGOUT: "/auth/logout",
  RESEND_OTP: "/auth/resend-otp",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  ME: "/auth/me",
};

export const LISTINGS_ENDPOINTS = {
  GET_MARKETPLACE_POSTS: "/marketplace",
  CREATE_MARKETPLACE_POST: "/marketplace",
  SINGLE_ITEM: "/marketplace/:itemId",
  MY_ITEMS: "/marketplace/my",
  UPDATE_ITEM: "/marketplace/:itemId",
  ITEM_STATUS: "/marketplace/:itemId/status",
  DELETE_ITEM: "/marketplace/:itemId",
  ITEM_DETAILS: "/marketplace/:itemId",
};
