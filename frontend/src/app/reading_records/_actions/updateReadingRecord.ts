'use server';

import { getReadingRecordApiClient } from './getReadingRecordApiClient';
import { UpdateReadingRecordDto } from '@/api/reading_records/@types';

export async function updateReadingRecord(id: string, inputReadingRecord: UpdateReadingRecordDto) {
  'use server';

  return await getReadingRecordApiClient().readingRecords._id(id).$patch({
    body: inputReadingRecord,
  });
}
