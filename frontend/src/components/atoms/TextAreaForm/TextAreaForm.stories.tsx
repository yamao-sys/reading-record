import { Meta, StoryObj } from '@storybook/react';
import { TextAreaForm } from '.';
import { fn } from '@storybook/test';

type Props = { labelText: string; labelId: string } & JSX.IntrinsicElements['textarea'];
export default {
  title: 'atoms/TextAreaForm/TextAreaForm',
  component: TextAreaForm,
  tags: ['autodocs'],
  args: {} as Props,
  // Add your own control here
} as Meta;

type Story = StoryObj<typeof TextAreaForm>;

export const defaultTextAreaForm: Story = {
  args: {
    labelId: 'default-textarea',
    labelText: 'デフォルト テキストエリア',
    value: 'default-textarea',
    onChange: fn(),
  },
};
