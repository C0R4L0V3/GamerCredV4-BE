"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
// dependancies
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
// Models
// imports controllers
const logger_1 = require("./logger");
if (process.env.NODE_ENV !== 'test') {
    mongoose_1.default.connect(process.env.MONGODB_URI);
    mongoose_1.default.connection.on('connected', () => {
        console.log(`Connected to MongoDB ${mongoose_1.default.connection.name}.`);
    });
}
const PORT = process.env.PORT || 3000;
// middleware
exports.app.use((0, cors_1.default)({ origin: 'http://localhost:5173' }));
exports.app.use(express_1.default.json());
//api routes
exports.app.use('/api', routes_1.default);
exports.app.use((err, req, res, next) => {
    logger_1.logger.error(err.stack);
    res.status(err.statusCode || 500)
        .send({ error: err.message });
});
// approutes
// app.get('/', (req, res) => {
//     res.json({Message: 'Hello GamerCred'})
// })
exports.app.use('/', routes_1.default);
exports.server = exports.app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
exports.default = {
    app: exports.app,
    server: exports.server
};
