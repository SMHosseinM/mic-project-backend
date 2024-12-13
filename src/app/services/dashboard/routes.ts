import express from 'express';
import { dashboard } from './controller/dashboardController';
import middleware from '../../../core/middleware/authMiddleware'
import memberRoutes from './member/routes';

const router = express.Router();
router.use('/member', memberRoutes); 

router.get('/', middleware.requireAuth, dashboard)

export default router;