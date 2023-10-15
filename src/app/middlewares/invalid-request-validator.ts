import { NextFunction, Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { AddTaskBody, AddUserBody } from 'app/models';

import { valdationErrorHandler } from './response-handler';

export const validateTask = async (req: Request, res: Response, next: NextFunction) => {
  const payload = plainToClass(AddTaskBody, req.body);
  const errors = await validate(payload);

  if (errors.length) {
    return res.status(400).send(valdationErrorHandler(errors));
  }

  return next();
};

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const payload = plainToClass(AddUserBody, req.body);
  const errors = await validate(payload);

  if (errors.length) {
    return res.status(400).send(valdationErrorHandler(errors));
  }

  return next();
};