//@ts-ignore
import client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't fetch users because of: ${error}`);
    }
  }

  async show(id: Number): Promise<User> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE ID=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't show user with id ${id}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        'INSERT INTO users(user_name, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *';
      const hashedPassword = bcrypt.hashSync(
        user.password,
        Number(process.env.SALT_ROUNDS)
      );
      const result = await conn.query(sql, [
        user.userName,
        user.firstName,
        user.lastName,
        hashedPassword
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Couldn't create user: ${user.firstName} ${user.lastName} because of: ${error}`
      );
    }
  }

  async authenticate(userName: string, password: string): Promise<User | null> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM users where user_name=($1)';
      const result = await conn.query(sql, [userName]);
      conn.release();
      if (result.rows.length) {
        const resultUser = result.rows[0];
        if (bcrypt.compareSync(password, resultUser.password))
          return resultUser;
      }
      return null;
    } catch (error) {
      throw new Error(`Couldn't authenticate because of ${error}`);
    }
  }

  async delete(userName: string, password: string): Promise<String> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      let sql = 'SELECT * FROM users where user_name=($1)';
      const result = await conn.query(sql, [userName]);
      if (result.rows.length) {
        const resultUser = result.rows[0];
        if (bcrypt.compareSync(password, resultUser.password)) {
          sql = 'DELETE FROM users WHERE id=($1)';
          await conn.query(sql, [resultUser.id]);
          conn.release();
          return 'User deleted successfully';
        }
      }
      conn.release();
      return `Invalid user`;
    } catch (error) {
      throw new Error(`Couldn't authenticate because of ${error}`);
    }
  }
}
