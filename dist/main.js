"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/app/services/membership/routes"));
const routes_2 = __importDefault(require("./src/app/services/authentication/routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
let corsOrigins = {
    origin: ['http://localhost:5173']
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOrigins));
app.use('/', routes_2.default);
app.use('/membership', routes_1.default);
app.listen(config_1.default.port, () => {
    console.log('the app is listening on port ' + config_1.default.port);
});
