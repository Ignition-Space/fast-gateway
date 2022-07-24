import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PayloadUser = createParamDecorator(
  (data, ctx: ExecutionContext): Payload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);