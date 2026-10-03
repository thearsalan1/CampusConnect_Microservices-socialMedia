import { Router } from "express";
import {
  forgetPassword,
  login,
  logOut,
  refreshAccessToken,
  resendOtp,
  resetPassword,
  signup,
  verifyOtp,
} from "../controllers/auth.controller.js";
import { createRateLimiter } from "../middleware/rateLimiter.js";
import { validate } from "../middleware/validate.js";
import {
  loginSchema,
  otpSchema,
  signupSchema,
} from "../validator/auth.validator.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/sign-up",
  // createRateLimiter({
  //   windowInSeconds: 15 * 60,
  //   maxRequests: 3,
  //   prefix: "rl:signup",
  // }),
  validate(signupSchema),
  signup,
);
router.post(
  "/verify",
  createRateLimiter({
    windowInSeconds: 10 * 60,
    maxRequests: 5,
    prefix: "rl:verify",
  }),
  validate(otpSchema),
  verifyOtp,
);
router.post(
  "/login",
  createRateLimiter({
    windowInSeconds: 15 * 60,
    maxRequests: 10,
    prefix: "rl:login",
  }),
  validate(loginSchema),
  login,
);
router.post(
  "/refresh-token",
  createRateLimiter({
    windowInSeconds: 60 * 60,
    maxRequests: 10,
    prefix: "rl:refresh",
  }),
  refreshAccessToken,
);
router.post(
  "/forgot-password",
  createRateLimiter({
    windowInSeconds: 60 * 60,
    maxRequests: 3,
    prefix: "rl:forgot-password",
  }),
  forgetPassword,
);
router.post(
  "/reset-password",
  createRateLimiter({
    windowInSeconds: 60 * 60,
    maxRequests: 3,
    prefix: "rl:reset-password",
  }),
  resetPassword,
);
router.post(
  "/resend-otp",
  createRateLimiter({
    windowInSeconds: 60 * 60,
    maxRequests: 10,
    prefix: "rl:resend-otp",
  }),
  resendOtp,
);
router.post(
  "/logout",
  authMiddleware,
  createRateLimiter({
    windowInSeconds: 60 * 60,
    maxRequests: 3,
    prefix: "rl:logout",
  }),
  logOut,
);

export default router;
