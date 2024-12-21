import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from '../../account/entities/account.entity';

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn('increment')
    eventNumber: number;

    @Column({ type: 'varchar', length: 30 })
    title: string;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'time' })
    time: string;

    @Column({ type: 'varchar', length: 255 })
    category: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'varchar', length: 255 })
    photo: string;

    @Column({ type: 'varchar', length: 255 })
    information: string;

    @ManyToOne(() => Account, account => account.events)
    @JoinColumn({ name: 'id' })  
    organisator: Account;
}
