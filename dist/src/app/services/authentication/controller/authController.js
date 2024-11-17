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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const express_validator_1 = require("express-validator");
const singUpDtoToPrisma_1 = require("../mapper/singUpDtoToPrisma");
const authService_1 = require("../service/authService");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        res.status(400).json({ message: result.array()[0].msg }).end();
        return;
    }
    const dto = (0, express_validator_1.matchedData)(req);
    const body = (0, singUpDtoToPrisma_1.dtoToPrisma)(dto);
    yield (0, authService_1.registerSystemUser)(body);
    res.status(200).end();
});
exports.signUp = signUp;
