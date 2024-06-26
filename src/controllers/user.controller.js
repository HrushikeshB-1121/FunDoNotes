import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


export const userSignIn = async (req, res) => {
  try {
    const data = await UserService.userSignIn(req);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

export const userLogin= async (req, res) => {
  try {
    const data = await UserService.userLogin(req);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User loggedIn successfully',
      data: data.user,
      token: data.token
    });

  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
  
}

export const verifyUser= async (req, res) => {
  try {
    const data = await UserService.verifyUser(res);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User loggedIn successfully',
      data: data.user,
      token: data.token
    });

  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
}