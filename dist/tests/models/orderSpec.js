"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const store = new order_1.OrderStore();
describe('Order Model Spec', () => {
    const order = {
        userId: 1,
        status: 'Open'
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
});
