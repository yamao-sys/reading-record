import { Meta, StoryObj } from '@storybook/react';
import { BaseFormBox } from '.';
import { InputForm } from '../InputForm';

type Props = {
  needsMargin?: boolean;
  children: React.ReactNode;
};

export default {
  title: 'atoms/BaseFormBox/BaseFormBox',
  component: BaseFormBox,
  tags: ['autodocs'],
  args: {} as Props,
} as Meta;

type Story = StoryObj<typeof BaseFormBox>;

export const defaultFormBox: Story = {
  args: {
    children: (
      <InputForm
        labelId='email'
        labelText='メールアドレス'
        value='test@example.com'
        onChange={() => console.log('test')}
      />
    ),
  },
};

export const includeMarginFormBox: Story = {
  args: {
    needsMargin: true,
    children: (
      <InputForm
        labelId='email'
        labelText='メールアドレス'
        value='test@example.com'
        onChange={() => console.log('test')}
      />
    ),
  },
};
