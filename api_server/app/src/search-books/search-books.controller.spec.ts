import { Test, TestingModule } from '@nestjs/testing';
import { SearchBooksController } from './search-books.controller';
import { SearchBooksService } from './search-books.service';

describe('SearchBooksController', () => {
  let controller: SearchBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchBooksController],
      providers: [SearchBooksService],
    }).compile();

    controller = module.get<SearchBooksController>(SearchBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
