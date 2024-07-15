'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteReadingRecord } from '../../../_actions/deleteReadingRecord';
import { BookImage } from '../../molecules/BookImage';
import { FetchAllReadingRecordResponseDto } from '@/api/reading_records/@types';
import { BaseButton } from '@/components/atoms/BaseButton';
import { BaseSnackbar } from '@/components/atoms/BaseSnackbar';

type ReadingRecordListsType = {
  readingRecords: FetchAllReadingRecordResponseDto;
};

export default function ReadingRecordLists({ readingRecords }: ReadingRecordListsType) {
  const [displayableReadingRecords, setDisplayableReadingRecords] =
    useState<FetchAllReadingRecordResponseDto>(readingRecords);
  const router = useRouter();

  const handleRouteToEditPage = (id: string) => {
    router.push(`/reading_records/${id}`);
    router.refresh();
  };

  const [snackbarState, setSnackbarState] = useState<boolean>(false);

  const handleClose = () => {
    setSnackbarState(false);
  };

  const handleDeleteReadingRecord = async (id: string) => {
    if (!window.confirm('本当に削除しますか？')) return;

    await deleteReadingRecord(id);
    const newDisplayableReadingRecords = displayableReadingRecords.filter(
      (readingRecord) => readingRecord.id !== id,
    );
    setDisplayableReadingRecords(newDisplayableReadingRecords);
    setSnackbarState(true);
  };

  return (
    <>
      <BaseSnackbar open={snackbarState} onClose={handleClose} message='deleted successfully!!' />

      {!!displayableReadingRecords.length &&
        displayableReadingRecords.map((readingRecord) => (
          <div
            key={readingRecord.id}
            className='[&:not(:first-child)]:mt-8 border-2 border-gray-900 flex'
          >
            <BookImage
              src={readingRecord.bookImage || '/noimage.png'}
              alt='書籍画像'
              widthStyle='w-1/4'
              additionalImageStyle='md:w-36 md:h-48'
            />
            <div className='w-3/4 h-36 md:h-48 p-2'>
              <div className='text-lg md:text-3xl break-words'>{readingRecord.title}</div>
              <div className='mt-2 text-xs'>登録日: {readingRecord.createdAt}</div>
              <div className='sm:w-1/2 lg:w-2/5 mt-4 flex'>
                <BaseButton
                  labelText='編集する'
                  color='green'
                  additionalStyle='text-xs lg:text-sm'
                  onClick={() => handleRouteToEditPage(readingRecord.id)}
                />
                <BaseButton
                  labelText='削除する'
                  color='red'
                  additionalStyle='ml-4 text-xs lg:text-sm'
                  onClick={() => handleDeleteReadingRecord(readingRecord.id)}
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
