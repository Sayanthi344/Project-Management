import express from "express";
import { registerSchema } from "../libs/validate-schema.js";
import { registerUser, loginUser, verifyEmail, resetPasswordRequest, verifyResetPasswordTokenAndResetPassword } from "../controllers/auth-controller.js";
import { validateRequest } from "zod-express-middleware";
import { loginSchema } from "../libs/validate-schema.js";
import { verifyEmailSchema } from "../libs/validate-schema.js";
import { emailSchema } from "../libs/validate-schema.js";
import { resetPasswordSchema } from "../libs/validate-schema.js";

const router = express.Router();

router.post(
  "/register",
  validateRequest({
    body: registerSchema
  }),
  registerUser
);

router.post(
  "/login",
  validateRequest({
    body: loginSchema
  }),
  loginUser
);

router.post(
  "/verify-email",
  validateRequest({
    body: verifyEmailSchema,
  }),
  verifyEmail
);

// FIX: Add validation for reset-password-request
router.post(
  "/reset-password-request", 
  validateRequest({
    body: emailSchema,
  }),
  resetPasswordRequest
);

router.post(
  "/reset-password",
  validateRequest({
    body: resetPasswordSchema,
  }),
  verifyResetPasswordTokenAndResetPassword
);

export default router;