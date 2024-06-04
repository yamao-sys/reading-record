import ReadingRecordLists from '../../organisms/ReadingRecordLists';
import { FetchAllReadingRecordResponseDto } from '@/api/reading_records/@types';

type ReadingRecordsTemplateType = {
  readingRecords: FetchAllReadingRecordResponseDto;
};

export default function ReadingRecordsTemplate({ readingRecords }: ReadingRecordsTemplateType) {
  return (
    <>
      <div className='mt-16'>
        <ReadingRecordLists readingRecords={readingRecords} />
      </div>
    </>
  );
}
