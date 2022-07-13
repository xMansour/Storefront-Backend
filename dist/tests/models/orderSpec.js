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
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
const store = new order_1.OrderStore();
const userStore = new user_1.UserStore();
describe('Order Model Spec', () => {
    const user = {
        userName: 'testUser',
        firstName: 'test',
        lastName: 'user',
        password: 'test123'
    };
    it('Should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('Should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('Should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('index method should all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const createduser = yield userStore.create(user);
            const order = {
                //@ts-ignore
                userId: createduser.id,
                status: 'Open'
            };
            yield store.create(order);
            const result = yield store.index();
            yield userStore.delete(user.userName, user.password);
            //@ts-ignore
            expect(result.length).toBeGreaterThan(0);
        }
        catch (error) {
            throw new Error('index method error: ' + error);
        }
    }));
    it('show method should return all orders for the specified user', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const createduser = yield userStore.create(user);
            const order = {
                //@ts-ignore
                userId: createduser.id,
                status: 'Open'
            };
            yield store.create(order);
            //@ts-ignore
            const result = yield store.show(createduser.id);
            yield userStore.delete(user.userName, user.password);
            //@ts-ignore
            expect(result[0].user_id).toEqual(String(createduser.id));
        }
        catch (error) {
            throw new Error('show method error: ' + error);
        }
    }));
    it('create method should add an order with order.userId = createduser.id', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const createduser = yield userStore.create(user);
            const order = {
                //@ts-ignore
                userId: createduser.id,
                status: 'Open'
            };
            const result = yield store.create(order);
            yield userStore.delete(user.userName, user.password);
            //@ts-ignore
            expect(result.user_id).toEqual(String(createduser.id));
        }
        catch (error) {
            throw new Error('create method error: ' + error);
        }
    }));
});
