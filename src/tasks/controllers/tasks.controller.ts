import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './../services/tasks.service';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express'; // Importa el tipo Request
import { Tasks } from '../entities/task.entity';


@Controller('tasks')
export class TasksController {

    constructor(
        private taskService: TasksService
    ){}

    @Get('filter1')    
    getAll1(){
        return [1,2,3];
    }
    


@Get()    
TaskforUser(@Req() request: Request){

    try {
        const token = request.headers.authorization?.split(' ')[1];

        // Verificar y obtener el payload decodificado del token
        const secretKey = 'jajaja'; // Reemplaza esto con tu clave secreta para verificar el JWT
        const payload: any = jwt.verify(token, secretKey);

        // Aquí puedes acceder a los valores del payload
        const sub = payload.sub; // Por ejemplo, obtener el valor de 'sub'
        const email = payload.email; // Obtener el valor de 'email'

        return this.taskService.TasksUser(sub);
    } catch (error) {
        // Error en la verificación del token
        console.error(error);
        return { message: 'Token inválido' };
    }
}
 
@Get(':id')
getOne(@Param('id') id:number ){
return this.getOne(id);
}
 
@Post()
create(@Req() request: Request, @Body() body:Tasks ){

    try {
        const token = request.headers.authorization?.split(' ')[1];

        // Verificar y obtener el payload decodificado del token
        const secretKey = 'jajaja'; // Reemplaza esto con tu clave secreta para verificar el JWT
        const payload: any = jwt.verify(token, secretKey);

        // Aquí puedes acceder a los valores del payload
        const sub = payload.sub; // Por ejemplo, obtener el valor de 'sub'
        const email = payload.email; // Obtener el valor de 'email'

        return this.taskService.create( sub, body);
    } catch (error) {
        // Error en la verificación del token
        console.error(error);
        return { message: 'Token inválido' };
    }

}



@Put(':id')
update(@Param('id') id:number,  @Req() request: Request, @Body() body:Tasks){
 
    try {
        const token = request.headers.authorization?.split(' ')[1];

        // Verificar y obtener el payload decodificado del token
        const secretKey = 'jajaja'; // Reemplaza esto con tu clave secreta para verificar el JWT
        const payload: any = jwt.verify(token, secretKey);

        // Aquí puedes acceder a los valores del payload
        const sub = payload.sub; // Por ejemplo, obtener el valor de 'sub'
        const email = payload.email; // Obtener el valor de 'email'
// es la tarea 
        return this.taskService.update(id, sub,  body);
    } catch (error) {
        // Error en la verificación del token
        console.error(error);
        return { message: 'Token inválido' };
    }
}

@Delete(':id')
delete (@Param('id') id:number,  @Req() request: Request)
{

    try {
        const token = request.headers.authorization?.split(' ')[1];

        // Verificar y obtener el payload decodificado del token
        const secretKey = 'jajaja'; // Reemplaza esto con tu clave secreta para verificar el JWT
        const payload: any = jwt.verify(token, secretKey);

        // Aquí puedes acceder a los valores del payload
        const sub = payload.sub; // Por ejemplo, obtener el valor de 'sub'
        const email = payload.email; // Obtener el valor de 'email'
// es la tarea 
return this.taskService.delete(id) ;
    } catch (error) {
        // Error en la verificación del token
        console.error(error);
        return { message: 'Token inválido' };
    }
  
}

}
