'use client';

import { HTTPError } from '@aspida/fetch';
import { redirectToTopPage } from './_actions/redirectToTopPage';

type Props = {
  error: (HTTPError | Error) & { digest?: string };
};

const ErrorPage = ({ error }: Props) => {
  const handleBackToTopPage = () => redirectToTopPage();

  return (
    <>
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='font-bold'>500 Error</div>
        <div className='font-bold'>{error.message}</div>
        <div className='mt-2'>
          <button
            className='p-2 border-gray-500 bg-gray-500 rounded-xl text-white text-xs lg:text-sm'
            onClick={handleBackToTopPage}
          >
            TOPへ戻る
          </button>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
