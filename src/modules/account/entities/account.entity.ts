import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "../../event/entities/event.entity";
import { Address } from "../../address/entities/address.entity";

export enum Gender {
    Female,
    Male,
    Unknown
}

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30})
    firstName: string;

    @Column({ type: 'varchar', length: 30})
    lastName: string;

    @Column({ type: 'date'})
    dateOfBirth: Date;

    @Column({ type: 'varchar', length: 10})
    gender: Gender;

    @Column({type: 'varchar', length: 12})
    phoneNumber: string;

    @Column({ type: 'varchar', length: 50, unique: true})
    emailAddress: string;

    @Column({ type: 'varchar', length: 50})
    password: string;

    @Column({ type: 'bytea', length: 255, nullable: true})
    profileImgUrl: Buffer;

    @Column({ type: 'text', nullable: true})
    biography: string;

    @Column({ type: 'varchar', length: 50, nullable: true})
    organisationName: string;

    @Column({ type: 'varchar', length: 8, nullable: true})
    chamberOfCommerce: string;

    @Column({ type: 'varchar', length: 255, nullable: true})
    website: string;

    @OneToMany(() => Event, event => event.organisator, { nullable: true })
    organizedEvents: Event[];
  
    @ManyToMany(() => Event, event => event.participants)
    @JoinTable({
      name: 'event_participants',
      joinColumn: { name: 'account_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'event_id', referencedColumnName: 'id' },
    })
    participatingEvents: Event[];

    @ManyToOne(() => Address, address => address.accounts)
    address: Address;
}