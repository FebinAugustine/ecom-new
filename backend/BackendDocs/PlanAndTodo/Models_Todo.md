# Todo for Models

This document outlines the todo list for creating the Mongoose models for the e-commerce backend.

## General

- [x] Create a `models` directory.
- [x] Install `mongoose` and `bcrypt`.

## Model Creation

- [x] **User Model (`userModel.js`):**
    - [x] Define Schema with all fields.
    - [x] Add `timestamps`.
    - [x] Implement `pre-save` middleware for password hashing.
    - [x] Implement `matchPassword` instance method.

- [x] **Seller Model (`sellerModel.js`):**
    - [x] Define Schema with all fields.
    - [x] Add `timestamps`.
    - [x] Implement `pre-save` middleware for password hashing.
    - [x] Implement `matchPassword` instance method.

- [x] **Admin Model (`adminModel.js`):**
    - [x] Define Schema with all fields.
    - [x] Add `timestamps`.
    - [x] Implement `pre-save` middleware for password hashing.
    - [x] Implement `matchPassword` instance method.

- [x] **Category Model (`categoryModel.js`):**
    - [x] Define Schema with all fields.
    - [x] Add `timestamps`.

- [x] **Product Model (`productModel.js`):**
    - [x] Define Schema with all fields.
    - [x] Add `timestamps`.

- [x] **Cart Model (`cartModel.js`):**
    - [x] Define Schema with all fields.
    - [x] Add `timestamps`.

- [x] **Order Model (`orderModel.js`):**
    - [x] Define Schema with all fields.
    - [x] Add `timestamps`.

- [x] **Review Model (`reviewModel.js`):**
    - [x] Define Schema with all fields.
    - [x] Add `timestamps`.

- [x] **Wishlist Model (`wishlistModel.js`):**
    - [x] Define Schema with all fields.
    - [x] Add `timestamps`.

- [x] **Like Model (`likeModel.js`):**
    - [x] Define Schema with all fields.
    - [x] Add `timestamps`.

- [x] **Invoice Model (`invoiceModel.js`):**
    - [x] Define Schema with all fields.
    - [x] Add `timestamps`.

- [x] **Reply Model (`replyModel.js`):**
    - [x] Define Schema with all fields.
    - [x] Add `timestamps`.
