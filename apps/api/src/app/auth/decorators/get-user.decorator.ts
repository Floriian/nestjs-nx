import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayload } from '../jwt-payload';

export const GetUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    if (!data) return req.user;
    return req.user[data];
  }
);
