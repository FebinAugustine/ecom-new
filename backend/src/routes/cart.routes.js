import express from "express";
import {
  getCart,
  addProductToCart,
  updateCartItemQuantity,
  removeProductFromCart,
  clearCart,
} from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// This middleware will run first for all routes, attaching the user to the request
router.use(verifyToken);

// --- CORRECTED ROUTE ---
// This now correctly listens for GET /api/v1/carts
// The getCart controller will use req.user._id to find the right cart.
router.get("/", getCart);

// These routes remain the same and are also protected by verifyToken
router.post("/", addProductToCart);
router.put("/", updateCartItemQuantity);
router.delete("/clear", clearCart);

// This route correctly expects the ID of the item *in the cart* to be deleted
router.delete("/:cartItemId", removeProductFromCart);

export default router;
