export class AccountCredentialsDto {
    emailAddress: string;
    password: string;
}

export class AccountIdentityDto {
    id: number;
    name: string;
    emailAddress: string;
    token?: string;
}

export class AccountRegistrationDto extends AccountCredentialsDto {
    name: string;
}

export class Token {
    token: string;
}
