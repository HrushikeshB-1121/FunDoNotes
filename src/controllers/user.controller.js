import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import logger from '../config/logger';


export const userSignIn = async (req, res) => {
  try {
    const data = await UserService.userSignIn(req.body);
    logger.info('User created successfully');
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      message: 'User created successfully'
    });
  } catch (error) {
    logger.error(`error while creating user`)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

export const userLogin= async (req, res) => {
  try {
    const data = await UserService.userLogin(req.body);
    logger.info('User loggedIn successfully');
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'User loggedIn successfully',
      data: {
        firstName: data.user.firstName,
        email: data.user.email,
        token: data.token
      },
    });

  } catch (error) {
    logger.error(`User login failed`)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
  
}

export const forgetPassword= async (req, res) => {
  try {
    const data = await UserService.forgetPassword(req.body.email);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      email: data.user.email,
      token: data.token,
      message: 'Mail sent Successfully',
      result:data.result.messageId
    });

  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
}

export const resetPassword= async (req, res) => {
  try {
    const data = await UserService.resetPassword(req.body.password,req.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Password Reset Successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
}
