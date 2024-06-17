'use client';

import Snackbar from '@mui/material/Snackbar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebounce } from 'react-use';
import { createReadingRecord } from '../../../_actions/createReadingRecord';
import { CreateReadingRecordDto } from '@/api/reading_records/@types';
import { SearchBooksResponseDto, SearchBooksResultDto } from '@/api/search_books/@types';
import { searchBooks } from '@/app/reading_records/_actions/searchBooks';

export default function ReadingRecordCreate() {
  const [inputReadingRecord, setInputReadingRecord] = useState<CreateReadingRecordDto>({
    title: '',
    learnedContent: null,
    impression: null,
  });

  const updateInputReadingRecord = (params: Partial<CreateReadingRecordDto>) => {
    setInputReadingRecord({ ...inputReadingRecord, ...params });
  };

  const [inputSearchBooks, setInputSearchBooks] = useState<string>('');
  const [suggestions, setSuggestions] = useState<SearchBooksResponseDto>([]);

  useDebounce(
    async () => {
      if (!inputSearchBooks) return;

      const res = await searchBooks(inputSearchBooks);
      setSuggestions(res);
    },
    500,
    [inputSearchBooks],
  );

  const setBookInfo = (suggestion: SearchBooksResultDto) => {
    updateInputReadingRecord({ title: suggestion.title });
    setSuggestions([]);
  };

  const hundleSubmit = async () => {
    await createReadingRecord(inputReadingRecord);
    setSnackbarState(true);
  };

  const [snackbarState, setSnackbarState] = useState<boolean>(false);
  const router = useRouter();

  const handleClose = () => {
    setSnackbarState(false);
    router.push('/reading_records');
    router.refresh();
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
        message='saved successfully!!'
        key='topcenter'
        autoHideDuration={1200}
      />
      <div className='z-10 mt-16'>
        <div className='relative'>
          <label
            htmlFor='search-books'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            <span className='font-bold'>書籍検索</span>
          </label>
          <input
            id='search-books'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={inputSearchBooks}
            onChange={(e) => setInputSearchBooks(e.target.value)}
          />
          {!!suggestions.length && (
            <ul className='absolute bg-white w-full'>
              {suggestions.map((suggestion, i) => (
                <li key={i} onClick={() => setBookInfo(suggestion)}>
                  {suggestion.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='mt-8'>
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
