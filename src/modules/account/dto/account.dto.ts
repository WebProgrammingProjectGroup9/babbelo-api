import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDate, IsEnum } from 'class-validator';
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

  @IsOptional()
  profileImgUrl: string;

  @IsString()
  biography: string;

  @IsString()
  organisationName: string;

  @IsString()
  chamberOfCommerce: string;

  @IsString()
  website: string;

  address: any;
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
  profileImgUrl: Buffer;

  @IsOptional()
  @IsString()
  biography: string;
  address: any;
}