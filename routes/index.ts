import express from 'express'
import userAuthRoutes from './userAuth.js' // Ensure you include `.js` for ESM compatibility

const router = express.Router()

router.use('/auth', userAuthRoutes)

export default router
