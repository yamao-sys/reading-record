/* eslint-disable */
/** 読書記録のDTO */
export type ReadingRecordDto = {
  title: string;
  learnedContent: string | null;
  impression: string | null;
};

/** 読書記録作成のrequest DTO */
export type CreateReadingRecordDto = {
  title: string;
  learnedContent?: string | null | undefined;
  impression?: string | null | undefined;
};

/** 読書記録の作成のレスポンスDTO */
export type CreateReadingRecordResponseDto = {
  /** 読書記録のDTO */
  readingRecord: {
    title: string;
    learnedContent: string | null;
    impression: string | null;
  };
};

/** 読書記録の作成のレスポンスDTO */
export type FetchAllReadingRecordResponseDto = {
  title: string;
  learnedContent: string | null;
  impression: string | null;
}[];
