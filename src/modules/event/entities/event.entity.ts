import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Account } from '../../account/entities/account.entity';
import { Address } from 'src/modules/address/entities/address.entity';

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

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'text', nullable: true })
    photo: string;

    @Column({ type: 'text' })
    information: string;

    @ManyToOne(() => Account, account => account.organizedEvents)
    @JoinColumn({ name: 'organisator' })
    organisator: Account;

    @ManyToMany(() => Account, account => account.participatingEvents)
    @JoinTable({
      name: 'event_participants',
      joinColumn: { name: 'event_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'account_id', referencedColumnName: 'id' },
    })
    participants: Account[];

    @ManyToOne(() => Address, address => address.events)
    @JoinTable()
    address: Address;
}
