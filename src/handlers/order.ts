import express from 'express';
import { Order, OrderStore } from '../models/order';
import { verifyAuthToken } from '../utils/auth';

const orderRouter = express.Router();
const orderStore = new OrderStore();

const index = async (req: express.Request, res: express.Response) => {
  try {
    const result = await orderStore.index();
    res.json(result);
    console.log('Order Index Route');
  } catch (error) {
    res.status(400);
    throw new Error(`Order Index Route Error: ${error}`);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const result = await orderStore.show(Number(req.params.userId));
    res.json(result);
    console.log('Order Show Route');
  } catch (error) {
    res.status(400);
    throw new Error(`Order Show Route Error: ${error}`);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const order: Order = {
      userId: Number(req.params.userId),
      status: 'Open'
    };
    const result = await orderStore.create(order);
    res.json(result);
    console.log('Order Create Route');
  } catch (error) {
    res.status(400);
    throw new Error(`Order Create Route Error: ${error}`);
  }
};

const addProduct = async (req: express.Request, res: express.Response) => {
  try {
    const orderId: string = req.params.orderId;
    const productId: string = req.params.productId;
    const quantity: number = Number(req.query.quantity);
    const result = await orderStore.addProduct(quantity, orderId, productId);
    res.json(result);
    console.log('Order addProduct Route');
  } catch (error) {
    res.status(400);
    throw new Error(`Order addProduct Route Error: ${error}`);
  }
};

orderRouter.get('/orders', verifyAuthToken, index);
orderRouter.get('/orders/:userId', verifyAuthToken, show);
orderRouter.post('/orders/:userId', verifyAuthToken, create);
orderRouter.post(
  '/orders/:orderId/products/:productId',
  verifyAuthToken,
  addProduct
);

export default orderRouter;
