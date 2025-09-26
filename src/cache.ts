import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

// Create Redis client using Cloud credentials from .env
const client = createClient({
  username: process.env.REDIS_USERNAME ?? 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    tls: process.env.REDIS_USE_TLS === 'true' ? undefined : false,
  },
});

// Handle errors
client.on('error', (err: Error) => {
  console.error('Redis Client Error:', err.message);
});

// Connect to Redis
await client.connect();

// Function to set latest price in Redis with TTL
export const setLatestPrice = async (symbol: string, price: number) => {
  try {
    await client.set(`price:${symbol}`, String(price), { EX: 600 }); // 10 min TTL
  } catch (err) {
    console.error(`Error setting price for ${symbol}:`, err);
  }
};

// Function to get latest price from Redis
export const getLatestPrice = async (symbol: string) => {
  try {
    const value = await client.get(`price:${symbol}`);
    return value ? Number(value) : null;
  } catch (err) {
    console.error(`Error getting price for ${symbol}:`, err);
    return null;
  }
};

export default client;




