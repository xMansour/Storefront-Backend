"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
//@ts-ignore
const database_1 = __importDefault(require("../database"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                let sql = 'SELECT * FROM orders';
                let result = yield conn.query(sql);
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
            }
            catch (error) {
                throw new Error(`Couldn't fetch all order because of ${error}`);
            }
        });
    }
    show(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE user_id=($1)';
                const result = yield conn.query(sql, [userId]);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Couldn't fetch orders by user: ${userId}`);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders(user_id, status) VALUES($1, $2) RETURNING *';
                const result = yield conn.query(sql, [order.userId, order.status]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Couldn't create order ${error}`);
            }
        });
    }
    addProduct(quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const result = yield conn.query(sql, [orderId]);
                const order = result.rows[0];
                if (order.status !== 'Open') {
                    throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`);
                }
                conn.release();
            }
            catch (err) {
                throw new Error(`${err}`);
            }
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
                const result = yield conn.query(sql, [quantity, orderId, productId]);
                conn.release();
                console.log('Reached');
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
