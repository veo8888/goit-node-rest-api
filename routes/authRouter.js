import express from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  deleteAvatar,
  verifyEmail,
  resendVerificationEmail,
} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  resendEmailSchema,
} from "../schemas/authSchemas.js";
import authenticate from "../helpers/authenticate.js";
import upload from "../helpers/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.get("/verify/:verificationToken", verifyEmail);
authRouter.post(
  "/verify",
  validateBody(resendEmailSchema),
  resendVerificationEmail,
);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/current", authenticate, getCurrentUser);
authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateSubscription,
);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar,
);
authRouter.delete("/avatars", authenticate, deleteAvatar);

export default authRouter;
