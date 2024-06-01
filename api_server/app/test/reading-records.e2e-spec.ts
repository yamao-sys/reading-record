import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';
import { ReadingRecord } from '@prisma/client';
import { resetTestDatabase } from './resetTestDatabase';

describe('ReadingRecordsController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let prisma: PrismaService;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  // テストで起動したNestアプリを終了しないとJestで警告が発生するため、以下のコードで終了
  afterEach(async () => {
    await resetTestDatabase();
    await app.close();
    await moduleFixture.close();
  });

  describe('Query findAll()', () => {
    beforeEach(async () => {
      await prisma.readingRecord.createMany({
        data: [
          {
            title: 'test title1',
            learnedContent: 'test learned content1',
            impression: 'test impression1',
          },
          {
            title: 'test title2',
            learnedContent: 'test learned content2',
            impression: 'test impression2',
          },
        ],
      });
    });

    it('指定したfieldが取得できること', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/readingRecords')
        .expect(200);
      expect(body.length).toEqual(2);

      expect(body[0].title).toEqual('test title1');
      expect(body[0].learnedContent).toEqual('test learned content1');
      expect(body[0].impression).toEqual('test impression1');
      expect(body[1].title).toEqual('test title2');
      expect(body[1].learnedContent).toEqual('test learned content2');
      expect(body[1].impression).toEqual('test impression2');
    });
  });

  describe('Query findOne()', () => {
    let readingRecord: ReadingRecord;

    beforeEach(async () => {
      readingRecord = await prisma.readingRecord.create({
        data: {
          title: 'test title1',
          learnedContent: 'test learned content1',
          impression: 'test impression1',
        },
      });
    });

    it('指定した読書記録が取得できること', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/readingRecords/${readingRecord.id}`)
        .expect(200);
      expect(body.title).toEqual('test title1');
      expect(body.learnedContent).toEqual('test learned content1');
      expect(body.impression).toEqual('test impression1');
    });
  });

  describe('Mutation createTodo()', () => {
    it('todoが作成できること', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/readingRecords')
        .send({
          title: 'test title1',
          learnedContent: 'test learned content1',
          impression: 'test impression1',
        })
        .expect(201);
      expect(body.title).toEqual('test title1');
      expect(body.learnedContent).toEqual('test learned content1');
      expect(body.impression).toEqual('test impression1');

      const createdReadingRecord = await prisma.readingRecord.findFirst({
        where: { title: 'test title1' },
      });
      expect(!!createdReadingRecord).toBeTruthy();
    });
  });

  describe('Mutation updateTodo()', () => {
    let readingRecord: ReadingRecord;

    beforeEach(async () => {
      readingRecord = await prisma.readingRecord.create({
        data: {
          title: 'test title1',
          learnedContent: 'test learned content1',
          impression: 'test impression1',
        },
      });
    });

    it('読書記録が更新できること', async () => {
      const { body } = await request(app.getHttpServer())
        .patch(`/readingRecords/${readingRecord.id}`)
        .send({
          title: 'test updated title1',
          learnedContent: 'test updated learned content1',
          impression: 'test updated impression1',
        })
        .expect(200);
      expect(body.title).toEqual('test updated title1');
      expect(body.learnedContent).toEqual('test updated learned content1');
      expect(body.impression).toEqual('test updated impression1');

      const updatedReadingRecord = await prisma.readingRecord.findFirst({
        where: { title: 'test updated title1' },
      });
      expect(!!updatedReadingRecord).toBeTruthy();
    });
  });

  describe('Mutation removeTodo()', () => {
    let readingRecord: ReadingRecord;

    beforeEach(async () => {
      readingRecord = await prisma.readingRecord.create({
        data: {
          title: 'test title1',
          learnedContent: 'test learned content1',
          impression: 'test impression1',
        },
      });
    });

    it('読書記録が削除できること', async () => {
      const { body } = await request(app.getHttpServer())
        .delete(`/readingRecords/${readingRecord.id}`)
        .expect(200);
      expect(body.result).toEqual(true);

      const removedReadingRecord = await prisma.readingRecord.findFirst({
        where: { title: 'test title1' },
      });
      expect(!!removedReadingRecord).toBeFalsy();
    });
  });
});
