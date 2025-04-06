"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuth_js_1 = __importDefault(require("./userAuth.js")); // Ensure you include `.js` for ESM compatibility
const router = express_1.default.Router();
router.use('/auth', userAuth_js_1.default);
exports.default = router;
