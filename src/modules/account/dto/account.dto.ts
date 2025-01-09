import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDataURI, IsDate, IsEnum } from 'class-validator';
import { Gender } from '../entities/account.entity';

export class AccountDto {
  @IsNotEmpty()
  _id: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDate()
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  emailAddress: string;

  @IsString()
  profileImgUrl: string;

  @IsString()
  biography: string;
}

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  emailAddress: string;

  @IsOptional()
  @IsDate()
  dateOfBirth: Date;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  profileImgUrl: string;

  @IsOptional()
  @IsString()
  biography: string;

}