import type { Meta, StoryObj } from '@storybook/react';
import Header from '../components/Layout/Header';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Dashboard',
    links: [
      { to: '/', label: 'Dashboard' },
      { to: '/shop', label: 'Shop' },
      { to: '/analytics', label: 'Analytics' },
      { to: '/settings', label: 'Settings' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const index: Story = {
  args: {
    title: 'Dashboard',
    links: [],
  },
};
