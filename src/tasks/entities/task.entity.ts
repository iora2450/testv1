import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tasks' })
export class Tasks{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string ;

    @Column()
    status: string ;

    @Column()
    userid: number ;

}