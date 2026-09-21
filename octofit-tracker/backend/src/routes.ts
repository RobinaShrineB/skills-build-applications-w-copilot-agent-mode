import { ErrorRequestHandler, Router } from 'express'
import { Activity, Leaderboard, Team, User, Workout } from './models.js'

export const apiRouter = Router()

apiRouter.get('/users', async (_request, response, next) => {
  try { response.json(await User.find().sort({ username: 1 })) } catch (error) { next(error) }
})
apiRouter.post('/users', async (request, response, next) => {
  try { response.status(201).json(await User.create(request.body)) } catch (error) { next(error) }
})

apiRouter.get('/teams', async (_request, response, next) => {
  try { response.json(await Team.find().populate('members', 'username profile')) } catch (error) { next(error) }
})
apiRouter.post('/teams', async (request, response, next) => {
  try { response.status(201).json(await Team.create(request.body)) } catch (error) { next(error) }
})

apiRouter.get('/activities', async (_request, response, next) => {
  try { response.json(await Activity.find().populate('user', 'username profile').sort({ completedAt: -1 })) } catch (error) { next(error) }
})
apiRouter.post('/activities', async (request, response, next) => {
  try { response.status(201).json(await Activity.create(request.body)) } catch (error) { next(error) }
})

apiRouter.get('/leaderboard', async (request, response, next) => {
  try {
    const period = typeof request.query.period === 'string' ? request.query.period : 'all-time'
    response.json(await Leaderboard.find({ period }).populate('user', 'username profile').sort({ rank: 1 }))
  } catch (error) { next(error) }
})

apiRouter.get('/workouts', async (_request, response, next) => {
  try { response.json(await Workout.find().sort({ title: 1 })) } catch (error) { next(error) }
})
apiRouter.post('/workouts', async (request, response, next) => {
  try { response.status(201).json(await Workout.create(request.body)) } catch (error) { next(error) }
})

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  const message = error instanceof Error ? error.message : 'Request failed'
  response.status(400).json({ error: message })
}

apiRouter.use(errorHandler)