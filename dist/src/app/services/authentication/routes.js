"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("./controller/authController");
const dtoValidation_1 = require("./validation/dtoValidation");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.post('/sign-up', (0, express_validator_1.checkSchema)(dtoValidation_1.schema, ['body']), authController_1.signUp);
router.post('/login', (0, express_validator_1.checkSchema)(dtoValidation_1.loginSchema, ['body']), authController_1.signIn);
exports.default = router;
