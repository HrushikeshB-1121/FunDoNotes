import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import logger from '../config/logger';


export const userSignIn = async (req, res) => {
  try {
    const data = await UserService.userSignIn(req);
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
    const user = await UserService.userLogin(req);
    logger.info('User loggedIn successfully');
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'User loggedIn successfully',
      data: {
        firstName: user.firstName,
        email: user.email
      },
      token: user.token
    });

  } catch (error) {
    logger.error(`User loggedIn unsuccessfully`)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
  
}

export const forgetPassword= async (req, res) => {
  try {
    const data = await UserService.forgetPassword(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      email: data.user.email,
      message: 'Mail sent Successfully',
      // token: data.token,
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
    const data = await UserService.resetPassword(req.body.password,res);
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