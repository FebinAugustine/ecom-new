# Todo for Controllers

This document outlines the todo list for implementing the controllers for the e-commerce backend.

## General

- [x] Create a `controllers` directory.
- [ ] Create a centralized error handling middleware.

## 1. User Controller (`userController.js`)

- [x] `registerUser`
- [x] `loginUser`
- [x] `getAllUsers`
- [x] `getUserById`
- [x] `updateUserById`
- [x] `updateUserAvatar`
- [x] `updateUserPassword`
- [x] `logoutUser`
- [x] `postRefreshToken`
- [x] `forgotPassword`
- [x] `forgotPasswordVerifyCode`
- [x] `verifyEmail`
- [x] `deleteUserById`

## 2. Seller Controller (`sellerController.js`)

- [x] `registerSeller`
- [x] `loginSeller`
- [x] `getAllSellers`
- [x] `getSellerById`
- [x] `updateSellerById`
- [x] `updateSellerBankDetails`
- [x] `updateSellerAvatar`
- [x] `updateSellerPassword`
- [x] `logoutSeller`
- [x] `refreshToken`
- [x] `forgotPassword`
- [x] `forgotPasswordVerifyCode`
- [x] `verifyEmail`
- [x] `deleteSellerById`

## 3. Admin Controller (`adminController.js`)

- [x] `registerAdmin`
- [x] `loginAdmin`
- [x] `getAdminById`
- [x] `updateAdminById`
- [x] `logoutAdmin`
- [x] `refreshToken`
- [x] `updateAdminPassword`
- [x] `forgotPassword`
- [x] `forgotPasswordVerifyCode`
- [x] `deleteAdminById`

## 4. Category Controller (`categoryController.js`)

- [x] `createCategory`
- [x] `getAllCategories`
- [x] `getCategoryById`
- [x] `updateCategoryById`
- [x] `deleteCategoryById`

## 5. Product Controller (`productController.js`)

- [x] `createProduct`
- [x] `getAllProducts`
- [x] `getProductById`
- [x] `getProductsByCategory`
- [x] `updateProductById`
- [x] `updateProductImage`
- [x] `deleteProductById`

## 6. Order Controller (`orderController.js`)

- [x] `createOrder`
- [x] `getAllOrders`
- [x] `getOrderById`
- [x] `getOrdersBySellerId`
- [x] `updateOrderById`
- [x] `updateOrderStatus`
- [x] `deleteOrderById`

## 7. Review Controller (`reviewController.js`)

- [x] `createReview`
- [x] `getAllReviews`
- [x] `getReviewById`
- [x] `updateReviewById`
- [x] `deleteReviewById`

## 8. Cart Controller (`cartController.js`)

- [x] `addToCart`
- [x] `getAllCarts`
- [x] `getCartById`
- [x] `updateCartById`
- [x] `deleteCartById`

## 9. Wishlist Controller (`wishlistController.js`)

- [x] `addToWishlist`
- [x] `getAllWishlists`
- [x] `getWishlistById`
- [x] `updateWishlistById`
- [x] `deleteWishlistById`

## 10. Like Controller (`likeController.js`)

- [x] `addToLike`
- [x] `getAllLikes`
- [x] `getLikeById`
- [x] `updateLikeById`
- [x] `deleteLikeById`

## 11. Invoice Controller (`invoiceController.js`)

- [x] `createInvoice`
- [x] `getAllInvoices`
- [x] `getInvoiceById`
- [x] `updateInvoiceById`
- [x] `deleteInvoiceById`

## 12. Reply Controller (`replyController.js`)

- [x] `createReply`
- [x] `getAllReplies`
- [x] `getReplyByReviewId`
- [x] `updateReplyByReviewId`
- [x] `deleteReplyById`
