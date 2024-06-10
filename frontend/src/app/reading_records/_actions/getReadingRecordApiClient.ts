import aspida from '@aspida/fetch';
import api from '@/api/reading_records/$api';

export const getReadingRecordApiClient = () => {
  const baseFetchConditions = {
    baseURL: process.env.BASE_API_URL,
    throwHttpErrors: true,
  };

  return api(aspida(fetch, { ...baseFetchConditions, ...{ cache: 'no-store' } }));
};
