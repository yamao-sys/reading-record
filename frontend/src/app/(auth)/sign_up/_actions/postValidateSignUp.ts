'use server';

import { getAuthApiClient } from '../../_actions/getAuthApiClient';
import { SignUpDto } from '@/api/auth/@types';

export const postValidateSignUp = async (data: SignUpDto) => {
  const client = getAuthApiClient();
  const response = await client.auth.validateSignUp.post({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    },
  });

  return { errors: response.body.errors };
};
