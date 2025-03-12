"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    displayName: { type: String },
    email: { type: String },
    role: { type: String, required: true, enum: ['Admin', 'Developer', 'Guest'] },
    //additional platform apis to link to user account e.g microsoft, xbox live, sony
    steamId: { type: String },
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
