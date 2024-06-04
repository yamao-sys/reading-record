import ReadingRecordEdit from '../../organisms/ReadingRecordEdit';
import { ReadingRecordDto } from '@/api/reading_records/@types';

type ReadingRecordEditTemplateType = {
  readingRecord: ReadingRecordDto;
};

export default function ReadingRecordEditTemplate({
  readingRecord,
}: ReadingRecordEditTemplateType) {
  return (
    <>
      <ReadingRecordEdit readingRecord={readingRecord} />
    </>
  );
}
