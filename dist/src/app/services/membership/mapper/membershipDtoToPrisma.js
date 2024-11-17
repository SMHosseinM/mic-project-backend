"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtoToPrisma = void 0;
const luxon_1 = require("luxon");
const dtoToPrisma = (dto) => ({
    first_name: dto.firstName,
    last_name: dto.lastName,
    email: dto.email,
    registration_number: dto.registrationNumber,
    phone_number: dto.phoneNumber,
    transaction_reference: dto.transactionReference,
    transaction_date: luxon_1.DateTime.fromISO(dto.transactionDate).toJSDate(),
    is_active: dto.isActive
});
exports.dtoToPrisma = dtoToPrisma;
