import express from 'express';
import { dashboard } from './controller/dashboardController';
import middleware from '../../../core/middleware/authMiddleware'

const router = express.Router();

router.get('/', middleware.requireAuth, dashboard)

export default router;