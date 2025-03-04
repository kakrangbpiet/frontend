import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import {SidebarProps} from '../../Datatypes/interface';

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  width: ${props => props.$isOpen ? '240px' : '64px'};
  height: 100vh;
  background-color: #1E1E1E;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;
  z-index: 10;
  border-right: 1px solid #2C2C2C;
`;

const SidebarHeader = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #2C2C2C;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #4A4A4A;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 12px;
`;

const SidebarNav = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
`;

const NavItem = styled(Link)<{ $isOpen: boolean, $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  text-decoration: none;
  background-color: ${props => props.$active ? '#2C2C2C' : 'transparent'};
  
  &:hover {
    background-color: #2C2C2C;
  }
`;

const NavIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #4A4A4A;
  border-radius: 4px;
  margin-right: 12px;
`;

const NavLabel = styled.span<{ $isOpen: boolean }>`
  color: #A0A0A0;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: ${props => props.$isOpen ? 'block' : 'none'};
`;

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true }) => {
  const location = useLocation();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/orders', label: 'Orders' },
    { to: '/analytics', label: 'Analytics' },
    { to: '/layers', label: 'Layers' }
  ];

  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarHeader>
        <LogoIcon />
        {isOpen && <span style={{ color: '#A0A0A0', fontWeight: 600 }}>Toolpad</span>}
      </SidebarHeader>
      <SidebarNav>
        {navItems.map((item) => (
          <NavItem 
            key={item.to}
            to={item.to} 
            $isOpen={isOpen}
            $active={location.pathname === item.to}
          >
            <NavIcon />
            <NavLabel $isOpen={isOpen}>{item.label}</NavLabel>
          </NavItem>
        ))}
      </SidebarNav>
    </SidebarContainer>
  );
};

export default Sidebar;