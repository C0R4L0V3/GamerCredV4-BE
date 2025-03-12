"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const userSchema = new Schema({
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    displayName: { type: String },
    email: { type: String },
    role: { type: String, required: true, enum: ['Admin', 'Developer', 'Guest'] },
    //additional platform apis to link to user account e.g microsoft, xbox live, sony
    steamId: { type: String },
});
const User = model('User', userSchema);
exports.default = User;
