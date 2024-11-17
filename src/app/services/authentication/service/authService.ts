import bcrypt from 'bcrypt';
import { Prisma, PrismaClient } from '@prisma/client'

const saltRound = 10;
const prisma = new PrismaClient()

export const registerSystemUser = async (form: Prisma.userCreateInput) => {
    const { password } = form
    
    form.password = await bcrypt.hash(password, saltRound);

    await prisma.user.create({ data: form })
}