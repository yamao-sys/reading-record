/* eslint-disable */
/** 読書記録作成のrequest DTO */
export type SignUpDto = {
  name?: string | undefined;
  email: string;
  password: string;
  passwordConfirm: string;
};

/** 会員登録のバリデーションチェックのレスポンスDTO */
export type ValidateSignUpResponseDto = {
  errors: {
    name?: string[] | undefined;
    email?: string[] | undefined;
    password?: string[] | undefined;
    passwordConfirm?: string[] | undefined;
  };
};

/** 会員登録のレスポンスDTO */
export type SignUpResponseDto = {
  result: boolean;
};
