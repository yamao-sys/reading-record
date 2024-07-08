'use client';

import { BaseLayout } from '../BaseLayout';

export const SignUpThanks = () => {
  return (
    <>
      <BaseLayout phase='thanks'>
        <div className='flex justify-center'>
          <div>会員登録が完了しました。</div>
          <div>ご登録いただきありがとうございます。</div>
        </div>
      </BaseLayout>
    </>
  );
};
