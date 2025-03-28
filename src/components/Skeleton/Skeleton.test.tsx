// import '@testing-library/jest-dom';
// import { render } from '@testing-library/react';
// import { Skeleton } from './Skeleton';

// describe('Skeleton', () => {
//   it('renders without crashing', () => {
//     const { container } = render(<Skeleton />);
//     expect(container).toBeTruthy();
//   });

//   it('applies correct dimensions when provided as numbers', () => {
//     const { container } = render(<Skeleton width={200} height={100} borderRadius={8} />);
//     const skeletonElement = container.firstChild as HTMLElement;
    
//     expect(skeletonElement.style.width).toBe('200px');
//     expect(skeletonElement.style.height).toBe('100px');
//     expect(skeletonElement.style.borderRadius).toBe('8px');
//   });

//   it('applies correct dimensions when provided as strings', () => {
//     const { container } = render(<Skeleton width="50%" height="10rem" borderRadius="50%" />);
//     const skeletonElement = container.firstChild as HTMLElement;
    
//     expect(skeletonElement.style.width).toBe('50%');
//     expect(skeletonElement.style.height).toBe('10rem');
//     expect(skeletonElement.style.borderRadius).toBe('50%');
//   });

//   it('disables animation when isAnimated is false', () => {
//     const { container } = render(<Skeleton isAnimated={false} />);
//     const skeletonElement = container.firstChild as HTMLElement;
    
//     expect(skeletonElement.classList.contains('animated')).toBe(false);
//   });

//   it('renders children when provided', () => {
//     const { getByText } = render(
//       <Skeleton>
//         <div>Test Child</div>
//       </Skeleton>
//     );
    
//     expect(getByText('Test Child')).toBeInTheDocument();
//   });
// });