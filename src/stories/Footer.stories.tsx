import type { Meta, StoryObj } from '@storybook/react';
import Footer from '../components/Layout/Footer';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    companyName: { control: 'text' },
    showSocials: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    companyName: 'My PWA App',
    showSocials: true,
    variant: 'light',
  },
};

export const DarkVariant: Story = {
  args: {
    companyName: 'My PWA App',
    showSocials: true,
    variant: 'dark',
  },
};

export const WithoutSocials: Story = {
  args: {
    companyName: 'My PWA App',
    showSocials: false,
    variant: 'light',
  },
};

export const CustomBranding: Story = {
  args: {
    companyName: 'Acme Corporation',
    showSocials: true,
    variant: 'light',
  },
};
