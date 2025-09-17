# Controllers For Backend APIs

## 1. User Controllers

- **Register User: POST /users/register**
  - export const registerUser = async (req, res) => {}
- **Login User: POST /users/login**
  - export const loginUser = async (req, res) => {}
- **Get All Users: GET /users/all-users**
  - export const getAllUsers = async (req, res) => {}
- **Get User by ID: GET /users/:id**
  - export const getUserById = async (req, res) => {}
- **Update User by ID: PUT /users/:id**
  - export const updateUserById = async (req, res) => {}
- **Update User Avatar: PUT /users/update-avatar**
  - export const updateUserAvatar = async (req, res) => {}
- **Update User Password: PUT /users/update-password**
  - export const updateUserPassword = async (req, res) => {}
- **Logout User: POST /users/logout**
  - export const logoutUser = async (req, res) => {}
- **Post Refresh Token: POST /users/refresh-token**
  - export const postRefreshToken = async (req, res) => {}
- **Forgot Password: POST /users/forgot-password**
  - export const forgotPassword = async (req, res) => {}
- **Forgot password verify code and set new password: POST /users/forgot-password-verify-code**
  - export const forgotPasswordVerifyCode = async (req, res) => {}
- **Verify Email: POST /users/verify-email**
  - export const verifyEmail = async (req, res) => {}
- **Delete User by ID: DELETE /users/:id**
  - export const deleteUserById = async (req, res) => {}

---

## 2. Seller Controllers

- **Register Seller: POST /sellers/register**
  - export const registerSeller = async (req, res) => {}
- **Login Seller: POST /sellers/login**
  - export const loginSeller = async (req, res) => {}
- **Get All Sellers: GET /sellers/all-sellers**
  - export const getAllSellers = async (req, res) => {}
- **Get Seller by ID: GET /sellers/:id**
  - export const getSellerById = async (req, res) => {}
- **Update Seller by ID: PUT /sellers/:id**
  - export const updateSellerById = async (req, res) => {}
- **Update Seller Bank Details by ID: PUT /sellers/bank/:id**
  - export const updateSellerBankDetails = async (req, res) => {}
- **Update Seller Avatar: PUT /sellers/update-avatar**
  - export const updateSellerAvatar = async (req, res) => {}
- **Update Seller Password: PUT /sellers/update-password**
  - export const updateSellerPassword = async (req, res) => {}
- **Logout Seller: POST /sellers/logout**
  - export const logoutSeller = async (req, res) => {}
- **Post Refresh Token: POST /sellers/refresh-token**
  - export const refreshToken = async (req, res) => {}
- **Forgot Password: POST /sellers/forgot-password**
  - export const forgotPassword = async (req, res) => {}
- **Forgot password verify code and set new password: POST /sellers/forgot-password-verify-code**
  - export const forgotPasswordVerifyCode = async (req, res) => {}
- **Verify Email: POST /sellers/verify-email**
  - export const verifyEmail = async (req, res) => {}
- **Delete Seller by ID: DELETE /sellers/:id**
  - export const deleteSellerById = async (req, res) => {}

---

## 3. Admin Controllers

- **Register Admin: POST /admins/register**
  - export const registerAdmin = async (req, res) => {}
- **Login Admin: POST /admins/login**
  - export const loginAdmin = async (req, res) => {}
- **Get Admin by ID: GET /admins/:id**
  - export const getAdminById = async (req, res) => {}
- **Update Admin by ID: PUT /admins/:id**
  - export const updateAdminById = async (req, res) => {}
- **Logout Admin: POST /admins/logout**
  - export const logoutAdmin = async (req, res) => {}
- **Post Refresh Token: POST /admins/refresh-token**
  - export const refreshToken = async (req, res) => {}
- **Post Update Admin Password: POST /admins/update-password**
  - export const updateAdminPassword = async (req, res) => {}
- **Forgot Password: POST /admins/forgot-password**
  - export const forgotPassword = async (req, res) => {}
- **Forgot password verify code and set new password: POST /admins/forgot-password-verify-code**
  - export const forgotPasswordVerifyCode = async (req, res) => {}
- **Delete Admin by ID: DELETE /admins/:id**
  - export const deleteAdminById = async (req, res) => {}

---

## 4. Category Controllers

- **Create Category: POST /categories**
  - export const createCategory = async (req, res) => {}
- **Get All Categories: GET /categories**
  - export const getAllCategories = async (req, res) => {}
- **Get Category by ID: GET /categories/:id**
  - export const getCategoryById = async (req, res) => {}
- **Update Category by ID: PUT /categories/:id**
  - export const updateCategoryById = async (req, res) => {}
- **Delete Category by ID: DELETE /categories/:id**
  - export const deleteCategoryById = async (req, res) => {}

---

## 5. Product Controllers

- **Create Product: POST /add-products**
  - export const createProduct = async (req, res) => {}
