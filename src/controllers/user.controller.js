import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import logger from '../config/logger';


export const userSignIn = async (req, res) => {
  try {
    const data = await UserService.userSignIn(req);
    logger.info('User created successfully');
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
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
    const data = await UserService.userLogin(req);
    logger.info('User loggedIn successfully');
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User loggedIn successfully',
      data: data.user,
      token: data.token
    });

  } catch (error) {
    logger.error(`User loggedIn unsuccessfully`)
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
  
}

export const verifyUser= async (req, res) => {
  try {
    const data = await UserService.verifyUser(res);
    logger.info('User verifyed successfully');
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User verifyed successfully',
      data: data.user,
      token: data.token
    });

  } catch (error) {
    logger.error(`User failed to verify`)
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
      success: true,
      message: 'Mail sent  Sucefully',
      user: data.user,
      token: data.token,
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
    const token=req.params.token;
    const data = await UserService.resetPassword(token,req.body.password);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Reset password Sucefully',
      data: data,
    });

  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
}