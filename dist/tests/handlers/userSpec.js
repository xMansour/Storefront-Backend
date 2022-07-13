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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const user_1 = require("../../models/user");
const auth_1 = require("../../utils/auth");
const req = (0, supertest_1.default)(app_1.default);
describe('User Handler Spec', () => {
    //@ts-ignore
    let result;
    //@ts-ignore
    let token;
    const userStore = new user_1.UserStore();
    const user = {
        userName: 'userName',
        firstName: 'user',
        lastName: 'name',
        password: 'password123'
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        result = yield userStore.create(user);
        token = (0, auth_1.getToken)(result);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        result = yield userStore.delete(user.userName, user.password);
    }));
    it('[GET] /users Should require a JWT', (done) => {
        req.get('/users').then((res) => {
            expect(res.status).toBe(401);
            done();
        });
    });
    //@ts-ignore
    it('[GET] /users/1 Should require a JWT', (done) => {
        req
            //@ts-ignore
            .get('/users/1')
            .then((res) => {
            expect(res.status).toBe(401);
            done();
        });
    });
    it('[Delete] /users Should require a JWT', (done) => {
        req
            .delete('/users')
            .query({
            userName: user.userName,
            password: user.password
        })
            .then((res) => {
            expect(res.status).toBe(401);
            done();
        });
    });
    it('[GET] /users Should get the index route', (done) => {
        req
            .get('/users')
            //@ts-ignore
            .set('Authorization', 'bearer ' + token)
            .then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
});
