export interface IUserCredentials {
    emailAddress: string;
    password: string;
}

export interface IUserIdentity {
    id: number,
    name: string;
    emailAddress: string;
    token?: string;
}

export interface IUserRegistration extends IUserCredentials {
    name: string;
}

export interface IToken {
    token: string;
}
