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
exports.errorHandler = errorHandler;
exports.withTransaction = withTransaction;
const mongoose_1 = __importDefault(require("mongoose"));
function errorHandler(fn) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            let nextCalled = false;
            const result = yield fn(req, res, (params) => {
                nextCalled = true;
                next(params);
            });
            if (!res.headersSent && !nextCalled) {
                res.json(result);
            }
        }
        catch (e) {
            next(e);
        }
    });
}
function withTransaction(fn) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            let result;
            yield mongoose_1.default.connection.transaction((session) => __awaiter(this, void 0, void 0, function* () {
                result = yield fn(req, res, session);
            }));
            if (result === undefined) {
                throw new Error("Transaction function must return a value");
            }
            return result;
        }
        catch (error) {
            next(error);
        }
    });
}
