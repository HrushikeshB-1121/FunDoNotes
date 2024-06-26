import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const key = process.env.SECRET_KEY;

export const userSignIn = async (req) => {
  const body=req.body
  const userExists = await User.findOne({ email: body.email });
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

export const verifyUser = async (res) => {
  const {token,userId} = res.locals;
  if (!token) {
    throw new Error('Token Not provided');
  }
  try {
    const user = await User.findById(userId);
    return { user, token };
  } catch (error) {
    throw new Error('Invalid token');
  }
};