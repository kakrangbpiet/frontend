// /components/Card/Card.test.tsx
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Card title="Card Title">Content</Card>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <Card footer={<button>Action</button>}>
        Content
      </Card>
    );
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('applies correct variant class', () => {
    const { rerender } = render(<Card variant="default">Content</Card>);
    expect(screen.getByText('Content').closest('div')).toHaveClass('default');
    
    rerender(<Card variant="outlined">Content</Card>);
    expect(screen.getByText('Content').closest('div')).toHaveClass('outlined');
    
    rerender(<Card variant="elevated">Content</Card>);
    expect(screen.getByText('Content').closest('div')).toHaveClass('elevated');
  });

  it('applies correct padding class', () => {
    const { rerender } = render(<Card padding="small">Content</Card>);
    expect(screen.getByText('Content').closest('div')).toHaveClass('padding-small');
    
    rerender(<Card padding="medium">Content</Card>);
    expect(screen.getByText('Content').closest('div')).toHaveClass('padding-medium');
    
    rerender(<Card padding="large">Content</Card>);
    expect(screen.getByText('Content').closest('div')).toHaveClass('padding-large');
    
    rerender(<Card padding="none">Content</Card>);
    expect(screen.getByText('Content').closest('div')).toHaveClass('padding-none');
  });

  it('applies correct border radius class', () => {
    const { rerender } = render(<Card borderRadius="small">Content</Card>);
    expect(screen.getByText('Content').closest('div')).toHaveClass('radius-small');
    
    rerender(<Card borderRadius="medium">Content</Card>);
    expect(screen.getByText('Content').closest('div')).toHaveClass('radius-medium');
    
    rerender(<Card borderRadius="large">Content</Card>);
    expect(screen.getByText('Content').closest('div')).toHaveClass('radius-large');
    
    rerender(<Card borderRadius="none">Content</Card>);
    expect(screen.getByText('Content').closest('div')).toHaveClass('radius-none');
  });

  it('renders in loading state correctly', () => {
    render(
      <Card 
        title="Loading Card" 
        isLoading={true}
        footer={<button>Action</button>}
      >
        Hidden Content
      </Card>
    );
    
    expect(screen.queryByText('Loading Card')).not.toBeInTheDocument();
    expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();
    expect(screen.queryByText('Action')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Content</Card>);
    expect(screen.getByText('Content').closest('div')).toHaveClass('custom-class');
  });
});