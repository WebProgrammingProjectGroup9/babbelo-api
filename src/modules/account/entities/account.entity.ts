import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "../../event/entities/event.entity";

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255})
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true})
    emailAddress: string;

    @Column({ type: 'varchar', length: 255})
    password: string;

    @OneToMany(() => Event, event => event.organisator)
    events: Event[];
}