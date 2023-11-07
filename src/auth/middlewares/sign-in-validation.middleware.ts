import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SignInRequestBody } from '../models/SignInRequestBody';
import { validate } from 'class-validator';

@Injectable()
export class SignInValidationMiddleware implements NestMiddleware {
  async use(request: Request, response: Response, next: NextFunction) {
    const body = request.body;

    const signInRequestBody = new SignInRequestBody();
    signInRequestBody.email = body.email;
    signInRequestBody.password = body.password;

    const validations = await validate(signInRequestBody);

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc, curr) => {
          return [...acc, ...Object.values(curr.constraints)];
        }, []),
      );
    }

    next();
  }
}
