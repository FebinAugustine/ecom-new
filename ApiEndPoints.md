# API Endpoints For Whole Project

### REST API's

- baseUrl = http://localhost:3000
- Extension - /api/v1

## User Endpoints:

### **CREATE**

- Register:
  - Method: POST
  - URL: /users/register
  - Body: {
    "fullname": "John Doe",
    "email": "t0t6j@example.com",
    "password": "password123",
    "phone": "1234567890"
    }
- Login:
  - Method: POST
  - URL: /users/login
  - Body: {
    "email": "t0t6j@example.com",
    "password": "password123"
    }
- Google Login: /
  - Method: POST
  - URL: /users/google-login
  - Body: {
    "email": "t0t6j@example.com",
    "password": "password123"
    }

### **READ**

- Get all users:
  - Method: GET
  - URL: /users
  - Headers: {
    "Authorization": "Bearer <token>"
    }
- Get user by id:
  - Method: GET
  - URL: /users/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
- Get user by email:
  - Method: GET
  - URL: /users/email/:email
  - Headers: {
    "Authorization": "Bearer <token>"
    }

### **UPDATE**

- **Update user by id:**
  - Method: PUT
  - URL: /users/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "fullname": "John Doe",
    "email": "t0t6j@example.com",
    "password": "password123",
    "phone": "1234567890"
    "address": "123 Main St",
    "delivery_address": "123 Main St"  
    }
- **Update User Avatar:**
  - Method: PUT
  - URL: /users/update-avatar
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "avatar": "https://example.com/avatar.jpg"
    }
- **Update User Password:**
  - Method: PUT
  - URL: /users/update-password
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "oldPassword": "oldPassword123",
    "newPassword": "newPassword123"
    }
- **Logout:**
  - Method: POST
  - URL: /users/logout
  - Headers: {
    "Authorization": "Bearer <token>"
    }
- **Post Refresh Token:**
  - Method: POST
  - URL: /users/refresh-token
  - Headers: {
    "Authorization": "Bearer <token>"
    }
- **Post Forgot Password:**
  - Method: POST
  - URL: /users/forgot-password
  - Body: {
    "email": "t0t6j@example.com"
    }
- **Post Forgot password verify code and set new password:**
  - Method: POST
  - URL: /users/forgot-password-verify-code
  - Body: {
    "email": "t0t6j@example.com",
    "code": "123456",
    "password": "newPassword123"
    }
- **Post Verify Email:**
  - Method: POST
  - URL: /users/verify-email
  - Body: {
    "email": "t0t6j@example.com"
    }
- **Post Resend Verification Email:**
  - Method: POST
  - URL: /users/resend-verification-email
  - Body: {
    "email": "t0t6j@example.com"
    }

### **DELETE**

- **Delete user by id:**
  - Method: DELETE
  - URL: /users/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }

---

## **SELLER ENDPOINTS:**

### **CREATE**

- **Register:**
  - Method: POST
  - URL: /sellers/register
  - Body: {
    "fullname": "John Doe",
    "email": "t0t6j@example.com",
    "password": "password123",
    "phone": "1234567890",
    "address": "123 Main St",
    "company_name": "ABC Company",
    "location": "New York, USA"
    }
- **Login:**
  - Method: POST
  - URL: /sellers/login
  - Body: {
    "email": "t0t6j@example.com",
    "password": "password123"
    }

### **READ**

- **Get all sellers:**
  - Method: GET
  - URL: /sellers
  - Headers: {
    "Authorization": "Bearer <token>"
    }
- **Get seller by id:**
  - Method: GET
  - URL: /sellers/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
- **Get seller by email:**
  - Method: GET
  - URL: /sellers/email/:email
  - Headers: {
    "Authorization": "Bearer <token>"
    }

### **UPDATE**

- **Update seller by id:**
  - Method: PUT
  - URL: /sellers/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "fullname": "John Doe",
    "email": "t0t6j@example.com",
    "password": "password123",
    "phone": "1234567890",
    "address": "123 Main St",
    "company_name": "ABC Company",
    "location": "New York, USA"
    "gst": "1234567890",
    "pan": "1234567890",
    }
