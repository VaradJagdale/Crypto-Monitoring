import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { connectDB } from "./db.ts";
import apiRoutes from "./routes/api.ts";
import { startPriceFetcher } from "./priceFetcher.ts";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api", apiRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("identify", (userId: string) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
  startPriceFetcher(io);
});
