import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { JwtMiddleware } from './middlewares/jwt.middleware'; // Importar el middleware aquí

@Module({
  imports: [
    TypeOrmModule.forRoot({
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
    TasksModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware) // Aplicar el middleware aquí
      .exclude() // Excluir la ruta de login del middleware
      .forRoutes({ path: 'tasks/identity', method: RequestMethod.GET }); // O para un controlador específico, usa .forRoutes(UserController)
  }
}
