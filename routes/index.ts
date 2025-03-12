import express from 'express'
const router = express.Router()
const userAuthRoutes = require('./userAuth')

//user
router.use('/auth', userAuthRoutes)

export default router
