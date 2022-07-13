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
const express_1 = __importDefault(require("express"));
const order_1 = require("../models/order");
const auth_1 = require("../utils/auth");
const orderRouter = express_1.default.Router();
const orderStore = new order_1.OrderStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orderStore.index();
    res.json(result);
    console.log('Order Index Route');
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orderStore.show(Number(req.params.userId));
    res.json(result);
    console.log('Order Show Route');
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        userId: Number(req.params.userId),
        status: 'Open'
    };
    const result = yield orderStore.create(order);
    res.json(result);
    console.log('Order Create Route');
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.orderId;
    const productId = req.params.productId;
    const quantity = Number(req.query.quantity);
    try {
        const result = yield orderStore.addProduct(quantity, orderId, productId);
        res.json(result);
        console.log('Order addProduct Route');
    }
    catch (error) {
        res.status(400);
        console.log(`Couldn't add product because of: ${error}`);
    }
});
orderRouter.get('/orders', auth_1.verifyAuthToken, index);
orderRouter.get('/orders/:userId', auth_1.verifyAuthToken, show);
orderRouter.post('/orders/:userId', auth_1.verifyAuthToken, create);
orderRouter.post('/orders/:orderId/products/:productId', auth_1.verifyAuthToken, addProduct);
exports.default = orderRouter;
