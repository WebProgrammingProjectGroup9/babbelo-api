import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AccountDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  emailAddress: string;

}