- **Update seller Bank Details by id:**
  - Method: PUT
  - URL: /sellers/bank/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "bank_name": "ABC Bank",
    "account_number": "1234567890",
    "ifsc": "1234567890"
    }
- **Logout:**
  - Method: POST
  - URL: /sellers/logout
  - Headers: {
    "Authorization": "Bearer <token>"
    }
- **Post Refresh Token:**
  - Method: POST
  - URL: /sellers/refresh-token
  - Headers: {
    "Authorization": "Bearer <token>"
    }
- **Forgot Password:**
  - Method: POST
  - URL: /sellers/forgot-password
  - Body: {
    "email": "t0t6j@example.com"
    }
- **Forgot password verify code and set new password:**
  - Method: POST
  - URL: /sellers/forgot-password-verify-code
  - Body: {
    "email": "t0t6j@example.com",
    "code": "123456",
    "password": "newPassword123"
    }
- **Verify Email:**
  - Method: POST
  - URL: /sellers/verify-email
  - Body: {
    "email": "t0t6j@example.com"
    }
- **Resend Verification Email:**
  - Method: POST
  - URL: /sellers/resend-verification-email
  - Body: {
    "email": "t0t6j@example.com"
    }

### **DELETE**

- Delete seller by id:
  - Method: DELETE
  - URL: /sellers/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }

---

## **ADMIN ENDPOINTS:**

### **CREATE**

- **Register:**
  - Method: POST
  - URL: /admins/register
  - Body: {
    "fullname": "John Doe",
    "email": "t0t6j@example.com",
    "password": "password123",
    "phone": "1234567890"
    }
- **Login:**
  - Method: POST
  - URL: /admins/login
  - Body: {
    "email": "t0t6j@example.com",
    "password": "password123"
    }

### **READ**

- **Get admin by id:**
  - Method: GET
  - URL: /admins/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }

### **UPDATE**

- **Update admin by id:**
  - Method: PUT
  - URL: /admins/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "fullname": "John Doe",
    "email": "t0t6j@example.com",
    "password": "password123",
    "phone": "1234567890"
    }
- **Logout:**
  - Method: POST
  - URL: /admins/logout
  - Headers: {
    "Authorization": "Bearer <token>"
    }
- **Post Refresh Token:**
  - Method: POST
  - URL: /admins/refresh-token
  - Headers: {
    "Authorization": "Bearer <token>"
    }
- **Forgot Password:**
  - Method: POST
  - URL: /admins/forgot-password
  - Body: {
    "email": "t0t6j@example.com"
    }
- **Forgot password verify code and set new password:**
  - Method: POST
  - URL: /admins/forgot-password-verify-code
  - Body: {
    "email": "t0t6j@example.com",
    "code": "123456",
    "password": "newPassword123"
    }

### **DELETE**

- **Delete admin by id:**
  - Method: DELETE
  - URL: /admins/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }

---

## **PRODUCT ENDPOINTS:**

### **CREATE**

- **Create product:**

  - Method: POST
  - URL: /add-products
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "discount": 10,
    "inStock": 100,
    "color": "color",
    "sizes": "sizes",
    "image": "image",
    "category": "category",
    }

### **READ**

- **Get all products:**
  - Method: GET
  - URL: /products
- **Get product by id:**
  - Method: GET
  - URL: /products/:id
- **Get products by category:**

  - Method: GET
  - URL: /products/category/:category

- **Get product by seller:**
  - Method: GET
  - URL: /products/seller/:id

### **UPDATE**

- **Update product by id:**
  - Method: PUT
  - URL: /products/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "discount": 10,
    "inStock": 100,
    "color": "color",
    "sizes": "sizes",
    "category": "category",
    }
- **Update Product Images:**
  - Method: PUT
  - URL: /products/update-image/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
    - Body: {
      "image": "image"
      }

### **DELETE**

- **Delete product by id:**
  - Method: DELETE
  - URL: /products/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }

---

## **Order Endpoints:**

### **CREATE**

- **Create order:**
  - Method: POST
  - URL: /orders
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "user_id": "user_id",
    "seller_id": "seller_id",
    "products": "products",
    "total": 100,
    "deliveryAddress": "deliveryAddress",
    "payment_method": "payment_method",
    "payment_status": "payment_status",
    "status": "status",
    }

