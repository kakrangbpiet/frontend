import type { Meta, StoryObj } from '@storybook/react';
import Tooltip, { TooltipProps } from '../components/Layout/Tooltip';

// Explicitly specify the generic type for Meta to avoid type conflicts
const meta: Meta<TooltipProps> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    position: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
    },
    variant: {
      control: { type: 'select' },
      options: ['light', 'dark', 'info', 'warning', 'error'],
    },
    delay: { control: 'number' },
    showArrow: { control: 'boolean' },
    maxWidth: { control: 'number' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'top',
    variant: 'dark',
    delay: 300,
    showArrow: true,
    maxWidth: 250,
    disabled: false,
    children: <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Hover Me</button>,
  },
};

export const Light: Story = {
  args: {
    content: 'Light variant tooltip',
    variant: 'light',
    children: <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Light</button>,
  },
};

export const Dark: Story = {
  args: {
    content: 'Dark variant tooltip',
    variant: 'dark',
    children: <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">Dark</button>,
  },
};

export const Info: Story = {
  args: {
    content: 'Information tooltip',
    variant: 'info',
    children: <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Info</button>,
  },
};

export const Warning: Story = {
  args: {
    content: 'Warning message',
    variant: 'warning',
    children: <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">Warning</button>,
  },
};

export const Error: Story = {
  args: {
    content: 'Error notification',
    variant: 'error',
    children: <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Error</button>,
  },
};

export const PositionTop: Story = {
  args: {
    content: 'Tooltip on top',
    position: 'top',
    children: <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Top</button>,
  },
};

export const PositionRight: Story = {
  args: {
    content: 'Tooltip on right',
    position: 'right',
    children: <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Right</button>,
  },
};

export const PositionBottom: Story = {
  args: {
    content: 'Tooltip on bottom',
    position: 'bottom',
    children: <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Bottom</button>,
  },
};

export const PositionLeft: Story = {
  args: {
    content: 'Tooltip on left',
    position: 'left',
    children: <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Left</button>,
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <div>
        <h4 className="font-bold mb-1">Rich Content</h4>
        <p>Tooltips can contain <span className="text-yellow-400">formatted content</span>!</p>
      </div>
    ),
    position: 'top',
    variant: 'dark',
    maxWidth: 300,
    children: <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Rich Content</button>,
  },
};

export const WithoutArrow: Story = {
  args: {
    content: 'This tooltip does not have an arrow',
    position: 'top',
    showArrow: false,
    children: <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">No Arrow</button>,
  },
};

export const Delayed: Story = {
  args: {
    content: 'This tooltip appears after 1 second',
    delay: 1000,
    children: <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Delayed (1s)</button>,
  },
};