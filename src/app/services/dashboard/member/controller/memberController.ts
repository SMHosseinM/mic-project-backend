import { Request, Response } from 'express';
import { getMemberPage } from '../memberService/memberService';

export const getMembersPage = async (req: Request, res: Response) => {

    console.log('her');
    const offset = parseInt(req.query.offset as string, 10) || 0;
    const limit = parseInt(req.query.limit as string, 10) || 0;

    const page = await getMemberPage(offset, limit);
    console.log(page);

    res.status(200).json(page);
}