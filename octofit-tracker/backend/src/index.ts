import express from "express";
import { connectDatabase } from "./config/database.js";
import { Activity, Leaderboard, Team, User, Workout } from "./models.js";

const PORT = Number(process.env.PORT ?? 8000);
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

const app = express();
app.use(express.json());

const apiRouter = express.Router();

const apiRoot = {
  api: "OctoFit Tracker API",
  baseUrl: `${API_BASE_URL}/api`,
  routes: ["/users/", "/teams/", "/activities/", "/leaderboard/", "/workouts/"],
};

apiRouter.get("/", (_req, res) => {
  res.json(apiRoot);
});

apiRouter.get("/users", async (_req, res) => {
  const users = await User.find().lean();
  res.json({ resource: "users", count: users.length, users });
});

apiRouter.get("/teams", async (_req, res) => {
  const teams = await Team.find().lean();
  res.json({ resource: "teams", count: teams.length, teams });
});

apiRouter.get("/activities", async (_req, res) => {
  const activities = await Activity.find().lean();
  res.json({ resource: "activities", count: activities.length, activities });
});

apiRouter.get("/leaderboard", async (_req, res) => {
  const leaderboard = await Leaderboard.find().lean();
  res.json({ resource: "leaderboard", count: leaderboard.length, leaderboard });
});

apiRouter.get("/workouts", async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json({ resource: "workouts", count: workouts.length, workouts });
});

app.use("/api", apiRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (_req, res) => {
  res.json({ app: "OctoFit Tracker Backend", port: PORT, apiUrl: `${API_BASE_URL}/api` });
});

async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Backend server running at ${API_BASE_URL}`);
      console.log(`API root available at ${API_BASE_URL}/api`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
}

startServer();
