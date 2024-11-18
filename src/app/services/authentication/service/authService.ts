import bcrypt from 'bcrypt';
import { Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client'
import { SignInForm } from '../../../shared/models/authentication.model';
import jwt from 'jsonwebtoken'
import { findUserByEmail } from '../../../../core/user/service/userService';

const saltRound = 10;
const prisma = new PrismaClient()

export const signupSystemUser = async (form: Prisma.userCreateInput) => {
    const { password } = form;
    
    form.password = await bcrypt.hash(password, saltRound);

    await prisma.user.create({ data: form });
}

export const loginSystemUser = async (form: SignInForm) => {
    const { email, password } = form;

    const user = await findUserByEmail(email);

    if (!user) {
        return {'token': null, 'err': 'No user with this email and password found'};
    }

    const isPassCorrect = bcrypt.compare(password, user.password);
    const secreteKey = process.env.JWT_SECRET_KEY

    if (!isPassCorrect || !secreteKey) {
        return {'token': null, 'err': 'The password is incorrect'};
    }

    if (!user.verified) {
        return {'token': null, 'err': 'The user is not verified'};
    }

    const token = jwt.sign({ userId: user.id}, secreteKey, {expiresIn: '20m'} );

    return {'token': token, 'err': ''};
}