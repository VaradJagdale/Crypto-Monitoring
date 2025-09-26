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

2. **Install dependencies:**

 ```bash
 npm install

3. **Set up environment variables in a .env file:**

 ```bash
 PORT=4000
 MONGODB_URI=<your-mongodb-uri>
 REDIS_HOST=<redis-host>
 REDIS_PORT=<redis-port>
 REDIS_USERNAME=<redis-username>
 REDIS_PASSWORD=<redis-password>
 COINGECKO_BASE=https://api.coingecko.com/api/v3
 PRICE_FETCH_INTERVAL_MS=20000

