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
const user_1 = require("../../models/user");
const store = new user_1.UserStore();
describe('User Model Spec', () => {
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
    it('Should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });
    it('Should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('index method should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
        yield store.create(user);
        const users = yield store.index();
        yield store.delete(user.userName, user.password);
        //@ts-ignore
        expect(users.length).toBeGreaterThan(0);
    }));
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield store.create(user);
            yield store.delete(user.userName, user.password);
            //@ts-ignore
            expect(result.first_name).toBe(user.firstName);
            //@ts-ignore
            expect(result.last_name).toBe(user.lastName);
            //@ts-ignore
            expect(result.user_name).toBe(user.userName);
        }
        catch (error) {
            throw new Error('create method error: ' + error);
        }
    }));
    it('delete method should remove the user', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield store.create(user);
            yield store.delete(user.userName, user.password);
            const result = yield store.index();
            //@ts-ignore
            expect(result).toEqual([]);
        }
        catch (error) {
            throw new Error('delete method error: ' + error);
        }
    }));
    it('authenticate method should return the user', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield store.create(user);
            const result = yield store.authenticate(user.userName, user.password);
            //@ts-ignore
            expect(result.first_name).toBe(user.firstName);
            //@ts-ignore
            expect(result.last_name).toBe(user.lastName);
            //@ts-ignore
            expect(result.user_name).toBe(user.userName);
            yield store.delete(user.userName, user.password);
        }
        catch (error) {
            throw new Error('authenticate method error: ' + error);
        }
    }));
});
