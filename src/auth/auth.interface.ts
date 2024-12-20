export interface IAccountCredentials {
    emailAddress: string;
    password: string;
}

export interface IAccountIdentity {
    id: number,
    name: string;
    emailAddress: string;
    token?: string;
}

export interface IAccountRegistration extends IAccountCredentials {
    name: string;
}

export interface IToken {
    token: string;
}
