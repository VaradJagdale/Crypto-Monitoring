# Crypto Monitoring & Alerting System

**Author:** Varad Jagdale  
**Project Type:** Real-Time Cryptocurrency Price Monitoring and Alerting System

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Getting Started](#getting-started)  
- [API Endpoints](#api-endpoints)  
- [App Flow](#app-flow)  
- [Challenges & Solutions](#challenges--solutions)  
- [License](#license)  

---

## Overview

This project is a real-time cryptocurrency monitoring and alerting system. It allows users to:

- Track cryptocurrency prices in real-time.
- Set alerts based on price conditions (above or below a target price).
- Receive real-time notifications when alert conditions are met.
- Cache the latest prices to reduce API calls and improve efficiency.

---

## Features

- **Real-time Price Monitoring:** Fetch prices from the CoinGecko API and update every 20 seconds.  
- **User Alerts:** Users can create alerts for cryptocurrencies and get notified in real-time.  
- **Caching:** Redis is used to store the latest prices for faster response and reduced API usage.  
- **API:** RESTful API for fetching prices and managing alerts.  
- **Socket.IO:** Push real-time updates to clients.

---

## Technologies Used

- **Node.js** – Backend runtime.  
- **TypeScript** – Type safety for backend code.  
- **Express.js** – Web framework for API endpoints.  
- **MongoDB & Mongoose** – Database and ODM for storing alerts.  
- **Redis & Redis Cloud** – Caching for latest cryptocurrency prices.  
- **Socket.IO** – Real-time communication for live updates.  
- **Axios** – HTTP client for fetching data from CoinGecko API.  
- **dotenv** – Environment variable management.  
- **ts-node** – Run TypeScript code without compilation.  

---

## Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/<your-username>/CryptoMonitoring.git
cd CryptoMonitoring 
```

2. **Install dependencies:**
   
```bash
npm install
```

3. **Set up environment variables in a .env file:**

```env
PORT=4000
MONGODB_URI=<your-mongodb-uri>
REDIS_HOST=<redis-host>
REDIS_PORT=<redis-port>
REDIS_USERNAME=<redis-username>
REDIS_PASSWORD=<redis-password>
COINGECKO_BASE=https://api.coingecko.com/api/v3
PRICE_FETCH_INTERVAL_MS=20000
REDIS_USE_TLS=true
```

4. **Start the server:**

```bash
npm run start
```

5. **The server will run at http://localhost:4000.**

---

## API Endpoints

- **Get latest price:**

   GET /api/price/:symbol

   Example: /api/price/bitcoin
- **Create an alert:**
   
   POST /api/alerts
  
Body:
```json
{
  "userId": "testUser1",
  "symbol": "bitcoin",
  "condition": "above",
  "target": 110000,
}
```

- **Get user alerts:**
   
    GET /api/alerts/:userId

    Example: /api/alerts/testUser1

---

## App Flow

1. **Server Startup:**
   - Connects to MongoDB.
   - Connects to Redis.
   - Starts the price fetcher loop.

2. **Price Fetching:**
   - Every 20 seconds, fetches prices for tracked cryptocurrencies.
   - Updates Redis cache with the latest prices.
   - Emits price updates via Socket.IO.

3. **Alert Evaluation:**
   - For each fetched price, evaluate all alerts from MongoDB.
   - If condition is met (price above or below target), trigger the alert.
   - Emit alert via Socket.IO or log in terminal.

4. **API Routes:**
   - `GET /api/price/:symbol` → Returns the latest cached price.
   - `POST /api/alerts` → Create a new alert with `userId`, `symbol`, `condition`, `target`, `active`.
   - `GET /api/alerts/:userId` → Returns all alerts for a specific user.

---

## Challenges Faced and Solutions

| Challenge                                          | Solution                                                                                                              |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Connecting to Redis Cloud with SSL                 | Fixed by using Node Redis `createClient` with `socket` configuration (host, port) and authentication credentials.     |
| ES Module vs CommonJS errors when using TypeScript | Configured `tsconfig.json` with `module: ESNext` and used `ts-node` instead of `ts-node-dev` to avoid `--esm` issues. |
| CoinGecko API rate limits (HTTP 429)               | Reduced fetch interval to 20 seconds and implemented error handling to prevent crash.                                 |
| Real-time alerts without polling manually          | Implemented `evaluateAlerts()` inside the price fetcher loop and emit alerts immediately via Socket.IO.               |




