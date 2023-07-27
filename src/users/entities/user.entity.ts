import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";


@Entity({ name: 'User' })
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string ;

    @Column()
    email: string ;

    @Column()
    password: string ;

  
}