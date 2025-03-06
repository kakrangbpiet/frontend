import React from 'react';
import { ButtonVariant, ButtonSize, CardElevation } from './types';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export interface CardProps {
  elevation?: CardElevation;
  children: React.ReactNode;
  className?: string;
}

export interface HeaderProps {
  title: string;
  links: Array<{
    to: string;
    label: string;
  }>;
}

export interface LayoutProps {
  children: React.ReactNode;
  headerLinks: Array<{ to: string; label: string }>;
  sidebarItems: Array<{ to: string; label: string; icon?: React.ReactNode }>;
  title: string;
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    lightText: string;
    background: string;
    text: string;
  };
  typography: {
    fontSize: {
      small: string;
      medium: string;
      large: string;
    };
    fontWeight: {
      medium: string;
    };
  };
  spacing: {
    lg: string;
    md: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  breakpoints?: {
    sm: string;
  };
}

export interface SidebarProps {
  items: Array<{
    to: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  isOpen: boolean;
  onToggle: () => void;
}

export interface SidebarItem {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

export interface LayoutProps {
  children: React.ReactNode;
  headerLinks: Array<{ to: string; label: string }>;
  sidebarItems: SidebarItem[];
  title: string;
  onSidebarToggle?: () => void;
}
export interface FooterProps {
  companyName?: string;
  showSocials?: boolean;
  variant?: 'light' | 'dark';
}
export type ThemeMode = 'light' | 'dark';

export interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}