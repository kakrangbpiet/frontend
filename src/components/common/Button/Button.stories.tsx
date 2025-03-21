// /components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './index';

// Example icons (using simple spans for demo purposes)
// In a real application, you might import icons from a library like 'react-icons', 'lucide-react', etc.
const ArrowIcon = () => <span style={{ fontSize: '14px' }}>→</span>;
const StarIcon = () => <span style={{ fontSize: '14px' }}>★</span>;
const PlusIcon = () => <span style={{ fontSize: '14px' }}>+</span>;
const DownloadIcon = () => <span style={{ fontSize: '14px' }}>↓</span>;

const meta: Meta<typeof Button> = {
  title: 'components/common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    isLoading: { 
      control: 'boolean',
      description: 'Shows loading state'
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Position of the icon relative to the label'
    },
    iconSpacing: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
      description: 'Space between icon and label'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button'
    }
  },
  args: { 
    label: 'Click Me',
    onClick: fn(),
    isLoading: false,
    disabled: false,
    iconSpacing: 8
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

// Button with icons in different positions
export const WithLeftIcon: Story = {
  args: {
    primary: true,
    label: 'Next',
    icon: <ArrowIcon />,
    iconPosition: 'right',
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Download',
    icon: <DownloadIcon />,
    iconPosition: 'right',
  },
};

export const WithTopIcon: Story = {
  args: {
    primary: true,
    label: 'Favorite',
    icon: <StarIcon />,
    iconPosition: 'top',
    iconSpacing: 12,
  },
};

export const WithBottomIcon: Story = {
  args: {
    label: 'Add Item',
    icon: <PlusIcon />,
    iconPosition: 'bottom',
    iconSpacing: 12,
  },
};

// Different sizes with icons
export const SmallWithIcon: Story = {
  args: {
    size: 'small',
    label: 'Small',
    icon: <ArrowIcon />,
    iconPosition: 'right',
  },
};

export const MediumWithIcon: Story = {
  args: {
    size: 'medium',
    label: 'Medium',
    icon: <ArrowIcon />,
    iconPosition: 'right',
  },
};

export const LargeWithIcon: Story = {
  args: {
    size: 'large',
    label: 'Large',
    icon: <ArrowIcon />,
    iconPosition: 'right',
  },
};

// Disabled state
export const DisabledWithIcon: Story = {
  args: {
    primary: true,
    label: 'Disabled',
    icon: <PlusIcon />,
    iconPosition: 'left',
    disabled: true,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    label: 'Loading...',
    isLoading: true,
    iconSpacing: 21,
    backgroundColor: "#f30808"
  },
};