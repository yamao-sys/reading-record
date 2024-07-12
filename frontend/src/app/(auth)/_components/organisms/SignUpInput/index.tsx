'use client';

import { useState } from 'react';
import { postValidateSignUp } from '../../../_actions/postValidateSignUp';
import { useSignUpContext } from '../../../_contexts/SignUpContext';
import { PhaseType } from '../../../sign_up/types';
import { BaseLayout } from '../BaseLayout';

type Props = {
  togglePhase: (newPhase: PhaseType) => void;
};

export const SignUpInput = ({ togglePhase }: Props) => {
  const {
    inputName,
    setInputName,
    inputEmail,
    setInputEmail,
    inputPassword,
    setInputPassword,
    inputPasswordConfirm,
    setInputPasswordConfirm,
  } = useSignUpContext();

  const [nameValidationErrors, setNameValidationErrors] = useState<String[]>([]);
  const [emailValidationErrors, setEmailValidationErrors] = useState<String[]>([]);
  const [passwordValidationErrors, setPasswordValidationErrors] = useState<String[]>([]);
  const [passwordConfirmValidationErrors, setPasswordConfirmValidationErrors] = useState<String[]>(
    [],
  );

  const handleChangeInputName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputName(e.target.value);

  const handleChangeInputEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputEmail(e.target.value);

  const handleChangeInputPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputPassword(e.target.value);

  const handleChangeInputPasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputPasswordConfirm(e.target.value);

  const handleMoveToConfirm = () => togglePhase('confirmation');

  const handleValidateSignUp = async () => {
    setNameValidationErrors([]);
    setEmailValidationErrors([]);
    setPasswordValidationErrors([]);
    setPasswordConfirmValidationErrors([]);

    try {
      const response = await postValidateSignUp({
        name: inputName,
        email: inputEmail,
        password: inputPassword,
        passwordConfirm: inputPasswordConfirm,
      });

      // バリデーションエラーがなければ、確認画面へ遷移
      if (Object.keys(response.errors).length === 0) {
        handleMoveToConfirm();
        return;
      }

      // NOTE: バリデーションエラーの格納と入力パスワードのリセット
      if (!!response.errors?.name) setNameValidationErrors(response.errors.name);
      if (!!response.errors?.email) setEmailValidationErrors(response.errors.email);
      if (!!response.errors?.password) setPasswordValidationErrors(response.errors.password);
      if (!!response.errors?.passwordConfirm)
        setPasswordConfirmValidationErrors(response.errors.passwordConfirm);
      setInputPassword('');
    } catch (error) {
      // TODO: エラーハンドリング
    }
  };

  return (
    <>
      <BaseLayout phase='form'>
        <div>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            <span className='font-bold'>ユーザ名</span>
          </label>
          <input
            id='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={inputName}
            onChange={handleChangeInputName}
          />
          {!!nameValidationErrors.length && (
            <div className='w-full pt-5'>
              {nameValidationErrors.map((message, i) => (
                <p key={i} className='text-red-400'>
                  {message}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className='mt-8'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            <span className='font-bold'>メールアドレス</span>
          </label>
          <input
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={inputEmail}
            onChange={handleChangeInputEmail}
          />
          {!!emailValidationErrors.length && (
            <div className='w-full pt-5'>
              {emailValidationErrors.map((message, i) => (
                <p key={i} className='text-red-400'>
                  {message}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className='mt-8'>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            <span className='font-bold'>パスワード</span>
          </label>
          <input
            id='password'
            type='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={inputPassword}
            onChange={handleChangeInputPassword}
          />
          {!!passwordValidationErrors.length && (
            <div className='w-full pt-5'>
              {passwordValidationErrors.map((message, i) => (
                <p key={i} className='text-red-400'>
                  {message}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className='mt-8'>
          <label
            htmlFor='password_confirm'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            <span className='font-bold'>パスワード確認用</span>
          </label>
          <input
            id='password_confirm'
            type='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={inputPasswordConfirm}
            onChange={handleChangeInputPasswordConfirm}
          />
          {!!passwordConfirmValidationErrors.length && (
            <div className='w-full pt-5'>
              {passwordConfirmValidationErrors.map((message, i) => (
                <p key={i} className='text-red-400'>
                  {message}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className='w-full flex justify-center'>
          <div className='mt-16'>
            <button
              className='py-2 px-8 border-green-500 bg-green-500 rounded-xl text-white'
              onClick={handleValidateSignUp}
            >
              確認画面へ
            </button>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};
