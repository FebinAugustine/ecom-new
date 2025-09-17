# All Routes For Backend APIs

- baseUrl = http://localhost:3000
- Extension - /api/v1/users

## Index file: index.js

- router.use('/users', userRoutes)
- router.use('/sellers', sellerRoutes)
- router.use('/admin', adminRoutes);
- router.use('/products', productRoutes)
- router.use('/categories', categoryRoutes)
- router.use('/orders', orderRoutes)
- router.use('/invoices', invoiceRoutes)
- router.use('/reviews', reviewRoutes);
- router.use('/carts', cartRoutes);
- router.use('/wishlists', wishlistRoutes);
- router.use('/likes', likeRoutes);
- router.use('/replies', replyRoutes);

---

## 1. User Routes

### Public Routes

- router.post('/register', registerUser);
- router.post('/login', loginUser);
- router.post('/refresh-token', postRefreshToken);
- router.post('/forgot-password', forgotPassword);
- router.post('/forgot-password-verify-code', forgotPasswordVerifyCode);
- router.post('/google-login', googleLogin);
- router.post('/verify-email', verifyEmail);

### Protected Routes

- router.get('/all-users', getAllUsers);
- router.get('/:id', getUserById);
- router.put('/:id', updateUserById);
- router.put('/update-avatar', updateUserAvatar);
- router.put('/update-password', updateUserPassword);
- router.post('/logout', logoutUser);-
- router.delete('/:id', deleteUserById);

---

## 2. Seller Routes

### Public Routes

- router.post('/register', registerSeller);
- router.post('/login', loginSeller);
- router.post('/refresh-token', refreshToken);
- router.post('/forgot-password', forgotPassword);
- router.post('/forgot-password-verify-code', forgotPasswordVerifyCode);
- router.post('/verify-email', verifyEmail);

### Protected Routes

- router.get('/all-sellers', getAllSellers);
- router.get('/:id', getSellerById);
- router.put('/:id', updateSellerById);
- router.put('/bank/:id', updateSellerBankDetails);
- router.put('/update-avatar', updateSellerAvatar);
- router.put('/update-password', updateSellerPassword);
- router.post('/logout', logoutSeller);
- router.delete('/:id', deleteSellerById);

---

## 3. Admin Routes

### Public Routes

- router.post('/register', registerAdmin);
- router.post('/login', loginAdmin);
- router.post('/forgot-password', forgotPassword);
- router.post('/forgot-password-verify-code', forgotPasswordVerifyCode);

### Protected Routes

- router.get('/all-admins', getAllAdmins);
- router.get('/:id', getAdminById);
- router.put('/:id', updateAdminById);
- router.post('/logout', logoutAdmin);
- router.post('/refresh-token', refreshToken);
- router.post('/update-password', updateAdminPassword);
- router.delete('/:id', deleteAdminById);

---

## 4. Category Routes

### Public Routes

- router.get('/', getAllCategories);

### Protected Routes

- router.post('/', createCategory);
- router.get('/:id', getCategoryById);
- router.put('/:id', updateCategoryById);
- router.delete('/:id', deleteCategoryById);

---

## 5. Product Routes

### Public Routes

- router.get('/', getAllProducts);
- router.get('/category/:category', getProductsByCategory);
- router.get('/:id', getProductById);

### Protected Routes

- router.post('/add-products', createProduct);
- router.get('/seller/:id', getProductsBySeller);
- router.put('/:id', updateProductById);
- router.delete('/:id', deleteProductById);
- router.put('/update-images/:id', updateProductImage);

---

## 6. Order Routes

### Protected Routes

- router.post('/', createOrder);
- router.get('/', getAllOrders);
- router.get('/:id', getOrderById);
- router.put('/:id', updateOrderById);
- router.delete('/:id', deleteOrderById);

---

## 7. Invoice Routes

### Protected Routes

- router.post('/', createInvoice);
- router.get('/', getAllInvoices);
- router.get('/:id', getInvoiceById);
- router.put('/:id', updateInvoiceById);
- router.delete('/:id', deleteInvoiceById);

---

## 8. Review Routes

### Public Routes

- router.get('/', getAllReviews);
- router.get('/:id', getReviewById);

### Protected Routes

- router.post('/', createReview);
- router.put('/:id', updateReviewById);
- router.delete('/:id', deleteReviewById);

---

## 9. Cart Routes

### Protected Routes

- router.post('/', addToCart);
- router.get('/', getAllCarts);
- router.get('/:id', getCartById);
- router.put('/:id', updateCartById);
- router.delete('/:id', deleteCartById);

---

## 10. Wishlist Routes

### Protected Routes

- router.post('/', addToWishlist);
- router.get('/', getAllWishlists);
- router.get('/:id', getWishlistById);
- router.put('/:id', updateWishlistById);
- router.delete('/:id', deleteWishlistById);

---

## 11. Like Routes

### Protected Routes

- router.post('/', createLike);
- router.get('/', getAllLikes);
- router.get('/:id', getLikeById);
- router.put('/:id', updateLikeById);
- router.delete('/:id', deleteLikeById);

---

## 12. Reply Routes

### Public Routes

- router.get('/', getAllReplies);
- router.get('/:id', getReplyById);

### Protected Routes

- router.post('/', createReply);-
- router.put('/:id', updateReplyById);
- router.delete('/:id', deleteReplyById);
