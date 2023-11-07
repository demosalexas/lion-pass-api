import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, usernanme: string, password: string) {
    const user = await this.userService.findByEmail(email);
    console.log(user);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error('Email address or password provided is incorrect');
  }

  signIn(user: User): UserToken {
    console.log(user);
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.email,
    };

    const jwtToken = this.jwtService.sign(payload);
    return {
      accessToken: jwtToken,
    };
  }
}
