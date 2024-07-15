'use client';

import { useState } from 'react';
import { postValidateSignUp } from '../../../_actions/postValidateSignUp';
import { useSignUpContext } from '../../../_contexts/SignUpContext';
import { PhaseType } from '../../../sign_up/types';
import { SignUpBaseLayout } from '../SignUpBaseLayout';
import { BaseFormBox } from '@/components/atoms/BaseFormBox';
import { InputForm } from '@/components/atoms/InputForm';
import { SubmitButton } from '@/components/molecules/SubmitButton';
import { ValidationErrors } from '@/components/molecules/ValidationErrors';

type Props = {
  togglePhase: (newPhase: PhaseType) => void;
};

export const SignUpInput = ({ togglePhase }: Props) => {
  const {
    inputName,
    setInputName,
    inputEmail,
    setInputEmail,
    inputPassword,
    setInputPassword,
    inputPasswordConfirm,
    setInputPasswordConfirm,
  } = useSignUpContext();

  const [nameValidationErrors, setNameValidationErrors] = useState<String[]>([]);
  const [emailValidationErrors, setEmailValidationErrors] = useState<String[]>([]);
  const [passwordValidationErrors, setPasswordValidationErrors] = useState<String[]>([]);
  const [passwordConfirmValidationErrors, setPasswordConfirmValidationErrors] = useState<String[]>(
    [],
  );

  const handleChangeInputName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputName(e.target.value);

  const handleChangeInputEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputEmail(e.target.value);

  const handleChangeInputPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputPassword(e.target.value);

  const handleChangeInputPasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputPasswordConfirm(e.target.value);

  const handleMoveToConfirm = () => togglePhase('confirmation');

  const handleValidateSignUp = async () => {
    setNameValidationErrors([]);
    setEmailValidationErrors([]);
    setPasswordValidationErrors([]);
    setPasswordConfirmValidationErrors([]);

    try {
      const response = await postValidateSignUp({
        name: inputName,
        email: inputEmail,
        password: inputPassword,
        passwordConfirm: inputPasswordConfirm,
      });

      // バリデーションエラーがなければ、確認画面へ遷移
      if (Object.keys(response.errors).length === 0) {
        handleMoveToConfirm();
        return;
      }

      // NOTE: バリデーションエラーの格納と入力パスワードのリセット
      if (!!response.errors?.name) setNameValidationErrors(response.errors.name);
      if (!!response.errors?.email) setEmailValidationErrors(response.errors.email);
      if (!!response.errors?.password) setPasswordValidationErrors(response.errors.password);
      if (!!response.errors?.passwordConfirm)
        setPasswordConfirmValidationErrors(response.errors.passwordConfirm);
      setInputPassword('');
    } catch (error) {
      // TODO: エラーハンドリング
    }
  };

  return (
    <>
      <SignUpBaseLayout phase='form'>
        <BaseFormBox needsMargin={false}>
          <InputForm
            labelId='name'
            labelText='ユーザ名'
            value={inputName}
            onChange={handleChangeInputName}
          />
          {!!nameValidationErrors.length && <ValidationErrors messages={nameValidationErrors} />}
        </BaseFormBox>

        <BaseFormBox>
          <InputForm
            labelId='email'
            labelText='メールアドレス'
            value={inputEmail}
            onChange={handleChangeInputEmail}
          />
          {!!emailValidationErrors.length && <ValidationErrors messages={emailValidationErrors} />}
        </BaseFormBox>

        <BaseFormBox>
          <InputForm
            labelId='password'
            labelText='パスワード'
            type='password'
            value={inputPassword}
            onChange={handleChangeInputPassword}
          />
          {!!passwordValidationErrors.length && (
            <ValidationErrors messages={passwordValidationErrors} />
          )}
        </BaseFormBox>

        <BaseFormBox>
          <InputForm
            labelId='password-confirm'
            labelText='パスワード確認用'
            type='password'
            value={inputPasswordConfirm}
            onChange={handleChangeInputPasswordConfirm}
          />
          {!!passwordConfirmValidationErrors.length && (
            <ValidationErrors messages={passwordConfirmValidationErrors} />
          )}
        </BaseFormBox>

        <SubmitButton labelText='確認画面へ' color='green' onClick={handleValidateSignUp} />
      </SignUpBaseLayout>
    </>
  );
};
