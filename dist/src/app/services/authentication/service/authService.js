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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService_1 = require("../../../../core/user/service/userService");
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
    const user = yield (0, userService_1.findUserByEmail)(email);
    if (!user) {
        return { 'token': null, 'err': 'No user with this email and password found' };
    }
    const isPassCorrect = bcrypt_1.default.compare(password, user.password);
    const secreteKey = process.env.JWT_SECRET_KEY;
    if (!isPassCorrect || !secreteKey) {
        return { 'token': null, 'err': 'The password is incorrect' };
    }
    if (!user.verified) {
        return { 'token': null, 'err': 'The user is not verified' };
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, secreteKey, { expiresIn: '20m' });
    return { 'token': token, 'err': '' };
});
exports.loginSystemUser = loginSystemUser;
