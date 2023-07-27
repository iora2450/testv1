import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UsersService {
    private userrepo;
    constructor(userrepo: Repository<User>);
    findAll(): Promise<User[]>;
    create(body: User): Promise<User>;
    login(email: string, password: string): Promise<string | null>;
}
