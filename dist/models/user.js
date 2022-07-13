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
exports.UserStore = void 0;
//@ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Couldn't fetch users because of: ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE ID=($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Couldn't show user with id ${id}`);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users(user_name, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *';
                const hashedPassword = bcrypt_1.default.hashSync(user.password, Number(process.env.SALT_ROUNDS));
                const result = yield conn.query(sql, [
                    user.userName,
                    user.firstName,
                    user.lastName,
                    hashedPassword
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Couldn't create user: ${user.firstName} ${user.lastName} because of: ${error}`);
            }
        });
    }
    authenticate(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users where user_name=($1)';
                const result = yield conn.query(sql, [userName]);
                conn.release();
                if (result.rows.length) {
                    const resultUser = result.rows[0];
                    if (bcrypt_1.default.compareSync(password, resultUser.password))
                        return resultUser;
                }
                return null;
            }
            catch (error) {
                throw new Error(`Couldn't authenticate because of ${error}`);
            }
        });
    }
    delete(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                const conn = yield database_1.default.connect();
                let sql = 'SELECT * FROM users where user_name=($1)';
                const result = yield conn.query(sql, [userName]);
                if (result.rows.length) {
                    const resultUser = result.rows[0];
                    if (bcrypt_1.default.compareSync(password, resultUser.password)) {
                        sql = 'DELETE FROM users WHERE id=($1)';
                        yield conn.query(sql, [resultUser.id]);
                        conn.release();
                        return 'User deleted successfully';
                    }
                }
                conn.release();
                return `Invalid user`;
            }
            catch (error) {
                throw new Error(`Couldn't authenticate because of ${error}`);
            }
        });
    }
}
exports.UserStore = UserStore;
