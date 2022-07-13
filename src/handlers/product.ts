import express from 'express';
import { Product, ProductStore } from '../models/product';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../utils/auth';

const productRouter = express.Router();
const productStore = new ProductStore();

const index = async (req: express.Request, res: express.Response) => {
  try {
    const result = await productStore.index();
    res.json(result);
    console.log('Product Index Route');
  } catch (error) {
    res.status(400);
    throw new Error(`Product Index Route Error: ${error}`);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const product: Product = {
      name: String(req.query.name),
      price: Number(req.query.price),
      category: String(req.query.category)
    };
    const result = await productStore.create(product);
    res.json(result);
    console.log('Product Create Route');
  } catch (error) {
    res.status(400);
    throw new Error(`Product Create Route Error: ${error}`);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const result = await productStore.show(Number(req.params.id));
    res.json(result);
    console.log('Product Show Route');
  } catch (error) {
    res.status(400);
    throw new Error(`Product Show Route Error: ${error}`);
  }
};

productRouter.get('/products', index);
productRouter.post('/products', verifyAuthToken, create);
productRouter.get('/products/:id', show);

export default productRouter;
