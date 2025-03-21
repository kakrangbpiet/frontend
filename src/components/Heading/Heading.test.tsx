// Heading.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';

describe('Heading Component', () => {
  test('renders with default props', () => {
    render(<Heading>Hello World</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Hello World');
  });

  test('renders with custom heading level', () => {
    render(<Heading level={3}>Hello World</Heading>);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
  });

  test('applies custom ID', () => {
    render(<Heading id="custom-id">Hello World</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveAttribute('id', 'custom-id');
  });

  test('applies custom className', () => {
    render(<Heading className="custom-class">Hello World</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('custom-class');
  });

  test('applies custom style', () => {
    render(<Heading style={{ color: 'red' }}>Hello World</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveStyle('color: red');
  });

  test('renders with different variations', () => {
    const { rerender } = render(<Heading variation="error">Error Text</Heading>);
    let heading = screen.getByRole('heading');
    expect(heading).toHaveClass('error');

    rerender(<Heading variation="warning">Warning Text</Heading>);
    heading = screen.getByRole('heading');
    expect(heading).toHaveClass('warning');
  });
});