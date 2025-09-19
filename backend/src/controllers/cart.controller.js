import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as cartService from "../services/cart.service.js";

const getCart = asyncHandler(async (req, res) => {
  console.log("Cart request user", req.user._id);
  const cart = await cartService.getCartByUserIdService(req.user._id);
  console.log("Cart", cart);
  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart retrieved successfully"));
});

const addProductToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await cartService.addProductToCartService(
    req.user._id,
    productId,
    quantity
  );
  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Product added to cart successfully"));
});

const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await cartService.updateCartItemQuantityService(
    req.user._id,
    productId,
    quantity
  );
  return res
    .status(200)
    .json(
      new ApiResponse(200, cart, "Cart item quantity updated successfully")
    );
});

const removeProductFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const cart = await cartService.removeProductFromCartService(
    req.user._id,
    productId
  );
  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Product removed from cart successfully"));
});

const clearCart = asyncHandler(async (req, res) => {
  const cart = await cartService.clearCartService(req.user._id);
  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart cleared successfully"));
});

export {
  getCart,
  addProductToCart,
  updateCartItemQuantity,
  removeProductFromCart,
  clearCart,
};
