import { Request } from 'express';
import Joi  from 'joi';

const newMembershipDto = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    transactionReference: Joi.string().required(),
    transactionDate: Joi.date().required()
});

export const newMembershipDtoValidation = (data: Request) => {
    return newMembershipDto.validate(data);
}