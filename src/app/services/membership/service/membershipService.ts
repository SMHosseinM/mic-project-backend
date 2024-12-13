import { MembershipForm } from "../../../shared/models/membership.model";
import { Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client'
import { date } from "joi";

const prisma = new PrismaClient()

export const getMembershipDetails = async (registrationNumber: string) => { 
    try {
        const member = await prisma.member.findUnique({
            where: {
                registration_number: registrationNumber
            }
        })

        return member;
    } catch (err: any) {
        throw new Error(`Error getting a membership: ${err.message}`)
    }
}

export const saveNewMembership = async (form: Prisma.memberCreateInput) => {
    await prisma.member.create({data: form})
} 