import { Repository } from 'typeorm';
import { Tasks } from '../entities/task.entity';
export declare class TasksService {
    private taskrepo;
    constructor(taskrepo: Repository<Tasks>);
    findAll(): Promise<Tasks[]>;
    findOne(id: number): Promise<Tasks>;
    create(userid: string, body: any): Promise<Tasks[]>;
    update(id: number, sub: number, body: any): Promise<Tasks>;
    delete(id: number): boolean;
    TasksUser(userid: number): Promise<Tasks[]>;
}
