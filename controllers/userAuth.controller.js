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
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = __importDefault(require("../models"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield models_1.default.User.find({});
        res.status(200).send(allUsers);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, role } = req.body;
        const existingUser = yield models_1.default.User.findOne({ username });
        if (existingUser)
            return res.status(409).json({ error: 'Username already taken.' });
        //create the user
        const user = yield models_1.default.User.create({
            username,
            hashedPassword: bcrypt_1.default.hashSync(password, 12),
            role
        });
        //TODO TOKEN PASSING
        //send something
        res.status(201).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
exports.default = {
    signUp,
    index
};
