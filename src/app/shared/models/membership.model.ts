import { DateTime } from 'luxon';

export interface MembershipForm {
    firstName: string;
    lastName: string;
    email: string;
    transactionReference: string;
    transactionDate: string;
    registrationNumber: string;
    phoneNumber: string;
    isActive: boolean;
}