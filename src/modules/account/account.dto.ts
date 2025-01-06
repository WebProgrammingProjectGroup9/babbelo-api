import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  emailAddress: string;

}