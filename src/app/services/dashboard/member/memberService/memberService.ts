import { Prisma, PrismaClient } from "@prisma/client"
import { Page } from "../../../../shared/models/page.model"

const prisma = new PrismaClient()

export const getMemberPage = async (offset: number, limit: number): Promise<Page<Prisma.memberCreateInput>> => {

    const [members, totalCount] = await prisma.$transaction([
        prisma.member.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                is_active: 'asc'
            }
        }),
        prisma.member.count()
    ])

    return {
        data: members,
        totalCount: totalCount
    }


}