import { NextResponse, type NextRequest } from 'next/server';

const needsAuthPath = ['/reading_records'];

const needsAuth = (path: string) =>
  needsAuthPath.some((pathPattern) => path.startsWith(pathPattern));

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  const hasCookies = request.cookies.has('token');

  // NOTE: 要認証ページで認証済みでなければログインページへ
  if (needsAuth(request.nextUrl.pathname) && !hasCookies) {
    return NextResponse.redirect(new URL('/sign_in', request.url));
  }
  // NOTE: トークンの有効期限切れの場合はログイン画面にリダイレクト
  if (response.status === 401) {
    return NextResponse.redirect(new URL('/sign_in', request.url));
  }
  // NOTE: TOPの向き先 認証済みの場合は読書記録一覧、そうでなければログイン画面へ
  if (request.nextUrl.pathname === '/') {
    if (hasCookies) {
      return NextResponse.redirect(new URL('/reading_records', request.url));
    }

    return NextResponse.redirect(new URL('/sign_in', request.url));
  }

  return response;
}

// NOTE: ビルドファイル, 画像最適化エンドポイント, ファビコン, 画像は対象外
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
