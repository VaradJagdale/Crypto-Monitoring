import express from "express";
import { AlertModel } from "../alerts/alert.model.ts";
import { getLatestPrice } from "../cache.ts";

const router = express.Router();

// POST a new alert
router.post("/alerts", async (req, res) => {
  try {
    const { userId, symbol, type, targetPrice } = req.body;

    const alert = await AlertModel.create({
      userId,
      symbol,
      condition: type,
      target: targetPrice
    });
    res.status(201).json(alert);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
});

// GET all alerts for a user
router.get("/alerts/:userId", async (req, res) => {
  try {
    const alerts = await AlertModel.find({ userId: req.params.userId });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

// GET latest price of a symbol
router.get("/price/:symbol", async (req, res) => {
  try {
    const price = await getLatestPrice(req.params.symbol);
    res.json({ symbol: req.params.symbol, price });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch price" });
  }
});

export default router;

