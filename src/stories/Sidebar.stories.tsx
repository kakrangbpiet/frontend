// Sidebar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../components/Layout/Sidebar';
import React from 'react';
import { navItems } from '../components/Layout/routes';

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ height: '100vh', position: 'relative' }}>
          <Story />
        </div>
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
    items: navItems,
    isOpen: true,
  }
};

export const Collapsed: Story = {
  args: {
    items: navItems,
    isOpen: false,
  }
};

const InteractiveSidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Sidebar 
      items={navItems}
      isOpen={isOpen}
      onToggle={handleToggle}
    />
  );
};

export const Interactive: Story = {
  render: () => <InteractiveSidebar />
};