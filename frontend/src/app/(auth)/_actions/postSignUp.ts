'use server';

import { getAuthApiClient } from './getAuthApiClient';
import { SignUpDto } from '@/api/auth/@types';

export const postSignUp = async (data: SignUpDto) => {
  const client = getAuthApiClient();
  const response = await client.auth.signUp.post({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    },
  });

  return { result: response.body.result };
};
