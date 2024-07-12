'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

type SignUpContextType = {
  inputName: string;
  setInputName: Dispatch<SetStateAction<string>>;
  inputEmail: string;
  setInputEmail: Dispatch<SetStateAction<string>>;
  inputPassword: string;
  setInputPassword: Dispatch<SetStateAction<string>>;
  inputPasswordConfirm: string;
  setInputPasswordConfirm: Dispatch<SetStateAction<string>>;
};

const SignUpContext = createContext({} as SignUpContextType);

type Props = {
  children: ReactNode;
};

export const SignUpProvider = ({ children }: Props) => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState('');

  return (
    <SignUpContext.Provider
      value={{
        inputName,
        setInputName,
        inputEmail,
        setInputEmail,
        inputPassword,
        setInputPassword,
        inputPasswordConfirm,
        setInputPasswordConfirm,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUpContext = () => useContext(SignUpContext);
