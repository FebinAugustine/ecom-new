import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mainRouter from './routes/index.js';

const app = express();

// Configure CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Middleware for parsing JSON and urlencoded data
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Middleware for serving static files (if any, e.g., in a 'public' folder)
app.use(express.static('public'));

// Middleware for parsing cookies
app.use(cookieParser());

// --- Routes --- //
app.use('/api/v1', mainRouter);

export { app };
