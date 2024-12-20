import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// import { Account } from './Account';
@Entity('events')
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    title: string;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'time' })
    time: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'varchar', length: 255 })
    photo: string;

    // @ManyToOne(() => Account, account => account.events, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    // @JoinColumn({ name: 'AccountNumber' })
    // organisator: Account;
}
