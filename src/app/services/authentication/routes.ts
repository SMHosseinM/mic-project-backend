import express from 'express';
import { signUp, signIn } from './controller/authController';
import { schema, loginSchema } from './validation/dtoValidation';
import { checkSchema } from 'express-validator';

const router = express.Router();

router.post('/sign-up', checkSchema(schema, ['body']), signUp)
router.post('/login', checkSchema(loginSchema, ['body']), signIn)


export default router;