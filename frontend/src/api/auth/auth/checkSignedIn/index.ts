/* eslint-disable */
import type * as Types from '../../@types';

export type Methods = {
  /** 認証済みかどうかをチェック */
  get: {
    status: 200;
    /** 認証済みかどうかチェック成功 */
    resBody: Types.CheckSignedInResponseDto;
  };
};
