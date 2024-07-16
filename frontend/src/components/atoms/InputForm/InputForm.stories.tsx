import { Meta, StoryObj } from '@storybook/react';
import { InputForm } from '.';
import { fn } from '@storybook/test';

type Props = { labelText: string; labelId: string } & JSX.IntrinsicElements['input'];
export default {
  title: 'atoms/InputForm/InputForm',
  component: InputForm,
  tags: ['autodocs'],
  args: {} as Props,
} as unknown as Meta;

type Story = StoryObj<typeof InputForm>;

export const emailInputForm: Story = {
  args: {
    labelId: 'email',
    labelText: 'メールアドレス',
    value: 'test@example.com',
    onChange: fn(),
  },
};

export const passwordInputForm: Story = {
  args: {
    labelId: 'password',
    labelText: 'パスワード',
    type: 'password',
    value: 'password',
    onChange: fn(),
  },
};

export const textInputForm: Story = {
  args: {
    labelId: 'title',
    labelText: 'タイトル',
    value: 'title',
    onChange: fn(),
  },
};
