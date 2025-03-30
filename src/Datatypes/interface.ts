import React from 'react';
import { ButtonVariant, ButtonSize, CardElevation } from './types';
import { ReactNode } from 'react';
import { IconPosition } from '../components/common/Button';
import { HeadingLevel, HeadingVariation } from '../components/Heading';
import { accountStatus, UserCategory } from './Enums/UserEnums';

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
  position?: 'left' | 'right'
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
export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label?: string;
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  iconSpacing?: number;
  disabled?: boolean;
  children?: ReactNode;
  onLoading?: boolean; // ✅ Added for global loading state
}
export interface HeadingProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  
  /**
   * Heading level (h1-h6)
   * @default 1
   */
  level?: HeadingLevel;
  style?: React.CSSProperties;
  
  /**
   * Visual variation of the heading
   * @default 'primary'
   */
  variation?: HeadingVariation;
}
export interface Column<T> {
  /**
   * Unique identifier for the column
   */
  id: string;
  
  /**
   * Display header text
   */
  header: React.ReactNode;
  
  /**
   * Function to get the cell value from a row item
   */
  accessor: (row: T) => React.ReactNode;
  
  /**
   * Optional custom cell renderer
   */
  cell?: (value: unknown, row: T) => React.ReactNode;
  
  /**
   * Is column sortable
   */
  sortable?: boolean;
  
  /**
   * Optional width for the column (e.g., '200px', '20%')
   */
  width?: string;
  
  /**
   * Optional alignment for the column content
   */
  align?: 'left' | 'center' | 'right';
}
export interface Person {
  id: number;
  name: string;
  age: number;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date;
}


// api response success
export interface ApiSuccess {
  statusCode?: number;
  message: string;
  data:object
}

// api response error
export interface ApiError {
  statusCode?: number;
  error: string;
}


export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  access: string | null;
  refresh: string | null;
  userType: string | null;
  isLoading:boolean
  isContactVerified:boolean
  trxId?: string;
  phoneNumber: string | null;
}

export type AccountStatusType = accountStatus
export type CategoryType = UserCategory

export interface IloginUser {
    email: string;
    password?: string;
    accountStatus?: AccountStatusType;
}

export interface IUser extends IloginUser {
    id?: any;
    name: string;
    phoneNumber: string;
    address: string | { latitude: number; longitude: number; }
    category: CategoryType;
    subcategory?: string;
    permissions?: string[];
}

export interface SignUpData {
  name?: string;
  email?: string;
  password?: string;
  phoneNumber: string;
  address?: string;
  accountStatus?: string;
  category?: string;
}

export interface OtpData {
  otp: string;
  trxId: string;
  deviceId: string;
  phoneNumber: string;
}


export interface LoginData {
  email: string;
  password: string;
  OnFormSuccess:any
  userType: UserCategory.User | UserCategory.KAKRAN_SUPER_ADMIN
}