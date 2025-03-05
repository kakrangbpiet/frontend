import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Page from '../components/Layout/index';
import { HEADER_LINKS, navItems } from '../components/Layout/routes';
import styled from 'styled-components';

const DemoContent = styled.div`
  background-color: #121212;
  color: #A0A0A0;
  padding: 20px;
  min-height: calc(100vh - 64px);
`;

const meta: Meta<typeof Page> = {
  title: 'Layout/Page',
  component: Page,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Dashboard',
    headerLinks: HEADER_LINKS,
    sidebarItems: navItems,
    children: (
      <DemoContent>
        <h1 style={{ color: '#A0A0A0' }}>Dashboard</h1>
        <p>Welcome to the Toolpad dashboard. This is a sample content area.</p>
      </DemoContent>
    ),
    onSidebarToggle: undefined
  }
};

export const CollapsedSidebar: Story = {
  args: {
    ...Default.args,
    children: (
      <DemoContent>
        <h1 style={{ color: '#A0A0A0' }}>Dashboard</h1>
        <p>Sidebar is currently collapsed</p>
      </DemoContent>
    )
  }
};

export const EmptyState: Story = {
  args: {
    title: 'Toolpad',
    headerLinks: [],
    sidebarItems: [],
    children: (
      <DemoContent>
        <h1 style={{ color: '#A0A0A0' }}>Welcome</h1>
        <p>No items configured</p>
      </DemoContent>
    )
  }
};