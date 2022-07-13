"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, String(process.env.TOKEN_PRIVATE_KEY));
        next();
    }
    catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
    }
};
exports.verifyAuthToken = verifyAuthToken;
const getToken = (result) => {
    return jsonwebtoken_1.default.sign({ user: result }, String(process.env.TOKEN_PRIVATE_KEY));
};
exports.getToken = getToken;
