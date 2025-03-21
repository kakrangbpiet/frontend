// /components/Button/Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './index';

// Simple test icon
const TestIcon = () => <span data-testid="test-icon">Icon</span>;

describe('Button', () => {
  it('renders the button with label', () => {
    render(<Button label="Test Button" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders icon in left position by default', () => {
    const { container } = render(<Button label="Button with Icon" icon={<TestIcon />} />);
    const flexContainer = container.querySelector('div');
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    // First child should be the icon
    expect(flexContainer?.firstChild).toContainHTML('test-icon');
  });

  it('renders icon in right position', () => {
    const { container } = render(
      <Button label="Button with Icon" icon={<TestIcon />} iconPosition="right" />
    );
    const flexContainer = container.querySelector('div');
    
    // Last child should be the icon
    expect(flexContainer?.lastChild).toContainHTML('test-icon');
  });

  it('renders icon in top position', () => {
    const { container } = render(
      <Button label="Button with Icon" icon={<TestIcon />} iconPosition="top" />
    );
    const flexContainer = container.querySelector('div');
    
    // First child should be the icon
    expect(flexContainer?.firstChild).toContainHTML('test-icon');
    // Container should have column flex direction
    expect(flexContainer).toHaveStyle('flex-direction: column');
  });

  it('renders icon in bottom position', () => {
    const { container } = render(
      <Button label="Button with Icon" icon={<TestIcon />} iconPosition="bottom" />
    );
    const flexContainer = container.querySelector('div');
    
    // Last child should be the icon
    expect(flexContainer?.lastChild).toContainHTML('test-icon');
    // Container should have column flex direction
    expect(flexContainer).toHaveStyle('flex-direction: column');
  });

  it('respects icon spacing', () => {
    const { container } = render(
      <Button label="Button with Icon" icon={<TestIcon />} iconSpacing={16} />
    );
    const flexContainer = container.querySelector('div');
    
    expect(flexContainer).toHaveStyle('gap: 16px');
  });

  it('renders disabled button', () => {
    render(<Button label="Disabled Button" disabled />);
    expect(screen.getByText('Disabled Button').closest('button')).toBeDisabled();
  });

  it('renders skeleton when in loading state', () => {
    const { container } = render(<Button isLoading label="Loading Button" />);
    expect(container.firstChild).toHaveClass('skeleton');
  });
});