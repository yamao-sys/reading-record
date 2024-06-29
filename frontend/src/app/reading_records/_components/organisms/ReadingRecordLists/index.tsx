'use client';

import Snackbar from '@mui/material/Snackbar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteReadingRecord } from '../../../_actions/deleteReadingRecord';
import { FetchAllReadingRecordResponseDto } from '@/api/reading_records/@types';

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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        ContentProps={{
          sx: {
            backgroundColor: 'success.light',
          },
        }}
        open={snackbarState}
        onClose={handleClose}
        message='deleted successfully!!'
        key='topcenter'
        autoHideDuration={1200}
      />
      {!!displayableReadingRecords.length &&
        displayableReadingRecords.map((readingRecord) => (
          <div
            key={readingRecord.id}
            className='[&:not(:first-child)]:mt-8 border-2 border-gray-900 flex'
          >
            <div className='flex w-1/4 justify-center'>
              <div className='w-24 h-32 md:w-36 md:h-48 relative'>
                <Image src={readingRecord.bookImage || '/noimage.png'} alt='書籍画像' fill />
              </div>
            </div>
            <div className='w-3/4 h-36 md:h-48 p-2'>
              <div className='text-lg md:text-3xl break-words'>{readingRecord.title}</div>
              <div className='mt-2 text-xs'>登録日: {readingRecord.createdAt}</div>
              <div className='sm:w-1/2 lg:w-2/5 mt-4 flex'>
                <button
                  className='p-2 border-green-500 bg-green-500 rounded-xl text-white text-xs lg:text-sm'
                  onClick={() => handleRouteToEditPage(readingRecord.id)}
                >
                  編集する
                </button>
                <button
                  className='p-2 ml-4 border-red-500 bg-red-500 rounded-xl text-white text-xs lg:text-sm'
                  onClick={() => handleDeleteReadingRecord(readingRecord.id)}
                >
                  削除する
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
