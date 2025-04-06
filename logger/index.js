"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino = require('pino');
exports.logger = pino({
    level: 'debug',
    timestamp: pino.stdTimeFunctions.isoTime
});
