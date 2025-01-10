import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDate, IsEnum, IsInt } from 'class-validator';

export class CreateAddressDto {
    @IsNotEmpty()
    _id: string;

    @IsNotEmpty()
    @IsString()
    zipCode: string;

    @IsNotEmpty()
    @IsString()
    StreetName: string;

    @IsNotEmpty()
    @IsInt()
    HouseNumber: number;

    @IsNotEmpty()
    @IsString()
    City: string;
}