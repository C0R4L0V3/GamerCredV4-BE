import express from 'express'
import controllers from '../controllers/index.js'; // Ensure `.js` for ESM compatibility


const router = express.Router()

router.get('/', controllers.userAuth.index)
router.post('/signup', controllers.userAuth.signUp);
router.post('/login', controllers.userAuth.userLogin);


export default router
