import { Request } from 'express';


export interface SingUpForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface SignInForm {
    email: string;
    password: string;
}

export interface AuthenticatedRequest extends Request {
    userId?: string;
}