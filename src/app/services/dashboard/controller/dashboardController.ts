import { Request, Response } from 'express';

export const dashboard = (req: Request, res: Response): void => {

    res.status(200).json({ message: 'logged in' })
    return
}