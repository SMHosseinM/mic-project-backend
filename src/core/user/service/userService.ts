import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email }
    })
}

export const findUserByEmailIfExistAndVerified = async (email: string) => {
    const user = await findUserByEmail(email);
    if (!user || !user.verified) {
        return null;
    }
    return user;
}