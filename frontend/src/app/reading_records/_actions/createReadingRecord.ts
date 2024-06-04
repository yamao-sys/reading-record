'use server';

import { getReadingRecordApiClient } from './getReadingRecordApiClient';
import { CreateReadingRecordDto } from '@/api/reading_records/@types';

export async function createReadingRecord(inputReadingRecord: CreateReadingRecordDto) {
  'use server';

  return await getReadingRecordApiClient().readingRecords.$post({
    body: inputReadingRecord,
  });
}
