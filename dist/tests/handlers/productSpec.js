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
const product_1 = require("../../models/product");
const req = (0, supertest_1.default)(app_1.default);
describe('Product Handler Spec', () => {
    //@ts-ignore
    let result;
    const productStore = new product_1.ProductStore();
    const product = {
        name: 'Light Lamp',
        price: 50,
        category: 'lightning'
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        result = yield productStore.create(product);
    }));
    it('[POST] /products Should require a JWT', (done) => {
        req.post('/products').then((res) => {
            expect(res.status).toBe(401);
            done();
        });
    });
    it('[GET] /products Should return all products', (done) => {
        req.get('/products').then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
    it('[GET] /products/1 Should return product with id=1', (done) => {
        req.get('/products/1').then((res) => {
            expect(res.status).toBe(200);
            done();
        });
    });
});