### **READ**

- **Get all orders:**
  - Method: GET
  - URL: /orders
  - Headers: {
    "Authorization": "Bearer <token>"
    }
- **Get order by id:**
  - Method: GET
  - URL: /orders/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }

### **UPDATE**

- **Update order by id:**
  - Method: PUT
  - URL: /orders/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "user_id": "user_id",
    "seller_id": "seller_id",
    "products": "products",
    "total": 100,
    "deliveryAddress": "deliveryAddress",
    "payment_method": "payment_method",
    "payment_status": "payment_status",
    "status": "status",
    }

### **DELETE**

- **Delete order by id:**
  - Method: DELETE
  - URL: /orders/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }

## Review Endpoints:

- Create review:
  - Method: POST
  - URL: /reviews
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "user_id": "user_id",
    "product_id": "product_id",
    "rating": 5,
    "review": "review",
    }
- Get all reviews:
  - Method: GET
  - URL: /reviews
- Get review by id:
  - Method: GET
  - URL: /reviews/:id
- Update review by id:
  - Method: PUT
  - URL: /reviews/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "user_id": "user_id",
    "product_id": "product_id",
    "rating": 5,
    "review": "review",
    }
- Delete review by id:
  - Method: DELETE
  - URL: /reviews/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }

## Cart Endpoints:

- Add to cart:
  - Method: POST
  - URL: /carts
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "user_id": "user_id",
    "product_id": "product_id",
    "quantity": 1,
    }
- Get all carts:
  - Method: GET
  - URL: /carts
  - Headers: {
    "Authorization": "Bearer <token>"
    }
- Get cart by id:
  - Method: GET
  - URL: /carts/:id
  - Headers: {
    "Authorization ": "Bearer <token>"
    }
- Update cart by id:
  - Method: PUT
  - URL: /carts/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "user_id": "user_id",
    "product_id": "product_id",
    "quantity": 1,
    }
- Delete cart by id:
  - Method: DELETE
  - URL: /carts/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }

## Wishlist Endpoints:

- Add to wishlist:
  - Method: POST
  - URL: /wishlists
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "user_id": "user_id",
    "product_id": "product_id",
    }
- Get all wishlists:
  - Method: GET
  - URL: /wishlists
  - Headers: {
    "Authorization": "Bearer <token>"
    }
- Get wishlist by id:
  - Method: GET
  - URL: /wishlists/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
- Update wishlist by id:
  - Method: PUT
  - URL: /wishlists/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "user_id": "user_id",
    "product_id": "product_id",
    }
- Delete wishlist by id:
  - Method: DELETE
  - URL: /wishlists/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }

## Category Endpoints:

- Create category:
  - Method: POST
  - URL: /categories
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "name": "category",
    "image": "image",
    }
- Get all categories:
  - Method: GET
  - URL: /categories
- Get category by id:
  - Method: GET
  - URL: /categories/:id
- Update category by id:
  - Method: PUT
  - URL: /categories/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "name": "category",
    "image": "image",
    }
- Delete category by id:
  - Method: DELETE
  - URL: /categories/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }

## Invoice Endpoints:

- Create invoice:
  - Method: POST
  - URL: /invoices
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "order_id": "order_id",
    "user_id": "user_id",
    "seller_id": "seller_id",
    "total": 100,
    "deliveryAddress": "deliveryAddress",
    "payment_method": "payment_method",
    "payment_status": "payment_status",
    "status": "status",
    }
- Get all invoices:
  - Method: GET
  - URL: /invoices
  - Headers: {
    "Authorization": "Bearer <token>"
    }
- Get invoice by id:
  - Method: GET
  - URL: /invoices/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
- Update invoice by id:
  - Method: PUT
  - URL: /invoices/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
  - Body: {
    "order_id": "order_id",
    "user_id": "user_id",
    "seller_id": "seller_id",
    "total": 100,
    "deliveryAddress": "deliveryAddress",
    "payment_method": "payment_method",
    "payment_status": "payment_status",
    "status": "status",
    }
- Delete invoice by id:
  - Method: DELETE
  - URL: /invoices/:id
  - Headers: {
    "Authorization": "Bearer <token>"
    }
