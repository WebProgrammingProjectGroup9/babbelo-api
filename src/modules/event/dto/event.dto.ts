import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Account } from "../../account/entities/account.entity";
import { Transform } from "class-transformer";

export class EventDto {
    id: number;
    
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    date: Date;

    @IsNotEmpty()
    @IsString()
    time: string;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    photo: string;

    @IsString()
    @IsNotEmpty()
    information: string;

    organisator: Account;
}

export class UpdateEventDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsDate()
    date: Date;

    @IsOptional()
    @IsString()
    time: string;

    @IsOptional()
    @IsString()
    category: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    photo: string;

    @IsOptional()
    @IsString()
    information: string;

    @IsOptional()
    organisator: Account;
}




