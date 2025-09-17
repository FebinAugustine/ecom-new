import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { app } from './app.js';
import connectDB from './config/db.js';
import { redisClient } from './config/redis.js'; // Import redisClient to ensure connection

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and Redis, then start the server
const startServer = async () => {
    try {
        await connectDB();
        console.log('MongoDB connected successfully.');

        // Connect to Redis
        await redisClient.connect();
        console.log('Redis connected successfully.');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Server startup error: ${error.message}`);
        process.exit(1);
    }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    process.exit(1);
});
