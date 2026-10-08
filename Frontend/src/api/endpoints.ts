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
  CREATE_MARKETPLACE_POST: "/listings/marketplace",   
  MY_ITEMS: "/listings/marketplace/my",    //Done
  ITEM_DETAILS: "/listings/marketplace/",   //Done
  GET_MARKETPLACE_POSTS: "/listings/marketplace", //Done
  UPDATE_ITEM: "/listings/marketplace/:itemId", 
  DELETE_ITEM: "/listings/marketplace/",    //Done
  ITEM_STATUS: "/listings/marketplace/",
};
