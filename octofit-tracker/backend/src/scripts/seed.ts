import mongoose from "mongoose";
import { Activity, Leaderboard, Team, User, Workout } from "../models";

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/octofit_db";

async function seed() {
  console.log("Seed the octofit_db database with test data");

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB:", MONGODB_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const teams = await Team.insertMany([
    { name: "Pulse Pioneers", description: "High-energy athletes driving team progress.", members: 5, points: 930 },
    { name: "Cardio Crew", description: "Focused on daily endurance and consistency.", members: 7, points: 810 },
  ]);

  const users = await User.insertMany([
    { name: "Avery Chang", email: "avery@example.com", role: "captain", team: "Pulse Pioneers", joinedAt: new Date("2026-01-15") },
    { name: "Mia Patel", email: "mia@example.com", role: "member", team: "Pulse Pioneers", joinedAt: new Date("2026-02-08") },
    { name: "Noah Kim", email: "noah@example.com", role: "member", team: "Cardio Crew", joinedAt: new Date("2026-03-02") },
  ]);

  const workouts = await Workout.insertMany([
    {
      title: "Core Crusher",
      description: "A focused routine for building ab strength and stability.",
      difficulty: "intermediate",
      durationMinutes: 34,
      exercises: [
        { name: "Plank", sets: 3, reps: 60, calories: 60 },
        { name: "Russian Twist", sets: 3, reps: 20, calories: 80 },
        { name: "Bicycle Crunch", sets: 3, reps: 25, calories: 75 },
      ],
    },
    {
      title: "Morning Momentum",
      description: "A balanced warm-up and full-body energy boost.",
      difficulty: "beginner",
      durationMinutes: 28,
      exercises: [
        { name: "Jumping Jacks", sets: 4, reps: 40, calories: 90 },
        { name: "Bodyweight Squats", sets: 4, reps: 20, calories: 100 },
        { name: "Push-ups", sets: 3, reps: 12, calories: 70 },
      ],
    },
  ]);

  const activities = await Activity.insertMany([
    { userEmail: "avery@example.com", type: "running", durationMinutes: 45, caloriesBurned: 520, date: new Date("2026-06-05") },
    { userEmail: "mia@example.com", type: "cycling", durationMinutes: 60, caloriesBurned: 620, date: new Date("2026-06-06") },
    { userEmail: "noah@example.com", type: "rowing", durationMinutes: 35, caloriesBurned: 410, date: new Date("2026-06-07") },
  ]);

  const leaderboard = await Leaderboard.insertMany([
    { entityType: "team", name: "Pulse Pioneers", rank: 1, score: 930 },
    { entityType: "team", name: "Cardio Crew", rank: 2, score: 810 },
    { entityType: "user", name: "Avery Chang", rank: 1, score: 320 },
    { entityType: "user", name: "Mia Patel", rank: 2, score: 290 },
    { entityType: "user", name: "Noah Kim", rank: 3, score: 260 },
  ]);

  console.log("Seed completed:", {
    users: users.length,
    teams: teams.length,
    workouts: workouts.length,
    activities: activities.length,
    leaderboard: leaderboard.length,
  });

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
