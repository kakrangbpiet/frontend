// Heading.tsx
import React from 'react';
import './Heading.css'; 
import {HeadingProps} from '../../Datatypes/interface'
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingVariation = 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';

export const Heading: React.FC<HeadingProps> = ({
  id,
  className = '',
  children,
  level = 1,
  style,
  variation = 'primary',
}) => {
  const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  // Changed from using CSS modules to regular CSS classes
  const combinedClassName = `heading level-${level} variation-${variation} ${className}`.trim();
  
  return (
    <HeadingTag 
      id={id} 
      className={combinedClassName}
      style={style}
    >
      {children}
    </HeadingTag>
  );
};

export default Heading;