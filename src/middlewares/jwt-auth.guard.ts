import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import * as JwtService from 'jsonwebtoken';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization;

    if (!authToken || !authToken.startsWith('Bearer ')) {
      return false; // Token no proporcionado o en formato incorrecto
    }

    const token = authToken.split(' ')[1];

    try {
      // Decodificar el token JWT
      const decodedToken = this.jwtService.verify(token);

      // Verificar si el usuario tiene los permisos necesarios (si es necesario)
      // Realizar cualquier otra lógica de verificación aquí según tus necesidades

      return true; // El usuario está autenticado y autorizado
    } catch (error) {
      return false; // El token no es válido o ha expirado
    }
  }
}
