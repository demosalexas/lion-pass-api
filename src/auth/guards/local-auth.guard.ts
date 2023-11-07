import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // canActivate(context: ExecutionContext): any {
  //   return super.canActivate(context);
  // }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return true; // validateRequest(request);
  }

  handleRequest(err: Error, user: any) {
    console.log(user);
    if (err || !user) {
      throw new UnauthorizedException(err?.message);
    }

    return user;
  }
}
