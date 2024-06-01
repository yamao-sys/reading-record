import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReadingRecordsService } from './reading-records.service';
import { CreateReadingRecordDto } from './dto/create-reading-record.dto';
import { UpdateReadingRecordDto } from './dto/update-reading-record.dto';

@Controller('readingRecords')
export class ReadingRecordsController {
  constructor(private readonly readingRecordsService: ReadingRecordsService) {}

  @Post()
  async create(@Body() createReadingRecordDto: CreateReadingRecordDto) {
    return await this.readingRecordsService.create(createReadingRecordDto);
  }

  @Get()
  async findAll() {
    return await this.readingRecordsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.readingRecordsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReadingRecordDto: UpdateReadingRecordDto,
  ) {
    return await this.readingRecordsService.update(+id, updateReadingRecordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.readingRecordsService.remove(+id);
    return { result: true };
  }
}
