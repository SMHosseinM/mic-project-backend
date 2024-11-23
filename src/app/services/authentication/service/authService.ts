import bcrypt from 'bcrypt';
import { Prisma, PrismaClient } from '@prisma/client'
import { SignInForm } from '../../../shared/models/authentication.model';
import jwt from 'jsonwebtoken'
import { findUserByEmail, findUserByEmailIfExistAndVerified } from '../../../../core/user/service/userService';
import { generateJwtToken, validatePassword } from '../../../../core/jwt/jwt-config';

const saltRound = 10;
const prisma = new PrismaClient()


export const signupSystemUser = async (form: Prisma.userCreateInput) => {
    const { password } = form;
    
    form.password = await bcrypt.hash(password, saltRound);

    await prisma.user.create({ data: form });
}

export const loginSystemUser = async (form: SignInForm) => {
    const { email, password } = form;

    const user = await findUserByEmailIfExistAndVerified(email);
    if (!user) {
        return {'token': null, 'err': 'No user found with this email address or the user is not verified'};
    }

    const isPasswordValid = await validatePassword(password, user.password);
    if (!isPasswordValid) {
        return { token: null, err: 'The password is incorrect' };
    }

    const token = generateJwtToken(user.id);
    if (!token) {
        return { token: null, err: 'Internal error: Could not generate token' };
    }

    return { token, err: '' };
}