'use client';

import { HTTPError } from '@aspida/fetch';
import { redirectToTopPage } from './_actions/redirectToTopPage';
import { BaseButton } from '@/components/atoms/BaseButton';

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
          <BaseButton labelText='TOPへ戻る' color='gray' onClick={handleBackToTopPage} />
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
