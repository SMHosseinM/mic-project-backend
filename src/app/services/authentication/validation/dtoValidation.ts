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
                const count: number = await prisma.user.count({
                    where: { email: email}
                })
                if (count) {
                    return Promise.reject('A system user with this email address already exists');
                }
            }
        }
    },
    password: {
        trim: true,
        notEmpty: {
            errorMessage: 'Pasword is required'
        }
    },
}

export const loginSchema = {
    email: {
        notEmpty: {
            errorMessage: 'Email address is required'
        },
        isEmail: {
            errorMessage: 'Email address is invalid'
        }
    },
    password: {
        trim: true,
        notEmpty: {
            errorMessage: 'Pasword is required'
        }
    },
}