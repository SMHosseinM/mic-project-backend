import { Request, Response } from 'express';
import { validationResult, matchedData } from 'express-validator';
import { SingUpForm, SignInForm } from '../../../shared/models/authentication.model';
import { Prisma } from '@prisma/client';
import { dtoToPrisma } from '../mapper/singUpDtoToPrisma';
import { loginSystemUser, signupSystemUser } from '../service/authService';


export const signUp = async (req: Request, res: Response): Promise<void> => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ message: result.array()[0].msg }).end()
        return
    }

    const dto: SingUpForm = matchedData(req)
    const body: Prisma.userCreateInput = dtoToPrisma(dto)

    await signupSystemUser(body);

    res.status(200).end();
}

export const signIn = async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ message: result.array()[0].msg }).end()
        return
    }

    const dto: SignInForm = matchedData(req)
    const login = await loginSystemUser(dto)

    if (login.err) {
        res.status(400).json({ message: login.err }).end()
        return
    }

    res.cookie('jwt', login.token).status(200).end();
}