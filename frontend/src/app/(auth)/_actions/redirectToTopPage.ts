'use server';

import { redirect } from 'next/navigation';

export const redirectToTopPage = () => {
  // TODO: トップページのパスを定数化
  redirect('/reading_records');
};
