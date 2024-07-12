/* eslint-disable */
import type * as Types from '../../@types';

export type Methods = {
  /** 会員登録のバリデーションチェック */
  post: {
    status: 201;
    /** バリデーションチェック成功 */
    resBody: Types.ValidateSignUpResponseDto;
    reqBody: Types.SignUpDto;
  };
};
