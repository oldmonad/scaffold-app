import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (ctx.subscription && (ctx.req.Authorization || ctx.req.authorization)) {
      return {
        headers: {
          authorization: ctx.req.Authorization || ctx.req.authorization,
        },
      };
    }
    return ctx.req;
  }
}
