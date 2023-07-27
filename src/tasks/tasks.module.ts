import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { Tasks } from './entities/task.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Tasks])
  ],
  providers: [TasksService], // Asegúrate de incluir JwtAuthGuard en la lista de providers
  controllers: [TasksController]
})
export class TasksModule {}
