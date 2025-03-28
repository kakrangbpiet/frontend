// /components/Skeleton/Skeleton.tsx
import { ReactNode } from 'react';
// import styles from './Skeleton.module.css';

export interface SkeletonProps {
  /**
   * Width of skeleton
   */
  width?: string | number;
  /**
   * Height of skeleton
   */
  height?: string | number;
  /**
   * Border radius of skeleton
   */
  borderRadius?: string | number;
  /**
   * Is animation enabled
   */
  isAnimated?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Children to be rendered inside skeleton
   */
  children?: ReactNode;
}

export const Skeleton = ({
  width = '100%',
  height = '16px',
  borderRadius = '4px',
  // isAnimated = true,
  // className = '',
  children
}: SkeletonProps) => {
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius
  };

  return (
    <div 
      // className={`${styles.skeleton} ${isAnimated ? styles.animated : ''} ${className}`} 
      style={style}
    >
      {children}
    </div>
  );
};

export default Skeleton;