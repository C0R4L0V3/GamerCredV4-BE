"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const bcrypt = __importStar(require("bcrypt"));
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
        // Validate input
        // if(!username || !password ) {
        //   return res.status(400).json({ error: 'All fields are required'});
        // }
        //check is user exsists
        const existingUser = yield models_1.default.User.findOne({ username });
        if (existingUser)
            return res.status(409).json({ error: 'Username already taken.' });
        //create the user
        const user = yield models_1.default.User.create({
            username,
            hashedPassword: bcrypt.hashSync(password, 12),
            role
        });
        //TODO TOKEN PASSING
        // send something
        res.status(201).json(user);
    }
    catch (error) {
        console.log('signup error:', error);
        res.status(500).json({ error: error.message });
    }
});
//user Login controller
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        //checks for exsisting user
        const existingUser = yield models_1.default.User.findOne({ username });
        if (!existingUser) {
            console.log("no User Found for:", username);
            return res.status(409).json({ error: 'No User Found' });
        }
        console.log("user found:", existingUser);
        //validates password
        const validatePW = bcrypt.compareSync(password, existingUser.hashedPassword);
        console.log(`password Validationg (${password} vs ${existingUser.hashedPassword}):`, validatePW);
        if (!validatePW)
            return res.status(409).json({ error: 'Incorrect password' });
        res.status(201).json({
            _id: existingUser._id,
            username: existingUser.username,
            role: existingUser.role
        });
        //TODO Create user session with Token
    }
    catch (error) {
        console.log("error in login:", error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.default = {
    signUp,
    index,
    userLogin
};
