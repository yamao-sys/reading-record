'use server';

import { getSearchBooksApiClient } from './getSearchBooksApiClient';

export async function searchBooks(keyword: string) {
  'use server';

  return await getSearchBooksApiClient().searchBooks.$get({
    query: { keyword },
  });
}
