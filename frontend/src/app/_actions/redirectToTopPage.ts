'use server';

import { redirect } from 'next/navigation';

export const redirectToTopPage = () => {
  redirect('/');
};
