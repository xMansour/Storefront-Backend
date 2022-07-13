import express from 'express';
import { User, UserStore } from '../models/user';
import { getToken, verifyAuthToken } from '../utils/auth';
const userRouter = express.Router();
const userStore = new UserStore();

const index = async (req: express.Request, res: express.Response) => {
  try {
    const result = await userStore.index();
    res.json(result);
    console.log('User Index Route');
  } catch (error) {
    res.status(400);
    throw new Error(`User Index Route Error: ${error}`);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const user: User = {
      userName: String(req.query.userName),
      firstName: String(req.query.firstName),
      lastName: String(req.query.lastName),
      password: String(req.query.password)
    };
    const result = await userStore.create(user);
    const token = getToken(result);
    res.json(token);
    console.log('User Create Route');
  } catch (error) {
    res.status(400);
    throw new Error(`User Create Route Error: ${error}`);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const result = await userStore.show(Number(req.params.id));
    res.json(result);
    console.log('User Show Route');
  } catch (error) {
    res.status(400);
    throw new Error(`User Show Route Error: ${error}`);
  }
};

const authenticate = async (req: express.Request, res: express.Response) => {
  try {
    const result = await userStore.authenticate(
      String(req.query.userName),
      String(req.query.password)
    );
    if (result) {
      const token = getToken(result);
      res.json(token);
      console.log('User Authenticate Route');
    } else {
      res.json('Access denied, invalid user');
      res.status(401);
    }
  } catch (error) {
    res.status(400);
    throw new Error(`User Authenticate Route Error: ${error}`);
  }
};

const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const result = await userStore.delete(
      String(req.query.userName),
      String(req.query.password)
    );
    res.json(result);
    console.log('User Delete Route');
  } catch (error) {
    res.status(400);
    throw new Error(`User Delete Route Error: ${error}`);
  }
};

userRouter.get('/users', verifyAuthToken, index);
userRouter.post('/users', create);
userRouter.get('/auth', authenticate);
userRouter.get('/users/:id', verifyAuthToken, show);
userRouter.delete('/users', verifyAuthToken, deleteUser);

export default userRouter;
