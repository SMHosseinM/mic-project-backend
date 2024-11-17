import express from 'express'
import { getMembershipDetailsController, newMembershipController } from './controller/membershipController'
import { checkSchema, ContextRunner } from 'express-validator';
import { schema } from './validation/dto-validation';

const router = express.Router();

router.get('/registration-number/:registrationNumber', getMembershipDetailsController)
router.post('/new-membership', checkSchema(schema, ['body']), newMembershipController)


export default router