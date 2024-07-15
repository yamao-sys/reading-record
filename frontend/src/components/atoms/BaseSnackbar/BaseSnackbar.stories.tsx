import { Meta, StoryObj } from '@storybook/react';
import { BaseSnackbar } from '.';
import { fn } from '@storybook/test';

type Props = {
  open: boolean;
  onClose: () => void;
  message: string;
};

export default {
  title: 'atoms/BaseSnackbar/BaseSnackbar',
  component: BaseSnackbar,
  tags: ['autodocs'],
  args: {} as Props,
  // Add your own control here
} as Meta;

type Story = StoryObj<typeof BaseSnackbar>;

export const defaultFormBox: Story = {
  args: {
    open: true,
    onClose: fn(),
    message: 'default',
  },
};
