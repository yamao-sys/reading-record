import { Test, TestingModule } from '@nestjs/testing';
import { ReadingRecordsService } from './reading-records.service';

describe('ReadingRecordsService', () => {
  let service: ReadingRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadingRecordsService],
    }).compile();

    service = module.get<ReadingRecordsService>(ReadingRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
