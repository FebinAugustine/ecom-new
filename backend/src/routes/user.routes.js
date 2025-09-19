import express from "express";
import passport from "passport";
import {
  registerUser,
  loginUser,
  googleLogin,
  googleCallback,
  logoutUser,
  postRefreshToken,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserPassword,
  updateUserById,
  updateUserAvatar,
  forgotPassword,
  forgotPasswordVerifyCode,
  resendVerificationEmail,
  verifyEmail,
  deleteUserById,
  getUserProfile,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// --- PUBLIC ROUTES ---
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", postRefreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password-verify-code", forgotPasswordVerifyCode);
router.post("/resend-verification-email", resendVerificationEmail);
router.post("/verify-email", verifyEmail);

// --- GOOGLE OAUTH ROUTES ---
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  googleCallback
);

// --- PROTECTED ROUTES (require a valid token) ---
router.post("/logout", verifyToken, logoutUser);
router.put("/update-password", verifyToken, updateUserPassword);
router.put(
  "/update-avatar",
  verifyToken,
  upload.single("avatar"),
  updateUserAvatar
);
// It uses the ID from the token, not the URL.
router.route("/profile").get(verifyToken, getUserProfile);

// --- PROTECTED & AUTHORIZED ROUTES (require admin role) ---
router.get("/all-users", verifyToken, verifyTokenAndAdmin, getAllUsers);
router.get("/email/:email", verifyToken, verifyTokenAndAdmin, getUserByEmail);
router.get("/:id", verifyToken, verifyTokenAndAdmin, getUserById);
router.put("/:id", verifyToken, verifyTokenAndAdmin, updateUserById);
router.delete("/:id", verifyToken, verifyTokenAndAdmin, deleteUserById);

export default router;
