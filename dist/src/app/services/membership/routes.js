"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const membershipController_1 = require("./controller/membershipController");
const express_validator_1 = require("express-validator");
const dto_validation_1 = require("./validation/dto-validation");
const router = express_1.default.Router();
router.get('/registration-number/:registrationNumber', membershipController_1.getMembershipDetailsController);
router.post('/new-membership', (0, express_validator_1.checkSchema)(dto_validation_1.schema, ['body']), membershipController_1.newMembershipController);
exports.default = router;
