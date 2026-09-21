import express from 'express'
import { connectDatabase } from './config/database.js'
import { apiRouter } from './routes.js'

const app = express()
const port = 8000
const host = '0.0.0.0'
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(express.json())
app.use('/api', apiRouter)

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

async function startServer() {
  try {
    await connectDatabase()
    app.listen(port, host, () => {
      console.log(`OctoFit backend listening at ${apiBaseUrl}`)
    })
  } catch (error) {
    console.error('Unable to start OctoFit backend:', error)
    process.exit(1)
  }
}

startServer()
