import aspida, { FetchConfig } from '@aspida/fetch';
import api from '@/api/reading_records/$api';

export const getReadingRecordApiClient = (options?: FetchConfig) => {
  const baseFetchConditions = {
    baseURL: process.env.BASE_API_URL,
    throwHttpErrors: true,
  };

  return api(aspida(fetch, { ...baseFetchConditions, ...options, ...{ cache: 'no-store' } }));
};
