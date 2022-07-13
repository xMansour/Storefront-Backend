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
const user_1 = require("../models/user");
const auth_1 = require("../utils/auth");
const userRouter = express_1.default.Router();
const userStore = new user_1.UserStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userStore.index();
        res.json(result);
        console.log('User Index Route');
    }
    catch (error) {
        res.status(400);
        throw new Error(`User Index Route Error: ${error}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            userName: String(req.query.userName),
            firstName: String(req.query.firstName),
            lastName: String(req.query.lastName),
            password: String(req.query.password)
        };
        const result = yield userStore.create(user);
        const token = (0, auth_1.getToken)(result);
        res.json(token);
        console.log('User Create Route');
    }
    catch (error) {
        res.status(400);
        throw new Error(`User Create Route Error: ${error}`);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userStore.show(Number(req.params.id));
        res.json(result);
        console.log('User Show Route');
    }
    catch (error) {
        res.status(400);
        throw new Error(`User Show Route Error: ${error}`);
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userStore.authenticate(String(req.query.userName), String(req.query.password));
        if (result) {
            const token = (0, auth_1.getToken)(result);
            res.json(token);
            console.log('User Authenticate Route');
        }
        else {
            res.json('Access denied, invalid user');
            res.status(401);
        }
    }
    catch (error) {
        res.status(400);
        throw new Error(`User Authenticate Route Error: ${error}`);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userStore.delete(String(req.query.userName), String(req.query.password));
        res.json(result);
        console.log('User Delete Route');
    }
    catch (error) {
        res.status(400);
        throw new Error(`User Delete Route Error: ${error}`);
    }
});
userRouter.get('/users', auth_1.verifyAuthToken, index);
userRouter.post('/users', create);
userRouter.get('/auth', authenticate);
userRouter.get('/users/:id', auth_1.verifyAuthToken, show);
userRouter.delete('/users', auth_1.verifyAuthToken, deleteUser);
exports.default = userRouter;
