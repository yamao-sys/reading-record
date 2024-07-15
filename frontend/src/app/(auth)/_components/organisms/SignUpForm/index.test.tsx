import { render, screen } from '@testing-library/react';
import * as SignUpContext from '../../../_contexts/SignUpContext';
import { SignUpForm } from '.';

jest.mock('../../../_contexts/SignUpContext', () => {
  const signUpContext = jest.requireActual('../../../_contexts/SignUpContext');
  return {
    __esModule: true,
    ...signUpContext,
  };
});
let signUpContextSpy: jest.SpyInstance<unknown>;

describe('(auth)/_components/organisms/SignUpInput', () => {
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

  describe('入力画面', () => {
    it('入力画面が表示できること', () => {
      render(<SignUpForm />);

      expect(screen.getByLabelText('ユーザ名')).toHaveDisplayValue('test_name');
      expect(screen.getByLabelText('メールアドレス')).toHaveDisplayValue('test@example.com');
      expect(screen.getByLabelText('パスワード')).toHaveDisplayValue('Passwor1');
      expect(screen.getByLabelText('パスワード確認用')).toHaveDisplayValue('Passwor1');

      expect(screen.getByRole('button', { name: '確認画面へ' })).toBeInTheDocument();
    });
  });
});
