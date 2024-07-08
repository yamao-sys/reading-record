import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import * as PostSignUp from '../../../_actions/postSignUp';
import * as SignUpContext from '../../../_contexts/SignUpContext';
import { SignUpConfirmation } from '.';

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

jest.mock('../../../_actions/postSignUp', () => {
  const postSignUp = jest.requireActual('../../../_actions/postSignUp');
  return {
    __esModule: true,
    ...postSignUp,
  };
});
let postSignUpSpy: jest.SpyInstance<unknown>;

jest.mock('../../../_contexts/SignUpContext', () => {
  const signUpContext = jest.requireActual('../../../_contexts/SignUpContext');
  return {
    __esModule: true,
    ...signUpContext,
  };
});
let signUpContextSpy: jest.SpyInstance<unknown>;

describe('reading_records/_components/organisms/SignUpFormConfirm', () => {
  beforeEach(() => {
    signUpContextSpy = jest.spyOn(SignUpContext, 'useSignUpContext').mockReturnValue({
      inputName: 'test_name',
      setInputName: jest.fn(),
      inputEmail: 'test@example.com',
      setInputEmail: jest.fn(),
      inputPassword: 'Passwor1',
      setInputPassword: jest.fn(),
      inputPasswordConfirm: 'Passwor1',
      setInputPasswordConfirm: jest.fn(),
    });
  });

  afterEach(() => {
    signUpContextSpy.mockRestore();
  });

  it('フォームが表示されること', () => {
    render(<SignUpConfirmation />);

    expect(screen.getByText('test_name')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('********')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '入力へ戻る' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '登録する' })).toBeInTheDocument();
  });

  describe('サンクス画面への遷移', () => {
    beforeEach(() => {
      postSignUpSpy = jest.spyOn(PostSignUp, 'postSignUp').mockResolvedValue({ result: true });
    });

    it('サンクス画面へ遷移できる', () => {
      render(<SignUpConfirmation />);

      const submitButtonElement = screen.getByRole('button', { name: '登録する' });
      user.click(submitButtonElement);

      waitFor(() => {
        expect(push).toHaveBeenCalled();
      });
    });
  });

  describe('入力画面への遷移', () => {
    it('入力画面へ遷移できる', () => {
      render(<SignUpConfirmation />);

      const submitButtonElement = screen.getByRole('button', { name: '入力へ戻る' });
      user.click(submitButtonElement);

      waitFor(() => {
        expect(push).toHaveBeenCalled();
      });
    });
  });
});
