import { Meta, StoryObj } from '@storybook/react';
import { SubmitButton } from '.';
import { fn } from '@storybook/test';

type Props = {
  labelText: string;
  color: 'green' | 'gray' | 'red';
  additionalStyle?: string;
} & JSX.IntrinsicElements['button'];
export default {
  title: 'molecules/SubmitButton/SubmitButton',
  component: SubmitButton,
  tags: ['autodocs'],
  args: {} as Props,
  // Add your own control here
} as Meta;

type Story = StoryObj<typeof SubmitButton>;

export const successSubmitButton: Story = {
  args: {
    labelText: '保存する',
    color: 'green',
    onClick: fn(),
  },
};

export const defaultSubmitButton: Story = {
  args: {
    labelText: '戻る',
    color: 'gray',
    onClick: fn(),
  },
};

export const dengerSubmitButton: Story = {
  args: {
    labelText: '削除する',
    color: 'red',
    onClick: fn(),
  },
};
