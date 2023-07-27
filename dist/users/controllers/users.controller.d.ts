import { UsersService } from './../services/users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getAll(): Promise<import("../entities/user.entity").User[]>;
    login(body: {
        email: string;
        password: string;
    }): Promise<string>;
    create(body: any): Promise<import("../entities/user.entity").User>;
}
