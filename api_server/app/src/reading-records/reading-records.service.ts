import { Injectable } from '@nestjs/common';
import { CreateReadingRecordDto } from './dto/create-reading-record.dto';
import { UpdateReadingRecordDto } from './dto/update-reading-record.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReadingRecordsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReadingRecordDto: CreateReadingRecordDto) {
    return await this.prisma.readingRecord.create({
      data: createReadingRecordDto,
    });
  }

  async findAll() {
    return await this.prisma.readingRecord.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.readingRecord.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateReadingRecordDto: UpdateReadingRecordDto) {
    return await this.prisma.readingRecord.update({
      where: { id },
      data: updateReadingRecordDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.readingRecord.delete({
      where: { id },
    });
  }
}
