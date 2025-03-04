import React from 'react';
import styled from 'styled-components';

interface CardProps {
  elevation?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
}

interface Theme {
  colors: {
    background: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  spacing: {
    lg: string;
    md: string;
  };
}

const getShadow = (elevation: number, theme: Theme) => {
  switch (elevation) {
    case 1:
      return theme.shadows.small;
    case 2:
      return theme.shadows.medium;
    case 3:
      return theme.shadows.large;
    default:
      return theme.shadows.small;
  }
};

const CardContainer = styled.div<{ elevation: number }>`
  background-color: ${props => props.theme.colors.background};
  border-radius: 4px;
  box-shadow: ${props => getShadow(props.elevation, props.theme as Theme)};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Card: React.FC<CardProps> = ({ 
  children, 
  elevation = 1,
  className,
}) => {
  return (
    <CardContainer elevation={elevation} className={className}>
      {children}
    </CardContainer>
  );
};

export default Card;