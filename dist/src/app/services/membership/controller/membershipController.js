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
exports.newMembershipController = exports.getMembershipDetailsController = void 0;
const membershipService_1 = require("../service/membershipService");
const membershipDtoToPrisma_1 = require("../mapper/membershipDtoToPrisma");
const express_validator_1 = require("express-validator");
const getMembershipDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registrationNumber = req.params.registrationNumber.split(' ').join('');
        const membershipDetails = yield (0, membershipService_1.getMembershipDetails)(registrationNumber);
        if (!membershipDetails) {
            res.json({});
            return;
        }
        res.status(200).json(membershipDetails);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getMembershipDetailsController = getMembershipDetailsController;
const newMembershipController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        res.status(400).json({ message: result.array()[0].msg }).end();
        return;
    }
    const dto = (0, express_validator_1.matchedData)(req);
    const body = (0, membershipDtoToPrisma_1.dtoToPrisma)(dto);
    yield (0, membershipService_1.saveNewMembership)(body);
    res.status(201).end();
});
exports.newMembershipController = newMembershipController;
