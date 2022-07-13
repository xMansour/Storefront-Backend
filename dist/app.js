"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = __importDefault(require("./handlers/order"));
const product_1 = __importDefault(require("./handlers/product"));
const user_1 = __importDefault(require("./handlers/user"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use('/', user_1.default);
app.use('/', product_1.default);
app.use('/', order_1.default);
app.listen(PORT, () => {
    console.log(`Server started at 127.0.0.1:${PORT}`);
});
exports.default = app;
