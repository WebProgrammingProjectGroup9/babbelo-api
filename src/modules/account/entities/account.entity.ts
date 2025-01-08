import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({ type: 'varchar', length: 255, nullable: true})
    profileImgUrl: string;

    @Column({ type: 'text', nullable: true})
    biography: string;

    @OneToMany(() => Event, event => event.organisator, { nullable: true })
    organizedEvents: Event[];
  
    @ManyToMany(() => Event, event => event.participants)
    @JoinTable({
      name: 'event_participants',
      joinColumn: { name: 'account_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'event_id', referencedColumnName: 'id' },
    })
    participatingEvents: Event[];
}