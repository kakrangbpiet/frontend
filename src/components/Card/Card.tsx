// /components/Card/Card.tsx
import { ReactNode } from 'react';
import { Skeleton } from '../Skeleton';
import styles from './Card.module.css';

export interface CardProps {

  title?: string;
 
  children: ReactNode;
  
  footer?: ReactNode;
 
  variant?: 'default' | 'outlined' | 'elevated';
  
  className?: string;
 
  isLoading?: boolean;
  
  padding?: 'small' | 'medium' | 'large' | 'none';
  
  borderRadius?: 'small' | 'medium' | 'large' | 'none';
}

export const Card = ({
  title,
  children,
  footer,
  variant = 'default',
  className = '',
  isLoading = false,
  padding = 'medium',
  borderRadius = 'medium'
}: CardProps) => {
  const cardClasses = [
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    styles[`radius-${borderRadius}`],
    className
  ].filter(Boolean).join(' ');

  if (isLoading) {
    return (
      <div className={cardClasses}>
        {title && (
          <div className={styles.titleContainer}>
            <Skeleton width="70%" height={24} />
          </div>
        )}
        <div className={styles.contentContainer}>
          <Skeleton width="100%" height={100} />
        </div>
        {footer && (
          <div className={styles.footerContainer}>
            <Skeleton width="100%" height={40} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cardClasses}>
      {title && (
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      )}
      <div className={styles.contentContainer}>
        {children}
      </div>
      {footer && (
        <div className={styles.footerContainer}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;