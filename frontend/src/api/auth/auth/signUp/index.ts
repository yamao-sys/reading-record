/* eslint-disable */
import type * as Types from '../../@types';

export type Methods = {
  /** 会員登録実行 */
  post: {
    status: 201;
    /** 会員登録成功 */
    resBody: Types.SignUpResponseDto;
    reqBody: Types.SignUpDto;
  };
};
