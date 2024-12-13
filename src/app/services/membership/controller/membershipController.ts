import { getMembershipDetails, saveNewMembership }  from '../service/membershipService';
import { Request, Response } from 'express';
import { MembershipForm } from '../../../shared/models/membership.model';
import { Prisma } from '@prisma/client';
import { dtoToPrisma } from '../mapper/membershipDtoToPrisma';
import { validationResult, matchedData } from 'express-validator';

export const getMembershipDetailsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const registrationNumber = req.params.registrationNumber.split(' ').join('')

        const membershipDetails = await getMembershipDetails(registrationNumber)

        if (!membershipDetails) {
            res.json({});
            return;
        }

        res.status(200).json(membershipDetails);
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const newMembershipController = async (req: Request, res: Response): Promise<void> => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ message: result.array()[0].msg }).end()
        return
    }
    const dto: MembershipForm = matchedData(req)
    const body: Prisma.memberCreateInput = dtoToPrisma(dto)
        
    await saveNewMembership(body)

    res.status(201).end()

}