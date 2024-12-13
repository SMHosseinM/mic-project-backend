import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const schema = {
    firstName: {
        trim: true,
        notEmpty: {
            errorMessage: 'First name is required'
        }
    },
    lastName: {
        notEmpty: {
            errorMessage: 'Last name is required'
        }
    }, 
    email: {
        notEmpty: {
            errorMessage: 'Email address is required'
        },
        isEmail: {
            errorMessage: 'Email address is invalid'
        },
        custom: {
            options: async (email: string) => {
                const count: number = await prisma.member.count({
                    where: { email: email}
                })
                if (count) {
                    return Promise.reject('An account with this email address already exists');
                }
            }
        }
    },
    transactionReference: {
        notEmpty: {
            errorMessage: 'Transaction reference is required'
        }
    },
    transactionDate: {
        notEmpty: {
            errorMessage: 'Transaction date is required'
        },
        isDate: {
            errorMessage: 'Transaction date format is incorrect'
        }
    },
    registrationNumber: {
        notEmpty: {
            errorMessage: 'Registration number is required'
        },
        custom: {
            options: async (registrationNumber: string) => {
                const count: number = await prisma.member.count({
                    where: { registration_number: registrationNumber}
                })
                if (count) {
                    return Promise.reject('An account with this registration number already exists');
                }
            }
        }
    },
    phoneNumber: {
        notEmpty: {
            errorMessage: 'Phone number is required'
        },
        isNumeric: {
            errorMessage: 'Phone number cannot contain characters'
        },
        custom: {
            options: async (phoneNumber: string) => {
                const count: number = await prisma.member.count({
                    where: { phone_number: phoneNumber}
                })
                if (count) {
                    return Promise.reject('An account with this phone number already exists');
                }
            }
        }
    },
    isActive: {
        optional: true
    }
}