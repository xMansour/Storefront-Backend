"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const req = (0, supertest_1.default)(app_1.default);
describe('Order Handler Spec', () => {
    it('[GET] /orders Should require a JWT', (done) => {
        req.get('/orders').then((res) => {
            expect(res.status).toBe(401);
            done();
        });
    });
    it('[GET] /orders/1 Should require a JWT', (done) => {
        req.get('/orders/1').then((res) => {
            expect(res.status).toBe(401);
            done();
        });
    });
    it('[POST] /orders/1 Should require a JWT', (done) => {
        req.get('/orders/1').then((res) => {
            expect(res.status).toBe(401);
            done();
        });
    });
});
