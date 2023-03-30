import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();

    return next.handle().pipe(tap(() => {
      const request = context.switchToHttp().getRequest();

      console.log(`URL: ${request.url}`);
      console.log(`METHOD: ${request.method}`);
      console.log(`Time: ${Date.now() - dt} milliseconds`);
    }));
  }
}
