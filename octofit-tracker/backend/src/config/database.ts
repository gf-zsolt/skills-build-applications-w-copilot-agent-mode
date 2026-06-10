import mongoose from "mongoose";

export const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/octofit_db";

export async function connectDatabase() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB:", MONGODB_URI);
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}
