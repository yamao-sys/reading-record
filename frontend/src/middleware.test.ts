/**
 * @jest-environment node
 */

import { NextResponse, NextRequest } from 'next/server';
import { middleware } from './middleware';
import * as CheckSignedIn from '@/app/_actions/checkSignedIn';

const redirectSpy = jest.spyOn(NextResponse, 'redirect');
const nextSpy = jest.spyOn(NextResponse, 'next');

jest.mock('@/app/_actions/checkSignedIn', () => {
  const checkSignedIn = jest.requireActual('@/app/_actions/checkSignedIn');
  return {
    __esModule: true,
    ...checkSignedIn,
  };
});
let checkSignedInSpy: jest.SpyInstance<unknown>;

const domain = 'http://localhost:3002';

describe('middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('認証不要ページ', () => {
    it('アクセスできること', async () => {
      const req = new NextRequest(`${domain}/sign_up`);
      await middleware(req);

      expect(nextSpy).toHaveBeenCalled();
    });
  });

  describe('要認証ページで認証済みでない場合', () => {
    beforeEach(() => {
      checkSignedInSpy = jest.spyOn(CheckSignedIn, 'checkSignedIn').mockResolvedValue(false);
    });

    describe('認証情報がない場合', () => {
      it('ログインページへリダイレクトされる', async () => {
        const req = new NextRequest(`${domain}/reading_records`);
        await middleware(req);

        expect(redirectSpy).toHaveBeenCalledWith(new URL('/sign_in', req.url));
      });
    });

    describe('認証情報が不適な(有効期限切れなどの)場合', () => {
      it('ログインページへリダイレクトされる', async () => {
        const req = new NextRequest(`${domain}/reading_records`, {
          headers: {
            cookie: 'token=dummy;',
          },
        });
        await middleware(req);

        expect(redirectSpy).toHaveBeenCalledWith(new URL('/sign_in', req.url));
      });
    });
  });

  describe('非認証済みでトップページへアクセスした場合', () => {
    beforeEach(() => {
      checkSignedInSpy = jest.spyOn(CheckSignedIn, 'checkSignedIn').mockResolvedValue(false);
    });

    it('ログイン画面にリダイレクトされる', async () => {
      const req = new NextRequest(`${domain}`);
      await middleware(req);

      expect(redirectSpy).toHaveBeenCalledWith(new URL('/sign_in', req.url));
    });
  });

  describe('要認証ページで認証情報がある場合', () => {
    describe('有効な場合', () => {
      beforeEach(() => {
        checkSignedInSpy = jest.spyOn(CheckSignedIn, 'checkSignedIn').mockResolvedValue(true);
      });

      it('指定のパスにアクセスできること', async () => {
        const req = new NextRequest(`${domain}/reading_records`, {
          headers: {
            cookie: 'token=dummy;',
          },
        });
        await middleware(req);

        expect(nextSpy).toHaveBeenCalled();
      });

      it('ルートページへのアクセスは読書記録一覧にリダイレクトされること', async () => {
        const req = new NextRequest(`${domain}`, {
          headers: {
            cookie: 'token=dummy;',
          },
        });
        await middleware(req);

        expect(redirectSpy).toHaveBeenCalledWith(new URL('/reading_records', req.url));
      });
    });
  });
});
