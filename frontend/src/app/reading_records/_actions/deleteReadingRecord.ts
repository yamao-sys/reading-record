'use server';

import { getReadingRecordApiClient } from './getReadingRecordApiClient';

export async function deleteReadingRecord(id: string) {
  'use server';

  return await getReadingRecordApiClient().readingRecords._id(id).$delete();
}
