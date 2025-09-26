import { AlertModel } from "./alert.model.ts";

export const evaluateAlerts = async (symbol: string, price: number, io: any) => {
  const alerts = await AlertModel.find({ symbol, active: true });

  for (const alert of alerts) {
    let shouldTrigger = false;

    if (alert.condition === "above" && price >= alert.target) shouldTrigger = true;
    if (alert.condition === "below" && price <= alert.target) shouldTrigger = true;

    if (shouldTrigger) {
      alert.active = false; // turn off alert after trigger
      await alert.save();
      io.to(alert.userId).emit("alert", {
        symbol,
        price,
        condition: alert.condition,
        target: alert.target,
      });
      console.log(`Alert triggered for ${alert.userId}: ${symbol} ${alert.condition} ${alert.target}`);
    }
  }
};
