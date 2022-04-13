import express from 'express'
import healthcheckRoute from '../controllers/healthcheck/route.controller'

const router = express.Router()

// #! routes
router.use(healthcheckRoute)

export default router
