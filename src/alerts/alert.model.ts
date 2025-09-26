import mongoose, { Schema, Document } from "mongoose";

export interface IAlert extends Document {
  userId: string;
  symbol: string;
  condition: "above" | "below";
  target: number;
  active: boolean;
  createdAt: Date;
}

const alertSchema = new Schema<IAlert>({
  userId: { type: String, required: true },
  symbol: { type: String, required: true },
  condition: { type: String, enum: ["above", "below"], required: true },
  target: { type: Number, required: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const AlertModel = mongoose.model<IAlert>("Alert", alertSchema);
