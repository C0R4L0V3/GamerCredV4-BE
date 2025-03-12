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
exports.signUp = void 0;
const models_1 = __importDefault(require("../models"));
const { errorHandler, withTransaction } = require('../utils');
const signUp = errorHandler(withTransaction((req, res, session) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, confirmPass } = req.body;
        //find a user by username
        const existingUser = yield models_1.default.User.findOne({ username });
        if (existingUser) {
            res.status(404);
            throw new Error('username already taken');
        }
        //password
        if (password !== confirmPass) {
            res.status(400);
            throw new Error('passwords does not match');
        }
        if (password.length < 8) {
            res.status(400);
            throw new Error('password must be greater than 8 characters');
        }
        //TODO  1 special characters, 1 lowercase, 1 uppercase
        // res.status(200).json(existingUser)
    }
    catch (error) {
        if (error.statusCode === 404)
            res.json({ error: error.message });
        console.log(error);
    }
})));
exports.signUp = signUp;
