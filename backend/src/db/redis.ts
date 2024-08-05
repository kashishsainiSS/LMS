// import {Redis} from 'ioredis';
// import dotenv from 'dotenv';

// dotenv.config();

// const redisClient= ()=>{
//     if(process.env.REDIS_URL){
//         console.log("Redis connected");
//         return process.env.REDIS_URL;
//     }
//     throw new Error("Redis connection failed")
// }

// export const redis = new Redis(redisClient());


import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = () => {
    if (process.env.REDIS_URL) {
        console.log("Connecting to Redis...");
        return {
            url: process.env.REDIS_URL,
            maxRetriesPerRequest: 100,
            retryStrategy: (times: number) => {
                const delay = Math.min(times * 50, 2000);
                console.log(`Retrying connection in ${delay}ms...`);
                return delay;
            },
            reconnectOnError: (err: Error) => {
                const targetErrors = ['READONLY', 'ETIMEDOUT', 'ECONNRESET'];
                if (targetErrors.some(targetError => err.message.includes(targetError))) {
                    console.log('Reconnecting on error:', err.message);
                    return true; // Reconnect on these errors
                }
                return false;
            }
        };
    }
    throw new Error("Redis connection failed: REDIS_URL is not set");
};

export const redis = new Redis(redisClient());

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

redis.on('end', () => {
    console.log('Redis connection closed');
});

redis.on('reconnecting', (delay:any) => {
    console.log(`Reconnecting to Redis in ${delay}ms...`);
});
