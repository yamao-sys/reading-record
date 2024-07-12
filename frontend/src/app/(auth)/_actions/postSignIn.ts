'use server';

import { cookies } from 'next/headers';
import { getAuthApiClient } from './getAuthApiClient';
import { SignInDto } from '@/api/auth/@types';

export const postSignIn = async (data: SignInDto) => {
  const client = getAuthApiClient();
  const response = await client.auth.signIn.post({
    body: {
      email: data.email,
      password: data.password,
    },
  });

  if (!!response.body.errors.length) {
    return { errors: response.body.errors };
  } else {
    const token = response.headers['set-cookie'].split(';')[0].split('=')[1];
    cookies().set('token', token, { secure: true, sameSite: 'none' });
  }
};
