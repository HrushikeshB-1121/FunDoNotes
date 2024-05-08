import express from 'express';
import * as userController from '../controllers/user.controller';
import { signinDetailsValidator,loginDetailsValidator,emailValid ,passwordValid } from '../validators/user.validator.js';
import { userAuth ,isAuthBySession } from '../middlewares/auth.middleware';

const router = express.Router();

// route to Register a new user
router.post('', signinDetailsValidator, userController.userSignIn);

// route to login user
router.post('/login', loginDetailsValidator, userController.userLogin);

// route to verify user (using JWT)
router.get('/verify', userAuth , userController.verifyUser);

// // route to validate email and sents email to reset password
router.post('/forgetpassword', emailValid , userController.forgetPassword);

// route to reset the password
router.put('/resetPassword/:token', passwordValid, userController.resetPassword)

export default router;