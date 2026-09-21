import { connectDatabase, disconnectDatabase } from '../config/database.js'
import { Activity, Leaderboard, Team, User, Workout } from '../models.js'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase()
    await Promise.all([
      User.deleteMany({}), Team.deleteMany({}), Activity.deleteMany({}),
      Leaderboard.deleteMany({}), Workout.deleteMany({}),
    ])

    const users = await User.create([
      { username: 'alex', email: 'alex@example.com', profile: { displayName: 'Alex Rivera', grade: '9' } },
      { username: 'jordan', email: 'jordan@example.com', profile: { displayName: 'Jordan Lee', grade: '10' } },
      { username: 'sam', email: 'sam@example.com', profile: { displayName: 'Sam Patel', grade: '11' } },
    ])
    await Team.create({ name: 'Octo Runners', description: 'Run, walk, and support each other.', members: users.map((user) => user._id) })
    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 30, distanceMiles: 2.8, points: 30, completedAt: new Date() },
      { user: users[1]._id, type: 'strength', durationMinutes: 25, points: 25, completedAt: new Date() },
    ])
    await Leaderboard.create(users.map((user, index) => ({ user: user._id, points: 100 - index * 20, rank: index + 1 })))
    await Workout.create([
      { title: 'Quick Cardio', description: 'A short cardio workout for busy days.', level: 'beginner', durationMinutes: 15, exercises: ['Jumping jacks', 'High knees', 'March in place'] },
      { title: 'Full Body Strength', description: 'Build strength using bodyweight movements.', level: 'intermediate', durationMinutes: 25, exercises: ['Squats', 'Push-ups', 'Plank'] },
    ])

    console.log('Database seeding complete')
    await disconnectDatabase()
  } catch (error) {
    console.error('Error seeding database:', error);
    await disconnectDatabase()
    process.exit(1);
  }
}

seedDatabase();
