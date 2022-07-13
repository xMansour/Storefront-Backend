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
const product_1 = require("../models/product");
const auth_1 = require("../utils/auth");
const productRouter = express_1.default.Router();
const productStore = new product_1.ProductStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield productStore.index();
        res.json(result);
        console.log('Product Index Route');
    }
    catch (error) {
        res.status(400);
        throw new Error(`Product Index Route Error: ${error}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            name: String(req.query.name),
            price: Number(req.query.price),
            category: String(req.query.category)
        };
        const result = yield productStore.create(product);
        res.json(result);
        console.log('Product Create Route');
    }
    catch (error) {
        res.status(400);
        throw new Error(`Product Create Route Error: ${error}`);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield productStore.show(Number(req.params.id));
        res.json(result);
        console.log('Product Show Route');
    }
    catch (error) {
        res.status(400);
        throw new Error(`Product Show Route Error: ${error}`);
    }
});
productRouter.get('/products', index);
productRouter.post('/products', auth_1.verifyAuthToken, create);
productRouter.get('/products/:id', show);
exports.default = productRouter;
