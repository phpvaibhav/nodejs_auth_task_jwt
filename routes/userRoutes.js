import express from 'express'
const router = express.Router()
import UserConroller from '../controllers/userController.js';
import checkAuth from '../middlewares/auth.js';
// ROute Level Middleware - To Protect Route
router.use('/changepassword', checkAuth)
router.use('/loggeduser', checkAuth)
//public routes
router.post('/registration',UserConroller.userRegistration)
router.post('/login',UserConroller.userLogin)

//Protected
router.post('/changepassword', UserConroller.user_change_password)
router.get('/loggeduser', UserConroller.loggedUser)


export default  router;