- **Get All Products: GET /products**
  - export const getAllProducts = async (req, res) => {}
- **Get Product by ID: GET /products/:id**
  - export const getProductById = async (req, res) => {}
- **Get Products by Category: GET /products/category/:category**
  - export const getProductsByCategory = async (req, res) => {}
- **Update Product by ID: PUT /products/:id**
  - export const updateProductById = async (req, res) => {}
- **Update Product Image by ID: PUT /products/image/:id**
  - export const updateProductImage = async (req, res) => {}
- **Delete Product by ID: DELETE /products/:id**
  - export const deleteProductById = async (req, res) => {}

---

## 6. Order Controllers

- **Create Order: POST /orders**
  - export const createOrder = async (req, res) => {}
- **Get All Orders: GET /orders**
  - export const getAllOrders = async (req, res) => {}
- **Get Order by User ID: GET /orders/:id**
  - export const getOrderById = async (req, res) => {}
- **Get Orders based on Seller ID: GET /orders/seller/:id**
  - export const getOrdersBySellerId = async (req, res) => {}
- **Update Order by ID: PUT /orders/:id**
  - export const updateOrderById = async (req, res) => {}
- **Update Order Status by order ID: PUT /orders/status/:id**
  - export const updateOrderStatus = async (req, res) => {}
- **Delete Order by ID: DELETE /orders/:id**
  - export const deleteOrderById = async (req, res) => {}

---

## 7. Review Controllers

- **Create Review: POST /reviews**
  - export const createReview = async (req, res) => {}
- **Get All Reviews: GET /reviews**
  - export const getAllReviews = async (req, res) => {}
- **Get Review by Product ID: GET /reviews/:id**
  - export const getReviewById = async (req, res) => {}
- **Update Review by ID: PUT /reviews/:id**
  - export const updateReviewById = async (req, res) => {}
- **Delete Review by ID: DELETE /reviews/:id**
  - export const deleteReviewById = async (req, res) => {}

---

## 8. Cart Controllers

- **Add to Cart: POST /carts**
  - export const addToCart = async (req, res) => {}
- **Get All Carts: GET /carts**
  - export const getAllCarts = async (req, res) => {}
- **Get Cart by User ID: GET /carts/:id**
  - export const getCartById = async (req, res) => {}
- **Update Cart by ID: PUT /carts/:id**
  - export const updateCartById = async (req, res) => {}
- **Delete Cart by ID: DELETE /carts/:id**
  - export const deleteCartById = async (req, res) => {}

---

## 9. Wishlist Controllers

- **Add to Wishlist: POST /wishlists**
  - export const addToWishlist = async (req, res) => {}
- **Get All Wishlists: GET /wishlists**
  - export const getAllWishlists = async (req, res) => {}
- **Get Wishlist by User ID: GET /wishlists/:id**
  - export const getWishlistById = async (req, res) => {}
- **Update Wishlist by ID: PUT /wishlists/:id**
  - export const updateWishlistById = async (req, res) => {}
- **Delete Wishlist by ID: DELETE /wishlists/:id**
  - export const deleteWishlistById = async (req, res) => {}

---

## **10. Like Controllers**

- **Add to Like: POST /likes**
  - export const addToLike = async (req, res) => {}
- **Get All Likes: GET /likes**
  - export const getAllLikes = async (req, res) => {}
- **Get Like by User ID: GET /likes/:id**
  - export const getLikeById = async (req, res) => {}
- **Update Like by ID: PUT /likes/:id**
  - export const updateLikeById = async (req, res) => {}
- **Delete Like by ID: DELETE /likes/:id**
  - export const deleteLikeById = async (req, res) => {}

---

## 11. Invoice Controllers

- **Create Invoice: POST /invoices**
  - export const createInvoice = async (req, res) => {}
- **Get All Invoices: GET /invoices**
  - export const getAllInvoices = async (req, res) => {}
- **Get Invoice by User ID: GET /invoices/:id**
  - export const getInvoiceById = async (req, res) => {}
- **Update Invoice by ID: PUT /invoices/:id**
  - export const updateInvoiceById = async (req, res) => {}
- **Delete Invoice by ID: DELETE /invoices/:id**
  - export const deleteInvoiceById = async (req, res) => {}

---

## 12. Reply Controllers

- **Create Reply: POST /replies**
  - export const createReply = async (req, res) => {}
- **Get All Replies: GET /replies**

  - export const getAllReplies = async (req, res) => {}

- **Get Reply by Review ID: GET /replies/:id**
  - export const getReplyByReviewId = async (req, res) => {}
- **Update Reply by ID: PUT /replies/:id**
  - export const updateReplyByReviewId = async (req, res) => {}
- **Delete Reply by ID: DELETE /replies/:id**
  - export const deleteReplyById = async (req, res) => {}
