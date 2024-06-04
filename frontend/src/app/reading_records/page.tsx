import { getReadingRecordApiClient } from './_actions/getReadingRecordApiClient';
import ReadingRecordsTemplate from './_components/templates/ReadingRecordsTemplate';

export default async function ReadingRecords() {
  const readingRecords = await getReadingRecordApiClient().readingRecords.$get();

  return (
    <>
      <ReadingRecordsTemplate readingRecords={readingRecords} />
    </>
  );
}
