import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import * as PostValidateSignUp from '../../../_actions/postValidateSignUp';
import * as SignUpContext from '../../../_contexts/SignUpContext';
import { SignUpInput } from '.';

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

jest.mock('../../../_actions/postValidateSignUp', () => {
  const postValidateSignUp = jest.requireActual('../../../_actions/postValidateSignUp');
  return {
    __esModule: true,
    ...postValidateSignUp,
  };
});
let postValidateSignUpSpy: jest.SpyInstance<unknown>;

jest.mock('../../../_contexts/SignUpContext', () => {
  const signUpContext = jest.requireActual('../../../_contexts/SignUpContext');
  return {
    __esModule: true,
    ...signUpContext,
  };
});
let signUpContextSpy: jest.SpyInstance<unknown>;

const togglePhase = jest.fn();

describe('reading_records/_components/organisms/SignUpInput', () => {
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
    render(<SignUpInput togglePhase={togglePhase} />);

    expect(screen.getByLabelText('ユーザ名')).toHaveDisplayValue('test_name');
    expect(screen.getByLabelText('メールアドレス')).toHaveDisplayValue('test@example.com');
    expect(screen.getByLabelText('パスワード')).toHaveDisplayValue('Passwor1');
    expect(screen.getByLabelText('パスワード確認用')).toHaveDisplayValue('Passwor1');

    expect(screen.getByRole('button', { name: '確認画面へ' })).toBeInTheDocument();
  });

  describe('バリデーションエラーがない場合', () => {
    beforeEach(() => {
      postValidateSignUpSpy = jest
        .spyOn(PostValidateSignUp, 'postValidateSignUp')
        .mockResolvedValue({ errors: {} });
    });

    it('確認画面へ遷移できる', () => {
      render(<SignUpInput togglePhase={togglePhase} />);

      const submitButtonElement = screen.getByRole('button');
      user.click(submitButtonElement);

      waitFor(() => {
        expect(togglePhase).toHaveBeenCalled();
      });
    });
  });

  describe('バリデーションエラーがある場合', () => {
    beforeEach(() => {
      signUpContextSpy = jest.spyOn(SignUpContext, 'useSignUpContext').mockReturnValue({
        inputName: '',
        setInputName: jest.fn(),
        inputEmail: '',
        setInputEmail: jest.fn(),
        inputPassword: '',
        setInputPassword: jest.fn(),
        inputPasswordConfirm: '',
        setInputPasswordConfirm: jest.fn(),
      });
      postValidateSignUpSpy = jest
        .spyOn(PostValidateSignUp, 'postValidateSignUp')
        .mockResolvedValue({
          errors: {
            name: ['ユーザ名は必須です。'],
            email: [
              'メールアドレスは必須です。',
              'メールアドレスの形式はxxx@example.comでお願いします。',
            ],
            password: [
              'パスワードは必須です。',
              'パスワードは8文字以上20文字以内で入力をお願いします。',
              'パスワードは半角英数字の大文字・小文字・数字をそれぞれ最低1文字で入力をお願いします。',
            ],
            passwordConfirm: ['パスワード確認用は必須です。'],
          },
        });
    });

    it('確認画面へ遷移せず、パリデーションエラーが表示される', () => {
      render(<SignUpInput togglePhase={togglePhase} />);

      const submitButtonElement = screen.getByRole('button');
      user.click(submitButtonElement);

      waitFor(() => {
        expect(togglePhase).not.toHaveBeenCalled();

        // ユーザ名
        expect(screen.getByText('ユーザ名は必須です。')).toBeInTheDocument();

        // メールアドレス
        expect(screen.getByText('メールアドレスは必須です。')).toBeInTheDocument();
        expect(
          screen.getByText('メールアドレスの形式はxxx@example.comでお願いします。'),
        ).toBeInTheDocument();

        // パスワード
        expect(screen.getByText('パスワードは必須です。')).toBeInTheDocument();
        expect(
          screen.getByText('パスワードは8文字以上20文字以内で入力をお願いします。'),
        ).toBeInTheDocument();
        expect(
          screen.getByText(
            'パスワードは半角英数字の大文字・小文字・数字をそれぞれ最低1文字で入力をお願いします。',
          ),
        ).toBeInTheDocument();

        // パスワード確認用
        expect(screen.getByText('パスワード確認用は必須です。')).toBeInTheDocument();
      });
    });
  });
});
