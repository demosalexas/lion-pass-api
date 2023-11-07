import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { CurrentUser } from './auth/decorators/current-user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
