# Todo for Controllers

This document outlines the todo list for implementing the controllers for the e-commerce backend.

## General

- [ ] Create a `controllers` directory.
- [ ] Create a centralized error handling middleware.

## 1. User Controller (`userController.js`)

- [ ] `registerUser`
- [ ] `loginUser`
- [ ] `getAllUsers`
- [ ] `getUserById`
- [ ] `updateUserById`
- [ ] `updateUserAvatar`
- [ ] `updateUserPassword`
- [ ] `logoutUser`
- [ ] `postRefreshToken`
- [ ] `forgotPassword`
- [ ] `forgotPasswordVerifyCode`
- [ ] `verifyEmail`
- [ ] `deleteUserById`

## 2. Seller Controller (`sellerController.js`)

- [ ] `registerSeller`
- [ ] `loginSeller`
- [ ] `getAllSellers`
- [ ] `getSellerById`
- [ ] `updateSellerById`
- [ ] `updateSellerBankDetails`
- [ ] `updateSellerAvatar`
- [ ] `updateSellerPassword`
- [ ] `logoutSeller`
- [ ] `refreshToken`
- [ ] `forgotPassword`
- [ ] `forgotPasswordVerifyCode`
- [ ] `verifyEmail`
- [ ] `deleteSellerById`

## 3. Admin Controller (`adminController.js`)

- [ ] `registerAdmin`
- [ ] `loginAdmin`
- [ ] `getAdminById`
- [ ] `updateAdminById`
- [ ] `logoutAdmin`
- [ ] `refreshToken`
- [ ] `updateAdminPassword`
- [ ] `forgotPassword`
- [ ] `forgotPasswordVerifyCode`
- [ ] `deleteAdminById`

## 4. Category Controller (`categoryController.js`)

- [ ] `createCategory`
- [ ] `getAllCategories`
- [ ] `getCategoryById`
- [ ] `updateCategoryById`
- [ ] `deleteCategoryById`

## 5. Product Controller (`productController.js`)

- [ ] `createProduct`
- [ ] `getAllProducts`
- [ ] `getProductById`
- [ ] `getProductsByCategory`
- [ ] `updateProductById`
- [ ] `updateProductImage`
- [ ] `deleteProductById`

## 6. Order Controller (`orderController.js`)

- [ ] `createOrder`
- [ ] `getAllOrders`
- [ ] `getOrderById`
- [ ] `getOrdersBySellerId`
- [ ] `updateOrderById`
- [ ] `updateOrderStatus`
- [ ] `deleteOrderById`

## 7. Review Controller (`reviewController.js`)

- [ ] `createReview`
- [ ] `getAllReviews`
- [ ] `getReviewById`
- [ ] `updateReviewById`
- [ ] `deleteReviewById`

## 8. Cart Controller (`cartController.js`)

- [ ] `addToCart`
- [ ] `getAllCarts`
- [ ] `getCartById`
- [ ] `updateCartById`
- [ ] `deleteCartById`

## 9. Wishlist Controller (`wishlistController.js`)

- [ ] `addToWishlist`
- [ ] `getAllWishlists`
- [ ] `getWishlistById`
- [ ] `updateWishlistById`
- [ ] `deleteWishlistById`

## 10. Like Controller (`likeController.js`)

- [ ] `addToLike`
- [ ] `getAllLikes`
- [ ] `getLikeById`
- [ ] `updateLikeById`
- [ ] `deleteLikeById`

## 11. Invoice Controller (`invoiceController.js`)

- [ ] `createInvoice`
- [ ] `getAllInvoices`
- [ ] `getInvoiceById`
- [ ] `updateInvoiceById`
- [ ] `deleteInvoiceById`

## 12. Reply Controller (`replyController.js`)

- [ ] `createReply`
- [ ] `getAllReplies`
- [ ] `getReplyByReviewId`
- [ ] `updateReplyByReviewId`
- [ ] `deleteReplyById`
