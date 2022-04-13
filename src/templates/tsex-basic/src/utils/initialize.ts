import express from 'express'
import http, { globalAgent } from 'http'

// globalAgent Configuration
globalAgent.maxSockets = Infinity

const app: express.Application = express()
const server: http.Server = http.createServer(app)

export { app, server }
