"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtoToPrisma = void 0;
const dtoToPrisma = (dto) => ({
    first_name: dto.firstName,
    last_name: dto.lastName,
    email: dto.email,
    password: dto.password
});
exports.dtoToPrisma = dtoToPrisma;
