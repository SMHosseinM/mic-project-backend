import { Request, Response } from 'express';
import { validationResult, matchedData } from 'express-validator';
import { SingUpForm } from '../../../shared/models/authentication.model';
import { Prisma } from '@prisma/client';
import { dtoToPrisma } from '../mapper/singUpDtoToPrisma';
import { registerSystemUser } from '../service/authService';


export const signUp = async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ message: result.array()[0].msg }).end()
        return
    }

    const dto: SingUpForm = matchedData(req)
    const body: Prisma.userCreateInput = dtoToPrisma(dto)

    await registerSystemUser(body);

    res.status(200).end();
}