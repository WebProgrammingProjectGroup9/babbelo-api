import { Gender } from "src/modules/account/entities/account.entity";

export class IAccountCredentials {
    emailAddress: string;
    password: string;
}

export class IAccountIdentity {
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    token?: string;
}

export class IAccountRegistration extends IAccountCredentials {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: Gender;
    phoneNumber: string;
}

export class Token {
    token: string;
}

