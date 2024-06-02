import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_1y1mq94 } from './readingRecords';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/readingRecords';
  const GET = 'GET';
  const POST = 'POST';

  return {
    readingRecords: {
      /**
       * 読書記録の作成
       * @returns 読書記録の作成成功
       */
      post: (option: { body: Methods_1y1mq94['post']['reqBody']; config?: T | undefined }) =>
        fetch<Methods_1y1mq94['post']['resBody'], BasicHeaders, Methods_1y1mq94['post']['status']>(
          prefix,
          PATH0,
          POST,
          option,
        ).json(),
      /**
       * 読書記録の作成
       * @returns 読書記録の作成成功
       */
      $post: (option: { body: Methods_1y1mq94['post']['reqBody']; config?: T | undefined }) =>
        fetch<Methods_1y1mq94['post']['resBody'], BasicHeaders, Methods_1y1mq94['post']['status']>(
          prefix,
          PATH0,
          POST,
          option,
        )
          .json()
          .then((r) => r.body),
      /**
       * 読書記録の一覧取得
       * @returns 読書記録の一覧取得成功
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1y1mq94['get']['resBody'], BasicHeaders, Methods_1y1mq94['get']['status']>(
          prefix,
          PATH0,
          GET,
          option,
        ).json(),
      /**
       * 読書記録の一覧取得
       * @returns 読書記録の一覧取得成功
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1y1mq94['get']['resBody'], BasicHeaders, Methods_1y1mq94['get']['status']>(
          prefix,
          PATH0,
          GET,
          option,
        )
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
