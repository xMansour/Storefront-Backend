//@ts-ignore
import client from '../database';
import { Product } from './product';

export type Order = {
  userId: number;
  status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      let sql = 'SELECT * FROM orders';
      let result = await conn.query(sql);
      /*const ordersProducts: Order[] = [];
            for (const order of result.rows) {
                console.log(order);
                sql = "SELECT * FROM orders_products WHERE order_id=($1)";
                result = await conn.query(sql, [order.id])
                if (result.rows[0])
                    ordersProducts.push(result.rows[0]);
            }
            return ordersProducts;*/
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't fetch all order because of ${error}`);
    }
  }

  async show(userId: number): Promise<Order> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't fetch orders by user: ${userId}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders(user_id, status) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [order.userId, order.status]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't create order ${error}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [orderId]);
      const order = result.rows[0];
      if (order.status !== 'Open') {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
        );
      }
      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [quantity, orderId, productId]);
      conn.release();
      console.log('Reached');

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
