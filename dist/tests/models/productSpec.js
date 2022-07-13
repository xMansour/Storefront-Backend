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
const product_1 = require("../../models/product");
const store = new product_1.ProductStore();
describe('Product Model Spec', () => {
    const product = {
        name: 'Led Lamp',
        price: 50,
        category: 'Lightning'
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
    it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create(product);
        expect(result.name).toBe(product.name);
        expect(result.price).toBe(product.price);
        expect(result.category).toBe(product.category);
    }));
    it('show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield store.create(product);
        //@ts-ignore
        console.log(createdProduct.id);
        console.log(createdProduct);
        //@ts-ignore
        const result = yield store.show(createdProduct.id);
        expect(result.name).toBe(product.name);
        expect(result.price).toBe(product.price);
        expect(result.category).toBe(product.category);
    }));
});
