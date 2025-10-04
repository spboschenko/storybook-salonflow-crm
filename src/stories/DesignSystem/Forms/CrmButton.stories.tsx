import type { Meta, StoryObj } from '@storybook/react';
import { CrmButton } from '../../../components/CrmButton/CrmButton';

const meta: Meta<typeof CrmButton> = {
  title: 'Design System/Forms/CrmButton',
  component: CrmButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};
