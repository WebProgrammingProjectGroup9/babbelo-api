import { Account } from "../../account/entities/account.entity";

export class CreateEventDto{
    readonly eventNumber: number;
    readonly title: string;
    readonly date: Date;
    readonly time: string;
    readonly category: string;
    readonly description: string;
    readonly photo: string;
    readonly information: string;
    readonly organisator: Account;
}