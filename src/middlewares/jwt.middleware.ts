import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header 'Authorization'

    if (token) {
      const secretKey = 'jajaja'; // Reemplaza esto con tu clave secreta para verificar el JWT

      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          // El token no es válido
          res.status(401).json({ message: 'Token inválido' });
        } else {
          // El token es válido, continuamos con la ejecución de la solicitud
          next();
        }
      });
    } else {
      // El token no fue proporcionado en el header 'Authorization'
      res.status(401).json({ message: 'Token no proporcionado' });
    }
  }
}
