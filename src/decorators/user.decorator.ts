import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';

export const User = createParamDecorator((filter: string, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  if (request.user) {
    if (filter) {
      return request.user[filter];
    }

    return request.user;
  }

  throw new NotFoundException('user not found');
});
