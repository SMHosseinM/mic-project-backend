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
exports.schema = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.schema = {
    firstName: {
        trim: true,
        notEmpty: {
            errorMessage: 'First name is required'
        }
    },
    lastName: {
        notEmpty: {
            errorMessage: 'Last name is required'
        }
    },
    email: {
        notEmpty: {
            errorMessage: 'Email address is required'
        },
        isEmail: {
            errorMessage: 'Email address is invalid'
        },
        custom: {
            options: (email) => __awaiter(void 0, void 0, void 0, function* () {
                const count = yield prisma.member.count({
                    where: { email: email }
                });
                if (count) {
                    return Promise.reject('An account with this email address already exists');
                }
            })
        }
    },
    transactionReference: {
        notEmpty: {
            errorMessage: 'Transaction reference is required'
        }
    },
    transactionDate: {
        notEmpty: {
            errorMessage: 'Transaction date is required'
        },
        isDate: {
            errorMessage: 'Transaction date format is incorrect'
        }
    },
    registrationNumber: {
        notEmpty: {
            errorMessage: 'Registration number is required'
        },
        custom: {
            options: (registrationNumber) => __awaiter(void 0, void 0, void 0, function* () {
                const count = yield prisma.member.count({
                    where: { registration_number: registrationNumber }
                });
                if (count) {
                    return Promise.reject('An account with this registration number already exists');
                }
            })
        }
    },
    phoneNumber: {
        notEmpty: {
            errorMessage: 'Phone number is required'
        },
        isNumeric: {
            errorMessage: 'Phone number cannot contain characters'
        },
        custom: {
            options: (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
                const count = yield prisma.member.count({
                    where: { phone_number: phoneNumber }
                });
                if (count) {
                    return Promise.reject('An account with this phone number already exists');
                }
            })
        }
    },
    isActive: {
        optional: true
    }
};
