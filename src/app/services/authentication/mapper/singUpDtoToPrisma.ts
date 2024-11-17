import { MembershipForm } from "../../../shared/models/membership.model";
import { Prisma } from '@prisma/client'
import { DateTime } from "luxon";
import { SingUpForm } from "../../../shared/models/authentication.model";



export const dtoToPrisma = (dto: SingUpForm): Prisma.userCreateInput => ({
    first_name: dto.firstName,
    last_name: dto.lastName,
    email: dto.email,
    password: dto.password
})