/* eslint-disable */
/** 書籍情報検索のレスポンスDTO */
export type SearchBooksResponseDto = {
  title: string;
  author: string;
  mediumImageUrl: string;
}[];

/** 書籍検索結果のDTO */
export type SearchBooksResultDto = {
  title: string;
  author: string;
  mediumImageUrl: string;
};
