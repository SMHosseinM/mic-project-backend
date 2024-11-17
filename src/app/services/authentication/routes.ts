import express from 'express';
import { signUp } from './controller/authController';
import { schema } from './validation/dtoValidation';
import { checkSchema } from 'express-validator';

const router = express.Router();

router.post('/sign-up', checkSchema(schema, ['body']), signUp)


export default router;