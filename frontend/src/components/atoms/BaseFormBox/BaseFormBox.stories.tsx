import { Meta, StoryObj } from '@storybook/react';
import { BaseFormBox } from '.';

type Props = {
  needsMargin?: boolean;
  children: React.ReactNode;
};

export default {
  title: 'atoms/BaseFormBox/BaseFormBox',
  component: BaseFormBox,
  tags: ['autodocs'],
  args: {} as Props,
  // Add your own control here
} as Meta;

type Story = StoryObj<typeof BaseFormBox>;

export const defaultFormBox: Story = {
  args: {
    children: <input type='text' />,
  },
};

export const includeMarginFormBox: Story = {
  args: {
    needsMargin: true,
    children: <input type='text' />,
  },
};
