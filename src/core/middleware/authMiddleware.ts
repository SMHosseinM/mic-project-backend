import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken'
import { AuthenticatedRequest } from '../../app/shared/models/authentication.model';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.cookies.jwt;
    const secretKey = process.env.JWT_SECRET_KEY;
    
    if (!secretKey) {
        res.status(500).json({ message: 'Server misconfiguration: Missing JWT secret key' });
        return;
    }

    if (!token) {
        res.status(403).json({ message: 'User does not have enough permission' });
        return;
    }

    try {
        req.userId = jwt.verify(token, secretKey) as AuthenticatedRequest['userId'];
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
        return;
    }
}

const checkAuthenticatedUserRole = (requiredRole: string) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {

        const userRoles = await prisma.user_role.findMany({
            where: {
                user_id: req.userId
            },
            include: {
                role: {
                    select: {
                        name: true
                    }
                }
            },
        })

        const roles = userRoles.map(userRole => userRole.role.name);
        if (!roles.includes(requiredRole)) {
            res.status(403).json({ message: 'The user does not have enough permissions' });
            return;
        }

        next();
    };
};



export default { requireAuth, checkAuthenticatedUserRole }
