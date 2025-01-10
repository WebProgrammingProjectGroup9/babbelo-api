import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "../../event/entities/event.entity";
import { Account } from "../../account/entities/account.entity";

@Entity('addresses')
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 6})
    zipCode: string;

    @Column({ type: 'varchar', length: 50})
    StreetName: string;

    @Column({ type: 'varchar', length: 10})
    HouseNumber: number;
    
    @Column({ type: 'varchar', length: 50})
    City: string;

    @OneToMany(() => Event, event => event.address)
    events: Event[];

    @OneToMany(() => Account, account => account.address)
    accounts: Account[];
}