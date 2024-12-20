import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 30})
    title: string;

    @Column({ type: 'date' })
    date: Date

    @Column({ type: 'time' })
    time: string;

    @Column({type: 'varchar', length: 30})
    location: string;

    @Column({type: 'varchar', length: 255})
    description: string;

    @Column({type: 'varchar', length: 255})
    photoUrl: string;y


    @Column({type: 'varchar', length: 30})
    organistor: string;

}
