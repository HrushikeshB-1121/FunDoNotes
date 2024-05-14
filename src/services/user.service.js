import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sendmail from '../middlewares/email'
import logger from '../config/logger';

dotenv.config();
const key = process.env.SECRET_KEY;
const resetkey = process.env.RESET_KEY;


export const userSignIn = async (req) => {
  const body=req.body
  const email = body.email.toLowerCase();
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    throw new Error('User already exists');
  } else {
    body.password = await bcrypt.hash(body.password, 10);
    const data = await User.create(body);
    return data;
  }
};

export const userLogin = async (req) => {
  const { email, password }=req.body
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }
  
  const token = jwt.sign({ userId: user._id }, key, { expiresIn: '1h' });
  return { user, token };
};


export const forgetPassword= async ({email}) => {
  
  const user = await User.findOne({email});
  if(!user)
  throw new Error("This email is does not Exits")
  const token = jwt.sign({ userId: user._id }, resetkey, { expiresIn: '10m' });
  console.log(token);
  const result= await sendmail(user.email,token)
  return { user ,token ,result };
};

export const resetPassword= async (newPassword,res) => {
  const userId = res.locals.userId
  const user = await User.findById(userId);
  if (!user) {
    logger.info(`User not found`)
    throw new Error('User not found');
  }
  user.password= await bcrypt.hash(newPassword, 10);
  await user.save();
  return user;
};