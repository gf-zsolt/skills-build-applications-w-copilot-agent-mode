import express from "express";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/octofit";
const PORT = Number(process.env.PORT ?? 8000);

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (_req, res) => {
  res.json({ app: "OctoFit Tracker Backend", port: PORT });
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB:", MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Backend server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
}

startServer();
