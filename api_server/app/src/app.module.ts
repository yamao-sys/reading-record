import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { ReadingRecordsModule } from './reading-records/reading-records.module';
import { SearchBooksModule } from './search-books/search-books.module';

@Module({
  imports: [TodosModule, ReadingRecordsModule, SearchBooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
