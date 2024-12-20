"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/app/services/membership/routes"));
const routes_2 = __importDefault(require("./src/app/services/dashboard/routes"));
const routes_3 = __importDefault(require("./src/app/services/authentication/routes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
let corsOrigins = {
    origin: ['http://localhost:5173'],
    credentials: true,
};
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOrigins));
app.use('/', routes_3.default);
app.use('/membership', routes_1.default);
app.use('/dashboard', routes_2.default);
app.listen(config_1.default.port, () => {
    console.log('the app is listening on port ' + config_1.default.port);
});
