"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = __importDefault(require("../controllers/index.js")); // Ensure `.js` for ESM compatibility
const router = express_1.default.Router();
router.get('/', index_js_1.default.userAuth.index);
router.post('/signup', index_js_1.default.userAuth.signUp);
exports.default = router;
