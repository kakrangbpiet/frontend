import type { Meta, StoryObj } from '@storybook/react';
import Header from '../components/Layout/Sidebar';

const meta: Meta<typeof Header> = {
  title: 'Layout/sidebar',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: '',
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
    title: 'Toolpad',
    links: [],
  },
};
