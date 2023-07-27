import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userrepo: Repository<User>
    ){}

    findAll(){
        return  this.userrepo.find();
     }



     async create(body: User): Promise<User> {
        try {
          const existingUser = await this.userrepo.findOne({ where: { email: body.email } });

          if (existingUser) {
            // El email ya está registrado, lanzar un error 409 (Conflict)
            throw new ConflictException('Este email ya está registrado');
          }
          // Generar un salt para la encriptación del password
          const saltRounds = 10;
          const salt = await bcrypt.genSalt(saltRounds);
    
          // Encriptar el password antes de guardarlo
          body.password = await bcrypt.hash(body.password, salt);
    
          const newUser = this.userrepo.create(body);
          return this.userrepo.save(newUser);
        } catch (error) {
          if (error.status === HttpStatus.CONFLICT) {
            // El email ya está registrado, lanzar un error 409 (Conflict) al cliente
            throw new HttpException('Este email ya está registrado', HttpStatus.CONFLICT);
          } else {
            // Otro error desconocido, lanzar un error 500 (Internal Server Error) al cliente
            throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }
      }



      async login(email: string, password: string): Promise<string | null> {
        // Buscar el usuario en la base de datos por su email
        const user = await this.userrepo.findOne({ where: { email } });
    
        if (!user) {
          // El usuario no existe
          return null;
        }
    
        // Comparar el password ingresado con el hash almacenado en la base de datos
        const passwordMatches = await bcrypt.compare(password, user.password);
    
        if (!passwordMatches) {
          // El password no coincide
          return null;
        }
    
        // El login fue exitoso, generar y retornar un JWT
        const payload = { sub: user.id, email: user.email }; // Información que deseas incluir en el JWT
        const secretKey = 'jajaja'; // Reemplaza esto con tu clave secreta para firmar el JWT
    
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // El token expirará en 1 hora
    
        return token;
      }
    

}
