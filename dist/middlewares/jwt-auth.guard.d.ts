import { CanActivate, ExecutionContext } from '@nestjs/common';
import * as JwtService from 'jsonwebtoken';
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
