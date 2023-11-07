import { IsEmail, IsString } from 'class-validator';

export class SignInRequestBody {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
