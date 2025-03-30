import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const HeaderContainer = styled.header`
  background-color: #1E1E1E;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #2C2C2C;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  color: #A0A0A0;
  font-weight: 600;
  margin-left: 12px;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #4A4A4A;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLink = styled(Link) <{ $active?: boolean }>`
  color: #A0A0A0;
  text-decoration: none;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${props => props.$active ? '#2C2C2C' : 'transparent'};
  
  &:hover {
    background-color: #2C2C2C;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 4px;

  &:hover {
    background-color: #2C2C2C;
  }
`;

// Mobile menu button
const MobileMenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: flex;
  }

  &:hover {
    background-color: #2C2C2C;
  }
`;

// SVG Icons
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#A0A0A0"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const NotificationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#A0A0A0"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

interface HeaderProps {
  title?: string;
  links: Array<{
    to: string;
    label: string;
  }>;
  auth: any;
}

const Header: React.FC<HeaderProps> = ({
  title = 'SAMSARA',
  links,
  auth
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoIcon />
        <div style={{
          marginLeft: '12px',
        }}>
          <Logo>{title}</Logo>
        </div>
      </LogoContainer>

      <Nav>
        {links.map((link, index) => (
          <StyledLink
            key={index}
            to={link.to}
            $active={window.location.pathname === link.to}
          >
            {link.label}
          </StyledLink>
        ))}
      </Nav>

      <IconContainer>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <NotificationIcon />
        </IconButton>
        <MobileMenuButton>
          {
            !auth && <Sidebar
              items={links}
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              position="right"
            />
          }
        </MobileMenuButton>
      </IconContainer>
    </HeaderContainer>
  );
};

export default Header;