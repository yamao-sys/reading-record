import aspida from '@aspida/fetch';
import api from '@/api/reading_records/$api';
import { getAllCookies } from '@/lib/getAllCookies';

export const getReadingRecordApiClient = () => {
  const baseFetchConditions = {
    baseURL: process.env.BASE_API_URL,
    headers: {
      cookie: getAllCookies(),
    },
    throwHttpErrors: true,
  };

  return api(aspida(fetch, { ...baseFetchConditions, ...{ cache: 'no-store' } }));
};
