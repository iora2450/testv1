"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tasks_module_1 = require("./tasks/tasks.module");
const users_module_1 = require("./users/users.module");
const jwt_middleware_1 = require("./middlewares/jwt.middleware");
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(jwt_middleware_1.JwtMiddleware)
            .exclude()
            .forRoutes({ path: 'tasks/identity', method: common_1.RequestMethod.GET });
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'super',
                password: 'super',
                database: 'test',
                entities: ['dist/**/*.entity{.ts,.js}'],
                synchronize: false,
                retryDelay: 3000,
                retryAttempts: 10,
            }),
            tasks_module_1.TasksModule,
            users_module_1.UsersModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map