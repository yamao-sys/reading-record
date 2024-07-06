'use server';

import { getSearchBooksApiClient } from './getSearchBooksApiClient';

export async function searchBooks(keyword: string) {
  return await getSearchBooksApiClient().searchBooks.$get({
    query: { keyword },
  });
}
