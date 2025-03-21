// /components/Card/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../common/Button';

const meta: Meta<typeof Card> = {
  title: 'components/common/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: <p>This is a card component with customizable properties.</p>,
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    title: 'Card Title',
    variant: 'default',
    padding: 'medium',
    borderRadius: 'medium',
  },
};

export const Outlined: Story = {
  args: {
    title: 'Outlined Card',
    variant: 'outlined',
    children: <p>This card has an outlined style with a border.</p>,
  },
};

export const Elevated: Story = {
  args: {
    title: 'Elevated Card',
    variant: 'elevated',
    children: <p>This card has an elevated style with a shadow.</p>,
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
    children: <p>This card includes a footer with actions.</p>,
    footer: (
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <Button label="Cancel" variant="secondary" onClick={() => {}} size="small" />
        <Button label="Save" variant="primary" onClick={() => {}} size="small" />
      </div>
    ),
  },
};

export const LoadingState: Story = {
  args: {
    title: 'Loading Card',
    children: <p>This content will not be visible while loading.</p>,
    footer: <Button label="Action" onClick={() => {}} />,
    isLoading: true,
  },
};

export const NoTitle: Story = {
  args: {
    children: <p>This card has no title, only content.</p>,
  },
};

export const CustomPadding: Story = {
  args: {
    title: 'Custom Padding',
    padding: 'large',
    children: <p>This card has large padding.</p>,
  },
};

export const ResponsiveCard: Story = {
  args: {
    title: 'Responsive Card',
    children: <p>This card adjusts its styling on smaller screens.</p>,
    footer: <Button label="Action" onClick={() => {}} fullWidth={true} />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};