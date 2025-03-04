import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import InstallPwaButton from '../common/InstallPwaButton';

const HeaderContainer = styled.header`
  background-color: #121212;
  color: white;
  padding: 0 20px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4dabf7;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
    color: #4dabf7;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const DesktopNav = styled(Nav)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled(Nav)<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    position: absolute;
    flex-direction: column;
    top: 64px;
    left: 0;
    right: 0;
    background-color: #121212;
    padding: 20px;
    z-index: 100;
  }
`;

interface HeaderProps {
  title: string;
  links: Array<{
    to: string;
    label: string;
  }>;
}

const Header: React.FC<HeaderProps> = ({ title, links }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <Logo>{title}</Logo>
      
      <DesktopNav>
        {links.map((link, index) => (
          <StyledLink key={index} to={link.to}>
            {link.label}
          </StyledLink>
        ))}
      </DesktopNav>
      
      <MobileMenuButton onClick={toggleMobileMenu}>
        ☰
      </MobileMenuButton>
      
      <MobileNav isOpen={mobileMenuOpen}>
        {links.map((link, index) => (
          <StyledLink key={index} to={link.to}>
            {link.label}
          </StyledLink>
        ))}
      </MobileNav>
      <InstallPwaButton />
    </HeaderContainer>
  );
};

export default Header;