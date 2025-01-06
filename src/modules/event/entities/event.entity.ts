import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Account } from '../../account/entities/account.entity';

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 30 })
    title: string;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'time' })
    startTime: string;

    @Column({ type: 'time' })
    endTime: string;

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
    @Column({ type: 'varchar', length: 255 })
    organisator: Account;

    @ManyToMany(() => Account, account => account.events)
    @JoinColumn({ name: 'id' })
    @Column({ type: 'varchar', length: 255 })
    participants: Account[];


}
