import express from 'express';
import * as userController from '../controllers/user.controller';
import { signinDetailsValidator,loginDetailsValidator} from '../validators/user.validator';
import { userAuth ,isAuthBySession } from '../middlewares/auth.middleware';

const router = express.Router();

// route to Register a new user
router.post('', signinDetailsValidator, userController.userSignIn);

// route to login user
router.post('/login',loginDetailsValidator, userController.userLogin);

// route to verify user (using JWT)
router.get('/verify', userAuth , userController.verifyUser);

export default router;