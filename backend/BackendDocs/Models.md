# Entities or Models

### DB - Mongo Db

### ODM - Mongoose

## **1. User:**

- fullname (String,required)
- email (String, required, unique)
- password (String, required, minLength: 6, maxLength: 20, unique)
- image (String)
- phone (number, required, unique, minLength: 10, maxLength: 10)
- address (String)
- delivery_address (String)
- role (String, required, default: user)
- cart (array[type: mongoose.Schema.Types.ObjectId, ref: 'Cart'], default: [])
- wishlist (array[type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist'], default: [])
- liked (array[type: mongoose.Schema.Types.ObjectId, ref: 'Liked'], default: [])
- refresh_token (String)
- orders (array[type: mongoose.Schema.Types.ObjectId, ref: 'Order'], default: [])
- invoices (array[type: mongoose.Schema.Types.ObjectId, ref: 'Invoice'], default: [])
- is_verified (Boolean, default: false)
- is_active (Boolean, default: true)
- frgt_pwd_reset_code (String)
- frgt_pwd_reset_code_expiry (Date)

## **2. Seller:**

- fullname (String,required)
- email (String, required, unique)
- password (String, required, minLength: 6, maxLength: 20, unique)
- image (String)
- phone (number, required, unique, minLength: 10, maxLength: 10)
- address (String)
- gst (String)
- pan (String)
- bank_name (String)
- account_number (String)
- ifsc (String)
- company_name (String)
- location (String)
- role (String, required, default: seller)
- products (array[type: mongoose.Schema.Types.ObjectId, ref: 'Product'], default: [])
- orders (array[type: mongoose.Schema.Types.ObjectId, ref: 'Order'], default: [])
- invoices (array[type: mongoose.Schema.Types.ObjectId, ref: 'Invoice'], default: [])
- is_verified (Boolean, default: false)
- is_active (Boolean, default: true)
- frgt_pwd_reset_code (String)
- frgt_pwd_reset_code_expiry (Date)
- refresh_token (String)

## **3. Admin:**

- fullname (String, required)
- email (String, required, unique)
- password (String, required, minLength: 6, maxLength: 20, unique)
- image (String)
- phone (number, required, unique, minLength: 10, maxLength: 10))
- role (String, required, default: admin)
- sellers (array[type: mongoose.Schema.Types.ObjectId, ref: 'Seller'])
- users (array[type: mongoose.Schema.Types.ObjectId, ref: 'User'])
- products (array[type: mongoose.Schema.Types.ObjectId, ref: 'Product'])
- orders (array[type: mongoose.Schema.Types.ObjectId, ref: 'Order'])
- invoices (array[type: mongoose.Schema.Types.ObjectId, ref: 'Invoice'])
- frgt_pwd_reset_code (String)
- frgt_pwd_reset_code_expiry (Date)
- refresh_token (String)

## **4. Category:**

- name (String)
- image (String)
- products (array[type: mongoose.Schema.Types.ObjectId, ref: 'Product'])

## **5. Product:**

- name (String, required)
- description (String, required)
- price (Number, required)
- discount (Number, default: 0)
- inStock (Number, required)
- color (String, required)
- sizes (String, required)
- images ([String], required)
- category (String, required)
- seller (String, required)
- rating (Array[type: mongoose.Schema.Types.ObjectId, ref: 'Rating'], default: [])
- review (Array[type: mongoose.Schema.Types.ObjectId, ref: 'Review'], default: [])

## **6. Cart:**

- user_id (String, array[type: mongoose.Schema.Types.ObjectId, ref: 'User'])
- products (Array[type: mongoose.Schema.Types.ObjectId, ref: 'Product'])
- products (String)
- date (Date)

## **7. Order:**

- user_id (type: mongoose.Schema.Types.ObjectId, ref: 'User')
- seller_id (array[type: mongoose.Schema.Types.ObjectId, ref: 'Seller'])
- products (Array[type: mongoose.Schema.Types.ObjectId, ref: 'Product'])
- total (Number, default: 0)
- deliveryAddress (String)
- payment_method (String)
- payment_status (String)
- status (String)
- date (Date)

## **8. Reviews:**

- user_id (type: mongoose.Schema.Types.ObjectId, ref: 'User')
- product_id (type: mongoose.Schema.Types.ObjectId, ref: 'Product')
- rating (Number)
- review (String)
- date (Date)
- reply (String[type: mongoose.Schema.Types.ObjectId, ref: 'Reply'], default: [])

## **9. Wishlist:**

- user_id (type: mongoose.Schema.Types.ObjectId, ref: 'User')
- product_id (array[type: mongoose.Schema.Types.ObjectId, ref: 'Product'])

## **10. Liked:**

- user_id (type: mongoose.Schema.Types.ObjectId, ref: 'User')
- product_id (array[type: mongoose.Schema.Types.ObjectId, ref: 'Product'])

## **11. Invoice:**

- order_id (type: mongoose.Schema.Types.ObjectId, ref: 'Order')
- user_id (type: mongoose.Schema.Types.ObjectId, ref: 'User')
- seller_id (type: mongoose.Schema.Types.ObjectId, ref: 'Seller')
- date (Date)
- total (Number, default: 0)
- deliveryAddress (String)
- payment_method (String)
- payment_status (String)
- status (String)

## **12. Reply:**

- user_id (type: mongoose.Schema.Types.ObjectId, ref: 'User')
- comment_id (type: mongoose.Schema.Types.ObjectId, ref: 'Comment')
- reply (String)
