import express from 'express';
import * as userController from '../controllers/user.controller';
import * as userValidation from '../validators/user.validator.js';
import { forgetUserAuth } from '../middlewares/auth.middleware';

const router = express.Router();

// route to Register a new user
router.post('', userValidation.signIn , userController.userSignIn);

// route to login user
router.post('/login', userValidation.logIn , userController.userLogin);

// route to validate email and sents email to reset password
router.post('/forgetpassword', userValidation.email , userController.forgetPassword);

// route to reset the password
router.put('/resetPassword', forgetUserAuth , userValidation.password , userController.resetPassword);

export default router;