import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputProps } from './input';

const meta: Meta<typeof Input> = {
  title: 'Example/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'text',
      description: 'The type of the input',
      defaultValue: 'text',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text for the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
  },
};

export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
    disabled: true,
  },
};

export const WithCustomClass: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
    className: 'custom-class',
  },
};
