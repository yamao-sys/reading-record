'use server';

import { getReadingRecordApiClient } from './getReadingRecordApiClient';

export async function deleteReadingRecord(id: string) {
  return await getReadingRecordApiClient().readingRecords._id(id).$delete();
}
