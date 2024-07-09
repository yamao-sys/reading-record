'use server';

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

  return { errors: response.body.errors };
};
