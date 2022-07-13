import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

export const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader!.split(' ')[1];
    const decoded = jwt.verify(token, String(process.env.TOKEN_PRIVATE_KEY));
    next();
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
};

export const getToken = (result: User) => {
  return jwt.sign({ user: result }, String(process.env.TOKEN_PRIVATE_KEY));
};
