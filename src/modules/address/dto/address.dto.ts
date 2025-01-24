import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateAddressDto {
    @IsNotEmpty()
    _id: string;

    @IsNotEmpty()
    @IsString()
    zipCode: string;

    @IsNotEmpty()
    @IsString()
    streetName: string;

    @IsNotEmpty()
    @IsInt()
    houseNumber: number;

    @IsNotEmpty()
    @IsString()
    city: string;
}