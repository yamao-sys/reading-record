import aspida from '@aspida/fetch';
import api from '@/api/auth/$api';

export const getAuthApiClient = () => {
  const baseFetchConditions = {
    baseURL: process.env.BASE_API_URL,
    throwHttpErrors: true,
  };

  return api(aspida(fetch, { ...baseFetchConditions, ...{ cache: 'no-store' } }));
};
