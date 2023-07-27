import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './../services/users.service';
import { IsNull } from 'typeorm';



@Controller('users')
export class UsersController {

    constructor(
        private userService: UsersService
    ){}

    @Get()    
    getAll(){
        return this.userService.findAll();
    }
    
    @Get('login')    
    async login(@Body() body: { email: string; password: string }) {
        const { email, password } = body;


        const user = await this.userService.login(email, password);

        if (!user) {
          // Usuario o contraseña incorrectos, lanzar un error 401 (Unauthorized)
          throw new HttpException('Usuario o contraseña incorrectos', HttpStatus.UNAUTHORIZED);
        }
    
        // El login fue exitoso, retornar los datos del usuario (o el token de autenticación)
        return user;
    }

    @Post('register')
create(@Body() body:any ){
return this.userService.create(body);
}




}
