import { IsEmail, IsString, IsDefined } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}
