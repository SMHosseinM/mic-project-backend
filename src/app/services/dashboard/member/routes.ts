import express from 'express'
import { getMembersPage } from './controller/memberController';

const router = express.Router();

router.get('/page', getMembersPage);

export default router