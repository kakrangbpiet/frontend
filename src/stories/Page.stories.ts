import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import Page from '../components/Layout/index';

const meta: Meta<typeof Page> = {
  title: 'Example/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Toolpad',
    headerLinks: [
      { to: '/', label: 'Dashboard' },
      { to: '/shop', label: 'Shop' },
      { to: '/analytics', label: 'Analytics' },
      { to: '/settings', label: 'Settings' },
    ],
    sidebarItems: [
      { to: '/', label: 'Dashboard' },
      { to: '/shop', label: 'Shop' },
      { to: '/analytics', label: 'Analytics' },
      { to: '/settings', label: 'Settings' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    title: 'Toolpad',
    headerLinks: [],
    sidebarItems: [],
  },
};

export const LoggedIn: Story = {
  args: {
    title: 'Toolpad',
    headerLinks: [
      { to: '/', label: 'Dashboard' },
      { to: '/shop', label: 'Shop' },
      { to: '/analytics', label: 'Analytics' },
      { to: '/settings', label: 'Settings' },
    ],
    sidebarItems: [
      { to: '/', label: 'Dashboard' },
      { to: '/shop', label: 'Shop' },
      { to: '/analytics', label: 'Analytics' },
      { to: '/settings', label: 'Settings' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /Log in/i });
    await expect(loginButton).toBeInTheDocument();
    await userEvent.click(loginButton);
    await expect(loginButton).not.toBeInTheDocument();

    const logoutButton = canvas.getByRole('button', { name: /Log out/i });
    await expect(logoutButton).toBeInTheDocument();
  },
};
