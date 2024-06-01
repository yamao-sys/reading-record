import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { ReadingRecordsModule } from './reading-records/reading-records.module';

@Module({
  imports: [TodosModule, ReadingRecordsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
