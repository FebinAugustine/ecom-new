# Services For Backend Controllers

## 1. User Services

- export const registerUserService = async (req, res) => {}
- export const loginUserService = async (req, res) => {}
- export const getAllUsersService = async (req, res) => {}
- export const getUserByIdService = async (req, res) => {}
- export const updateUserByIdService = async (req, res) => {}
- export const updateUserAvatarService = async (req, res) => {}
- export const updateUserPasswordService = async (req, res) => {}
- export const logoutUserService = async (req, res) => {}
- export const postRefreshTokenService = async (req, res) => {}
- export const forgotPasswordService = async (req, res) => {}
- export const forgotPasswordVerifyCodeService = async (req, res) => {}
- export const verifyEmailService = async (req, res) => {}
- export const deleteUserByIdService = async (req, res) => {}

## 2. Seller Services

- export const registerSellerService = async (req, res) => {}
- export const loginSellerService = async (req, res) => {}
- export const getAllSellersService = async (req, res) => {}
- export const getSellerByIdService = async (req, res) => {}
- export const updateSellerByIdService = async (req, res) => {}
- export const updateSellerBankDetailsService = async (req, res) => {}
- export const updateSellerAvatarService = async (req, res) => {}
- export const updateSellerPasswordService = async (req, res) => {}
- export const logoutSellerService = async (req, res) => {}
- export const refreshTokenService = async (req, res) => {}
- export const forgotPasswordService = async (req, res) => {}
- export const forgotPasswordVerifyCodeService = async (req, res) => {}
- export const verifyEmailService = async (req, res) => {}
- export const deleteSellerByIdService = async (req, res) => {}

## 3. Admin Services

- export const registerAdminService = async (req, res) => {}
- export const loginAdminService = async (req, res) => {}
- export const getAdminByIdService = async (req, res) => {}
- export const updateAdminByIdService = async (req, res) => {}
- export const logoutAdminService = async (req, res) => {}
- export const refreshTokenService = async (req, res) => {}
- export const updateAdminPasswordService = async (req, res) => {}
- export const forgotPasswordService = async (req, res) => {}
- export const forgotPasswordVerifyCodeService = async (req, res) => {}
- export const deleteAdminByIdService = async (req, res) => {}

## 4. Category Services

- export const createCategoryService = async (req, res) => {}
- export const getAllCategoriesService = async (req, res) => {}
- export const getCategoryByIdService = async (req, res) => {}
- export const updateCategoryByIdService = async (req, res) => {}
- export const deleteCategoryByIdService = async (req, res) => {}

## 5. Product Services

- export const createProductService = async (req, res) => {}
- export const getAllProductsService = async (req, res) => {}
- export const getProductByIdService = async (req, res) => {}
- export const getProductsByCategoryService = async (req, res) => {}
- export const updateProductByIdService = async (req, res) => {}
- export const updateProductImageService = async (req, res) => {}
- export const deleteProductByIdService = async (req, res) => {}

## 6. Order Services

- export const createOrderService = async (req, res) => {}
- export const getAllOrdersService = async (req, res) => {}
- export const getOrdersBySellerIdService = async (req, res) => {}
- export const getOrderByUserIdService = async (req, res) => {}
- export const updateOrderByIdService = async (req, res) => {}
- export const updateOrderStatusService = async (req, res) => {}
- export const deleteOrderByIdService = async (req, res) => {}

## 7. Review Services

- export const createReviewService = async (req, res) => {}
- export const getAllReviewsService = async (req, res) => {}
- export const getReviewByProductIdService = async (req, res) => {}
- export const updateReviewByIdService = async (req, res) => {}
- export const deleteReviewByIdService = async (req, res) => {}

## 8. Cart Services

- export const addToCartService = async (req, res) => {}
- export const getCartByUserIdService = async (req, res) => {}
- export const updateCartByIdService = async (req, res) => {}
- export const deleteCartByIdService = async (req, res) => {}

## 9. Wishlist Services

- export const addToWishlistService = async (req, res) => {}
- export const getWishlistByUserIdService = async (req, res) => {}
- export const updateWishlistByIdService = async (req, res) => {}
- export const deleteWishlistByIdService = async (req, res) => {}

## 10. Like Services

- export const addToLikeService = async (req, res) => {}
- export const getLikeByUserIdService = async (req, res) => {}
- export const updateLikeByIdService = async (req, res) => {}
- export const deleteLikeByIdService = async (req, res) => {}

## 11. Invoice Services

- export const createInvoiceService = async (req, res) => {}
- export const getAllInvoicesService = async (req, res) => {}
- export const getInvoiceByUserIdService = async (req, res) => {}
- export const updateInvoiceByIdService = async (req, res) => {}
- export const deleteInvoiceByIdService = async (req, res) => {}

## 12. Reply Services

- export const createReplyService = async (req, res) => {}
- export const getAllRepliesService = async (req, res) => {}
- export const getReplyByReviewIdService = async (req, res) => {}
- export const updateReplyByReviewIdService = async (req, res) => {}
- export const deleteReplyByIdService = async (req, res) => {}
