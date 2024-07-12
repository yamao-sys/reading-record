import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_20ilnn } from './auth/signIn';
import type { Methods as Methods_1ybobht } from './auth/signUp';
import type { Methods as Methods_1hyhucz } from './auth/validateSignUp';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/auth/signIn';
  const PATH1 = '/auth/signUp';
  const PATH2 = '/auth/validateSignUp';
  const POST = 'POST';

  return {
    auth: {
      signIn: {
        /**
         * ログイン
         * @returns ログイン成功
         */
        post: (option: { body: Methods_20ilnn['post']['reqBody']; config?: T | undefined }) =>
          fetch<Methods_20ilnn['post']['resBody'], BasicHeaders, Methods_20ilnn['post']['status']>(
            prefix,
            PATH0,
            POST,
            option,
          ).json(),
        /**
         * ログイン
         * @returns ログイン成功
         */
        $post: (option: { body: Methods_20ilnn['post']['reqBody']; config?: T | undefined }) =>
          fetch<Methods_20ilnn['post']['resBody'], BasicHeaders, Methods_20ilnn['post']['status']>(
            prefix,
            PATH0,
            POST,
            option,
          )
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
      signUp: {
        /**
         * 会員登録実行
         * @returns 会員登録成功
         */
        post: (option: { body: Methods_1ybobht['post']['reqBody']; config?: T | undefined }) =>
          fetch<
            Methods_1ybobht['post']['resBody'],
            BasicHeaders,
            Methods_1ybobht['post']['status']
          >(prefix, PATH1, POST, option).json(),
        /**
         * 会員登録実行
         * @returns 会員登録成功
         */
        $post: (option: { body: Methods_1ybobht['post']['reqBody']; config?: T | undefined }) =>
          fetch<
            Methods_1ybobht['post']['resBody'],
            BasicHeaders,
            Methods_1ybobht['post']['status']
          >(prefix, PATH1, POST, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
      validateSignUp: {
        /**
         * 会員登録のバリデーションチェック
         * @returns バリデーションチェック成功
         */
        post: (option: { body: Methods_1hyhucz['post']['reqBody']; config?: T | undefined }) =>
          fetch<
            Methods_1hyhucz['post']['resBody'],
            BasicHeaders,
            Methods_1hyhucz['post']['status']
          >(prefix, PATH2, POST, option).json(),
        /**
         * 会員登録のバリデーションチェック
         * @returns バリデーションチェック成功
         */
        $post: (option: { body: Methods_1hyhucz['post']['reqBody']; config?: T | undefined }) =>
          fetch<
            Methods_1hyhucz['post']['resBody'],
            BasicHeaders,
            Methods_1hyhucz['post']['status']
          >(prefix, PATH2, POST, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH2}`,
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
