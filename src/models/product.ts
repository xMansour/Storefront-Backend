//@ts-ignore
import client from '../database';

export type Product = {
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't fetch products because of: ${error}`);
    }
  }

  async show(id: Number): Promise<Product> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE ID=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't fetch product with id ${id}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        'INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't create product ${product.name}`);
    }
  }
}
