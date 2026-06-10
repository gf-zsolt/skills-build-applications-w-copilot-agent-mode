import mongoose, { Document, Schema, model } from "mongoose";

export interface UserDoc extends Document {
  name: string;
  email: string;
  role: string;
  team: string;
  joinedAt: Date;
}

const UserSchema = new Schema<UserDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: "member" },
  team: { type: String, required: true },
  joinedAt: { type: Date, default: () => new Date() },
});

export const User = model<UserDoc>("User", UserSchema);

export interface TeamDoc extends Document {
  name: string;
  description: string;
  members: number;
  points: number;
}

const TeamSchema = new Schema<TeamDoc>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  members: { type: Number, required: true, default: 0 },
  points: { type: Number, required: true, default: 0 },
});

export const Team = model<TeamDoc>("Team", TeamSchema);

export interface ActivityDoc extends Document {
  userEmail: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

const ActivitySchema = new Schema<ActivityDoc>({
  userEmail: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true },
});

export const Activity = model<ActivityDoc>("Activity", ActivitySchema);

export interface LeaderboardDoc extends Document {
  entityType: "team" | "user";
  name: string;
  rank: number;
  score: number;
}

const LeaderboardSchema = new Schema<LeaderboardDoc>({
  entityType: { type: String, required: true, enum: ["team", "user"] },
  name: { type: String, required: true },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
});

export const Leaderboard = model<LeaderboardDoc>("Leaderboard", LeaderboardSchema);

export interface WorkoutDoc extends Document {
  title: string;
  description: string;
  difficulty: string;
  durationMinutes: number;
  exercises: Array<{ name: string; sets: number; reps: number; calories: number }>;
}

const WorkoutSchema = new Schema<WorkoutDoc>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      calories: { type: Number, required: true },
    },
  ],
});

export const Workout = model<WorkoutDoc>("Workout", WorkoutSchema);
