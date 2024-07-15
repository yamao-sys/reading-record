import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import * as PostSignIn from '../../../_actions/postSignIn';
import * as RedirectToTopPage from '../../../_actions/redirectToTopPage';
import SignInForm from '.';

// userのセットアップ
const user = userEvent.setup();

const push = jest.fn();
jest.mock('next/navigation', () => {
  const router = jest.requireActual('next/navigation');
  return {
    ...router,
    useRouter: () => {
      return {
        push,
      };
    },
  };
});

jest.mock('../../../_actions/postSignIn', () => {
  const postSignIn = jest.requireActual('../../../_actions/postSignIn');
  return {
    __esModule: true,
    ...postSignIn,
  };
});
let postSignInSpy: jest.SpyInstance<unknown>;

jest.mock('../../../_actions/redirectToTopPage', () => {
  const redirectToTopPage = jest.requireActual('../../../_actions/redirectToTopPage');
  return {
    __esModule: true,
    ...redirectToTopPage,
  };
});
let redirectToTopPageSpy: jest.SpyInstance<unknown>;

describe('(auth)/_components/organisms/SignInForm', () => {
  afterEach(() => {
    push.mockRestore();
  });

  it('フォームが表示されること', () => {
    render(<SignInForm />);

    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'ログインする' })).toBeInTheDocument();
  });

  describe('バリデーションエラーがない場合', () => {
    beforeEach(() => {
      postSignInSpy = jest.spyOn(PostSignIn, 'postSignIn').mockResolvedValue({ errors: [] });
      // mock化すると、never型で渡す必要があり、やむなく型キャストしている
      redirectToTopPageSpy = jest
        .spyOn(RedirectToTopPage, 'redirectToTopPage')
        .mockReturnValue(jest.fn() as never);
    });

    afterEach(() => {
      postSignInSpy.mockRestore();
      redirectToTopPageSpy.mockRestore();
    });

    it('確認画面へ遷移できる', async () => {
      render(<SignInForm />);

      // フォーム入力
      const emailInput = screen.getByLabelText('メールアドレス');
      await user.type(emailInput, 'test@example.com');

      const passwordInput = screen.getByLabelText('パスワード');
      await user.type(passwordInput, 'Passwor1');

      const submitButtonElement = screen.getByRole('button');
      await user.click(submitButtonElement);

      await waitFor(() => {
        expect(redirectToTopPageSpy).toHaveBeenCalled();
      });
    });
  });

  describe('バリデーションエラーがある場合', () => {
    beforeEach(() => {
      postSignInSpy = jest
        .spyOn(PostSignIn, 'postSignIn')
        .mockResolvedValue({ errors: ['メールアドレス、またはパスワードが異なります。'] });
      redirectToTopPageSpy = jest
        .spyOn(RedirectToTopPage, 'redirectToTopPage')
        .mockReturnValue(jest.fn() as never);
    });

    afterEach(() => {
      postSignInSpy.mockRestore();
      redirectToTopPageSpy.mockRestore();
    });

    it('確認画面へ遷移せず、パリデーションエラーが表示される', async () => {
      render(<SignInForm />);

      const submitButtonElement = screen.getByRole('button');
      await user.click(submitButtonElement);

      await waitFor(() => {
        expect(redirectToTopPageSpy).not.toHaveBeenCalled();
        expect(
          screen.getByText('メールアドレス、またはパスワードが異なります。'),
        ).toBeInTheDocument();
      });
    });
  });
});
