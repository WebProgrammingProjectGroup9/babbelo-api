import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "../../event/entities/event.entity";

export enum Gender {
    Female,
    Male,
    Unknown
}

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255})
    firstName: string;

    @Column({ type: 'varchar', length: 255})
    lastName: string;

    @Column({ type: 'date'})
    dateOfBirth: Date;

    @Column({ type: 'varchar', length: 255})
    gender: Gender;

    @Column({type: 'varchar', length: 255})
    phoneNumber: string;

    @Column({ type: 'varchar', length: 255, unique: true})
    emailAddress: string;

    @Column({ type: 'varchar', length: 255})
    password: string;

    @Column({ type: 'varchar', length: 255, nullable: true})
    profileImgUrl: string;

    @Column({ type: 'varchar', length: 255, nullable: true})
    biography: string;

    @OneToMany(() => Event, event => event.organisator, {nullable: true})
    @ManyToMany(() => Event, event => event.participants, {nullable: true})
    @Column({ type: 'varchar', length: 255, nullable: true})
    events: Event[];
}