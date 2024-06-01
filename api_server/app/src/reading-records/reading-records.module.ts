import { Module } from '@nestjs/common';
import { ReadingRecordsService } from './reading-records.service';
import { ReadingRecordsController } from './reading-records.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ReadingRecordsController],
  providers: [ReadingRecordsService, PrismaService],
})
export class ReadingRecordsModule {}
