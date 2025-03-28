
// import { Meta, StoryObj } from '@storybook/react';
// import { Heading } from './Heading';

// const meta: Meta<typeof Heading> = {
//   title: 'Components/Heading',
//   component: Heading,
//   tags: ['autodocs'],
//   argTypes: {
//     level: {
//       control: { type: 'select' },
//       options: [1, 2, 3, 4, 5, 6],
//     },
//     variation: {
//       control: { type: 'select' },
//       options: ['primary', 'secondary', 'error', 'warning', 'success', 'info'],
//     },
//   },
// };

// export default meta;
// type Story = StoryObj<typeof Heading>;

// export const Primary: Story = {
//   args: {
//     children: 'Primary Heading',
//     level: 1,
//     variation: 'primary',
//   },
// };

// export const Secondary: Story = {
//   args: {
//     children: 'Secondary Heading',
//     level: 2,
//     variation: 'secondary',
//   },
// };

// export const Error: Story = {
//   args: {
//     children: 'Error Heading',
//     level: 3,
//     variation: 'error',
//   },
// };

// export const AllLevels: Story = {
//   render: (args) => (
//     <div>
//       <Heading {...args} level={1}>Heading Level 1</Heading>
//       <Heading {...args} level={2}>Heading Level 2</Heading>
//       <Heading {...args} level={3}>Heading Level 3</Heading>
//       <Heading {...args} level={4}>Heading Level 4</Heading>
//       <Heading {...args} level={5}>Heading Level 5</Heading>
//       <Heading {...args} level={6}>Heading Level 6</Heading>
//     </div>
//   ),
// };

// export const AllVariations: Story = {
//   render: (args) => (
//     <div>
//       <Heading {...args} variation="primary">Primary Heading</Heading>
//       <Heading {...args} variation="secondary">Secondary Heading</Heading>
//       <Heading {...args} variation="error">Error Heading</Heading>
//       <Heading {...args} variation="warning">Warning Heading</Heading>
//       <Heading {...args} variation="success">Success Heading</Heading>
//       <Heading {...args} variation="info">Info Heading</Heading>
//     </div>
//   ),
// };