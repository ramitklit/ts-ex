import express from 'express'
import HealthcheckHandlerApi from './api/api.controller'
const router = express.Router()

// http://localhost:3000/api/v1/healthcheck
router.get('/api/v1/healthcheck', HealthcheckHandlerApi.healthcheck)

export default router
