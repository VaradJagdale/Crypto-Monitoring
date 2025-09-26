import axios from "axios";
import dotenv from "dotenv";
import { setLatestPrice } from "./cache.ts";
import { evaluateAlerts } from "./alerts/alertService.ts";

dotenv.config();

const TRACKED = ["bitcoin", "ethereum"];

export const startPriceFetcher = (io: any) => {
    const loop = async () => {
        try {
            const res = await axios.get(`${process.env.COINGECKO_BASE}/simple/price`, {
                params: { ids: TRACKED.join(","), vs_currencies: "usd" },
            });

            for (const symbol of TRACKED) {
                const price = res.data[symbol].usd;

                // Save to Redis cache
                await setLatestPrice(symbol, price);

                // Emit via Socket.IO
                io.emit("price:update", { symbol, price });

                // Evaluate user alerts
                await evaluateAlerts(symbol, price, io);

                // Log to terminal
                console.log(`Price updated: ${symbol} -> $${price}`);
            }
        } catch (err) {
            if (err instanceof Error) {
                console.error("Price fetch failed:", err.message);
            } else {
                console.error("Price fetch failed:", err);
            }
        } finally {
            setTimeout(loop, Number(process.env.PRICE_FETCH_INTERVAL_MS) || 10000);
        }
    };

    loop();
};

