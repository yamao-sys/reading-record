import { getReadingRecordApiClient } from '../_actions/getReadingRecordApiClient';
import ReadingRecordEdit from '../_components/organisms/ReadingRecordEdit';

type ReadingRecordEditPageProps = {
  params: {
    id: string;
  };
};

export default async function ReadingRecordEditPage({ params }: ReadingRecordEditPageProps) {
  const { id } = params;
  const readingRecord = await getReadingRecordApiClient().readingRecords._id(id).$get();
  return (
    <>
      <ReadingRecordEdit readingRecord={readingRecord} />
    </>
  );
}
