import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { SidebarProps } from '../../Datatypes/interface';

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
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #2C2C2C;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
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

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 26px;
  height: 26px;
  background-color: #4A4A4A;
  border-radius: 4px;
  margin-right: 10px;
`;

const NavLabel = styled.span<{ $isOpen: boolean }>`
  color: #A0A0A0;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: ${props => props.$isOpen ? 'block' : 'none'};
`;

// Custom SVG Icons
const MenuIcon = () => (
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
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
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
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ items, isOpen, onToggle }) => {
  const location = useLocation();

  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarHeader>
        {isOpen ? (
          <LogoContainer>
            <LogoIcon />
            <span style={{ color: '#A0A0A0', fontWeight: 600 }}>SAMSARA</span>
          </LogoContainer>
        ) : (
          <LogoIcon />
        )}
        <ToggleButton onClick={onToggle}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </ToggleButton>
      </SidebarHeader>
      <SidebarNav>
        {items.map((item) => (
          <NavItem 
            key={item.to}
            to={item.to} 
            $isOpen={isOpen}
            $active={location.pathname === item.to}
          >
            <NavIcon >
           { item.icon}
            </NavIcon>
            <NavLabel $isOpen={isOpen}>{item.label}</NavLabel>
          </NavItem>
        ))}
      </SidebarNav>
    </SidebarContainer>
  );
};

export default Sidebar;