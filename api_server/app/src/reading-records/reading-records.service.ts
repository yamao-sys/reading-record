import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReadingRecordDto } from './dto/create-reading-record.dto';
import { UpdateReadingRecordDto } from './dto/update-reading-record.dto';
import { PrismaService } from 'src/prisma.service';
import { GoogleCloudService } from 'src/google-cloud/google-cloud.service';

@Injectable()
export class ReadingRecordsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly googleCloud: GoogleCloudService,
  ) {}

  async create(createReadingRecordDto: CreateReadingRecordDto) {
    // TODO: transaction入れる
    const readingRecord = await this.prisma.readingRecord.create({
      data: createReadingRecordDto,
    });
    if (!createReadingRecordDto.bookImage) return readingRecord;

    const filePath = await this.googleCloud.uploadToStorage(
      createReadingRecordDto.bookImage,
      `book_image/${readingRecord.id}`,
    );
    return await this.prisma.readingRecord.update({
      where: { id: readingRecord.id },
      data: { bookImage: filePath },
    });
  }

  async findAll() {
    const readingRecords = await this.prisma.readingRecord.findMany();
    if (!readingRecords) return readingRecords;

    return Promise.all(
      readingRecords.map(async (readingRecord) => {
        if (!readingRecord.bookImage) return readingRecord;

        readingRecord.bookImage = await this.googleCloud.downloadFromStorage(
          readingRecord.bookImage,
        );
        return readingRecord;
      }),
    );
  }

  async findOne(id: number) {
    const readingRecord = await this.prisma.readingRecord.findFirst({
      where: {
        id,
      },
    });
    if (!readingRecord) {
      throw new NotFoundException();
    }
    if (!readingRecord.bookImage) return readingRecord;

    readingRecord.bookImage = await this.googleCloud.downloadFromStorage(
      readingRecord.bookImage,
    );
    return { ...readingRecord };
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
