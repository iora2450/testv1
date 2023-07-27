import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Tasks } from '../entities/task.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Tasks) private taskrepo: Repository<Tasks>
    ){}

    findAll(){
       return  this.taskrepo.find();
    }

    async findOne(id: number){
        const options: FindOneOptions<Tasks> = { where: { id } };
        const task = await this.taskrepo.findOne(options);
        return task || null;
    }

create(userid : string, body: any )
{
    try {
        const newTask = this.taskrepo.create({ ...body, userid: parseInt(userid, 10) });
    return this.taskrepo.save(newTask);
} catch (error) {
    // Manejar el error aquí, puedes imprimirlo o lanzar una excepción si es necesario
    console.error(error);
    throw new Error('Error al guardar la tarea.');
  }
}


async update(id: number, sub:number,  body:any)
{
    const task = await this.taskrepo.findOne({
        where :{
            id:id
        }
    });
    this.taskrepo.merge(task, body);
    return this.taskrepo.save(task);


}

delete(id: number)
{
    this.taskrepo.delete(id);
    return true ;

}


    async TasksUser(userid: number): Promise<Tasks[]> {
        const options: FindOneOptions<Tasks> = { where: { userid } };
        const task = await this.taskrepo.find(options);
        return task || null;
}



}