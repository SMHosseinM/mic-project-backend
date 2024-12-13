import { Prisma } from "@prisma/client";
import { MembershipForm } from "../../../shared/models/membership.model";
import { DateTime } from "luxon";

export const dtoToPrisma = (dto: MembershipForm): Prisma.memberCreateInput => ({
    first_name: dto.firstName,
    last_name: dto.lastName,
    email: dto.email,
    registration_number: dto.registrationNumber,
    phone_number: dto.phoneNumber,
    transaction_reference: dto.transactionReference,
    transaction_date: DateTime.fromISO(dto.transactionDate).toJSDate(), 
    is_active: dto.isActive
})