import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarProps } from '../../Datatypes/interface';
import { Twitter, Instagram, Facebook } from 'lucide-react';

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
width: ${props => props.$isOpen ? '100%' : '0'};
height: 100vh;
background-color: rgba(0, 0, 0, 0.64); 
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px); 
position: fixed;
left: 0;
top: 0;
display: flex;
flex-direction: column;
transition: width 0.3s ease;
overflow: hidden;
z-index: 10;
`;


const MenuContainer = styled.nav`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const NavItem = styled.div<{ $active?: boolean }>`
  color: white;
  font-size: 16px;
  margin: 12px 0;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  width: 100%;
  padding: 10px 0;
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  
  &:hover {
    opacity: 0.8;
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
  max-width: 250px;
`;

const Button = styled.button`
  background: transparent;
  color: white;
  border: none;
  padding: 12px 0;
  width: 100%;
  margin: 8px 0;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ProfileButton = styled(Button)`
  background-color: rgba(128, 128, 128, 0.4);
  border-radius: 4px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 20px;
`;

const SocialIcon = styled.a`
  color: white;
  
  &:hover {
    opacity: 0.7;
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ items, isOpen, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <SidebarContainer $isOpen={isOpen}>
      
      <MenuContainer>
        {items.map((item) => (
          <NavItem 
            key={item.to}
            onClick={() => {
              navigate(item.to);
              onToggle();
            }}
            $active={location.pathname === item.to}
          >
            {item.label}
          </NavItem>
        ))}
        
        <BottomSection>
          <Button onClick={() => {}}>Switch to App</Button>
          <ProfileButton 
            onClick={() => {
              navigate('/profile');
              onToggle();
            }}
          >
            Profile
          </ProfileButton>
          
          <SocialLinks>
  <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <Twitter size={20} />
  </SocialIcon>
  <SocialIcon href="https://www.instagram.com/samsara_adventures01/" target="_blank" rel="noopener noreferrer">
    <Instagram size={20} />
  </SocialIcon>
  <SocialIcon href="https://www.facebook.com/profile.php?id=61575410837166" target="_blank" rel="noopener noreferrer">
    <Facebook size={20} />
  </SocialIcon>
</SocialLinks>
        </BottomSection>
      </MenuContainer>
    </SidebarContainer>
  );
};

export default Sidebar;