'use server';

import aspida from '@aspida/fetch';
import api from '@/api/auth/$api';
import { getAllCookies } from '@/lib/getAllCookies';

export const checkSignedIn = async () => {
  const baseFetchConditions = {
    baseURL: process.env.BASE_API_URL,
    headers: {
      cookie: getAllCookies(),
    },
    throwHttpErrors: true,
  };

  const authApiClient = api(aspida(fetch, { ...baseFetchConditions, ...{ cache: 'no-store' } }));
  return await authApiClient.auth.checkSignedIn.$get();
};
