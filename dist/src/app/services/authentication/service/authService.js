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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSystemUser = exports.signupSystemUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const userService_1 = require("../../../../core/user/service/userService");
const jwt_config_1 = require("../../../../core/jwt/jwt-config");
const saltRound = 10;
const prisma = new client_1.PrismaClient();
const signupSystemUser = (form) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = form;
    form.password = yield bcrypt_1.default.hash(password, saltRound);
    yield prisma.user.create({ data: form });
});
exports.signupSystemUser = signupSystemUser;
const loginSystemUser = (form) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = form;
    const user = yield (0, userService_1.findUserByEmailIfExistAndVerified)(email);
    if (!user) {
        return { 'token': null, 'err': 'No user found with this email address or the user is not verified' };
    }
    const isPasswordValid = yield (0, jwt_config_1.validatePassword)(password, user.password);
    if (!isPasswordValid) {
        return { token: null, err: 'The password is incorrect' };
    }
    const token = (0, jwt_config_1.generateJwtToken)(user.id);
    if (!token) {
        return { token: null, err: 'Internal error: Could not generate token' };
    }
    return { token, err: '' };
});
exports.loginSystemUser = loginSystemUser;
