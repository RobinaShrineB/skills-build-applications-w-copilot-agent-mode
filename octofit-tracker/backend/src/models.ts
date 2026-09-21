import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  profile: {
    displayName: { type: String, required: true },
    grade: String,
    avatar: String,
  },
}, { timestamps: true })

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true })

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, enum: ['running', 'walking', 'strength', 'cycling', 'other'] },
  durationMinutes: { type: Number, required: true, min: 1 },
  distanceMiles: { type: Number, min: 0 },
  points: { type: Number, required: true, min: 0 },
  completedAt: { type: Date, required: true },
}, { timestamps: true })

const leaderboardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, required: true, min: 0, default: 0 },
  rank: { type: Number, required: true, min: 1 },
  period: { type: String, required: true, default: 'all-time' },
}, { timestamps: true })

const workoutSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  level: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  durationMinutes: { type: Number, required: true, min: 1 },
  exercises: [{ type: String }],
}, { timestamps: true })

export const User = mongoose.model('User', userSchema)
export const Team = mongoose.model('Team', teamSchema)
export const Activity = mongoose.model('Activity', activitySchema)
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)
export const Workout = mongoose.model('Workout', workoutSchema)