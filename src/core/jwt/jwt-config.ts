import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const validatePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
}


export const generateJwtToken = (userId: string): string | null => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        return null;
    }
    return jwt.sign({ userId }, secretKey, { expiresIn: '20m' });
};