'use client';

import { postSignUp } from '../../../_actions/postSignUp';
import { useSignUpContext } from '../../../_contexts/SignUpContext';
import { PhaseType } from '../../../sign_up/types';
import { SignUpBaseLayout } from '../SignUpBaseLayout';
import { BaseButton } from '@/components/atoms/BaseButton';

type Props = {
  togglePhase: (newPhase: PhaseType) => void;
};

export const SignUpConfirmation = ({ togglePhase }: Props) => {
  const { inputName, inputEmail, inputPassword, inputPasswordConfirm } = useSignUpContext();

  const handleBackPage = () => togglePhase('input');

  const handleSignUp = async () => {
    try {
      await postSignUp({
        name: inputName,
        email: inputEmail,
        password: inputPassword,
        passwordConfirm: inputPasswordConfirm,
      });
      togglePhase('thanks');
    } catch (error) {
      // TODO: エラーハンドリング
    }
  };

  return (
    <>
      <SignUpBaseLayout phase='confirm'>
        <div className='flex w-full justify-around'>
          <div className='w-1/2 align-middle'>ユーザ名: </div>
          <div className='w-1/2 align-middle'>{inputName}</div>
        </div>
        <div className='flex w-full justify-around mt-8'>
          <div className='w-1/2 align-middle'>メールアドレス: </div>
          <div className='w-1/2 align-middle'>{inputEmail}</div>
        </div>
        <div className='flex w-full justify-around mt-8'>
          <div className='w-1/2 align-middle'>パスワード: </div>
          <div className='w-1/2 align-middle'>{'*'.repeat(inputPassword.length)}</div>
        </div>
        <div className='flex w-full justify-around mt-16'>
          <BaseButton labelText='入力へ戻る' color='gray' onClick={handleBackPage} />
          <BaseButton labelText='登録する' color='green' onClick={handleSignUp} />
        </div>
      </SignUpBaseLayout>
    </>
  );
};
