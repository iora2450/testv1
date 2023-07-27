import { TasksService } from './../services/tasks.service';
import { Request } from 'express';
import { Tasks } from '../entities/task.entity';
export declare class TasksController {
    private taskService;
    constructor(taskService: TasksService);
    getAll1(): number[];
    TaskforUser(request: Request): Promise<Tasks[]> | {
        message: string;
    };
    getOne(id: number): any;
    create(request: Request, body: Tasks): Promise<Tasks[]> | {
        message: string;
    };
    update(id: number, request: Request, body: Tasks): Promise<Tasks> | {
        message: string;
    };
    delete(id: number, request: Request): boolean | {
        message: string;
    };
}
