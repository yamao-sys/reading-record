'use client';

import { useState } from 'react';
import { postSignIn } from '../../../_actions/postSignIn';
import { redirectToTopPage } from '../../../_actions/redirectToTopPage';

export default function SignInForm() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<String[]>([]);

  const handleChangeInputEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputEmail(e.target.value);
  const handleChangeInputPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputPassword(e.target.value);

  const handleSignIn = async () => {
    setValidationErrors([]);

    try {
      const response = await postSignIn({
        email: inputEmail,
        password: inputPassword,
      });

      if (!!response?.errors.length) {
        setValidationErrors(response.errors);
        setInputPassword('');
      } else {
        redirectToTopPage();
      }
    } catch (error) {
      // TODO: エラーハンドリング
    }
  };

  return (
    <>
      <div className='p-4 md:p-16'>
        <div className='md:w-3/5 mx-auto'>
          <p className='text-center md:text-3xl mb-16'>ログイン</p>

          {!!validationErrors.length && (
            <div className='w-full pt-5'>
              {validationErrors.map((message, i) => (
                <p key={i} className='text-red-400'>
                  {message}
                </p>
              ))}
            </div>
          )}
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
          </div>

          <div className='w-full flex justify-center'>
            <div className='mt-16'>
              <button
                className='py-2 px-8 border-green-500 bg-green-500 rounded-xl text-white'
                onClick={handleSignIn}
              >
                ログインする
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
