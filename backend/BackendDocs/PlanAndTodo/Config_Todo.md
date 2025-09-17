# Todo for Configuration

This document outlines the todo list for managing configuration settings for the e-commerce backend.

## General

- [ ] Create a `.env` file at the root of the backend project.
- [ ] Add the `.env` file to `.gitignore`.
- [ ] Create a `.env.example` file with all the required environment variables.
- [ ] Install the `dotenv` library.
- [ ] Create a centralized configuration file (e.g., `config/index.js`).

## Database Configuration

- [ ] Add `MONGO_URI` and `MONGOOSE_URL` to the `.env` and `.env.example` files.
- [ ] Create a database connection module (e.g., `config/db.js`).

## Email Sending Configuration

- [ ] Add `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` to the `.env` and `.env.example` files.
- [ ] Install the `Nodemailer` library.
- [ ] Create an email service module (e.g., `services/emailService.js`).
