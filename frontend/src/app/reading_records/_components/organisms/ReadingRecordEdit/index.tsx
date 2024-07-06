'use client';

import Snackbar from '@mui/material/Snackbar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { updateReadingRecord } from '../../../_actions/updateReadingRecord';
import { ReadingRecordDto, UpdateReadingRecordDto } from '@/api/reading_records/@types';

type ReadingRecordEditType = {
  readingRecord: ReadingRecordDto;
};

export default function ReadingRecordEdit({ readingRecord }: ReadingRecordEditType) {
  const [inputReadingRecord, setInputReadingRecord] =
    useState<UpdateReadingRecordDto>(readingRecord);

  const updateInputReadingRecord = (params: Partial<UpdateReadingRecordDto>) => {
    setInputReadingRecord({ ...inputReadingRecord, ...params });
  };

  const router = useRouter();

  const hundleSubmit = async () => {
    const response = await updateReadingRecord(readingRecord.id, inputReadingRecord);

    setInputReadingRecord(response);
    setSnackbarState(true);
  };

  const [snackbarState, setSnackbarState] = useState<boolean>(false);

  const handleClose = () => {
    setSnackbarState(false);
    router.push('/reading_records');
    router.refresh();
  };

  const bookImg = useMemo(() => {
    if (inputReadingRecord.bookImage) return inputReadingRecord.bookImage;

    return '/noimage.png';
  }, [inputReadingRecord]);

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
        message='saved successfully!!'
        key='topcenter'
        autoHideDuration={1200}
      />
      <div className='mt-16'>
        <div>
          <label
            htmlFor='title'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            <span className='font-bold'>本のタイトル</span>
          </label>
          <input
            id='title'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={inputReadingRecord.title}
            onChange={(e) => updateInputReadingRecord({ title: e.target.value })}
          />
        </div>
        <div className='mt-8'>
          <div className='flex w-full justify-center'>
            <div className='w-24 h-32 relative'>
              <Image src={bookImg} alt='書籍画像' fill />
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <label
            htmlFor='author'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            <span className='font-bold'>著者</span>
          </label>
          <input
            id='author'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={inputReadingRecord.author ?? ''}
            onChange={(e) => updateInputReadingRecord({ author: e.target.value })}
          />
        </div>
        <div className='mt-8'>
          <label
            htmlFor='learned_content'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            <span className='font-bold'>学んだこと</span>
          </label>
          <textarea
            id='learned_content'
            rows={16}
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none'
            value={inputReadingRecord.learnedContent ?? ''}
            onChange={(e) => updateInputReadingRecord({ learnedContent: e.target.value })}
          />
        </div>
        <div className='mt-8'>
          <label
            htmlFor='impression'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            <span className='font-bold'>感想</span>
          </label>
          <textarea
            id='impression'
            rows={16}
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none'
            value={inputReadingRecord.impression ?? ''}
            onChange={(e) => updateInputReadingRecord({ impression: e.target.value })}
          />
        </div>
        <div className='w-full flex justify-center'>
          <div className='mt-16'>
            <button
              className='py-2 px-8 border-green-500 bg-green-500 rounded-xl text-white'
              onClick={hundleSubmit}
            >
              保存する
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
