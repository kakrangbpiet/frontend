import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'components/common/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    borderRadius: { control: 'text' },
    isAnimated: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Primary: Story = {
  args: {
    width: 200,
    height: 20,
    isAnimated: true,
  },
};

export const Rectangle: Story = {
  args: {
    width: 300,
    height: 150,
    isAnimated: true,
  },
};

export const Circle: Story = {
  args: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    isAnimated: true,
  },
};

export const Card: Story = {
  render: (args) => (
    <div style={{ width: 300 }}>
      <Skeleton {...args} height={150} />
      <div style={{ marginTop: 8 }}>
        <Skeleton {...args} width="70%" height={20} />
      </div>
      <div style={{ marginTop: 8 }}>
        <Skeleton {...args} width="90%" height={16} />
      </div>
      <div style={{ marginTop: 8 }}>
        <Skeleton {...args} width="60%" height={16} />
      </div>
    </div>
  ),
};