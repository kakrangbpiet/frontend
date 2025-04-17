import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarProps } from '../../Datatypes/interface';
import { Box } from '@mui/material';
import { X, Twitter, Instagram, Facebook } from 'lucide-react';

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  width: ${props => props.$isOpen ? '100%' : '0'};
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


const NavItem = styled(Box)<{ $isOpen: boolean, $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  text-decoration: none;

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
`;


const Sidebar: React.FC<SidebarProps> = ({ items, isOpen, onToggle }) => {
  const location = useLocation();
  const navigate=useNavigate()
  console.log('Sidebar items:', items);
  return (
    <SidebarContainer $isOpen={isOpen}>
   
   <nav className="relative z-10 flex-grow flex flex-col items-center justify-center p-4 space-y-6">
        {items.map((item) => (
          <NavItem 
          className="text-white text-xl py-3 px-4 hover:bg-white hover:bg-opacity-10 rounded-lg w-64 text-center"
            key={item.to}
            onClick={()=>{navigate(item.to);onToggle()}}
            $isOpen={isOpen}
            $active={location.pathname === item.to}
          >
            <NavIcon >
           { item.icon}
            </NavIcon>
            <NavLabel $isOpen={isOpen}>{item.label}</NavLabel>
          </NavItem>
        ))}
         <div className="flex flex-col items-center pt-6 w-64 space-y-4">
          <button className="text-white py-3 px-4 w-full text-center hover:bg-white hover:bg-opacity-10 hover:text-black rounded-lg text-xl">Switch to App</button>
          <button 
            onClick={() => {navigate('/profile');onToggle()}}
            className="bg-black bg-opacity-20 text-white py-3 px-4 w-full rounded-lg hover:bg-white hover:text-black hover:bg-opacity-30 text-xl"
          >
            Profile
          </button>
        </div>
        
        <div className="flex justify-center space-x-8 mt-8">
          <a href="tw" className="text-white hover:text-gray-300">
            <Twitter size={24} />
          </a>
          <a href="i" className="text-white hover:text-gray-300">
            <Instagram size={24} />
          </a>
          <a href="f" className="text-white hover:text-gray-300">
            <Facebook size={24} />
          </a>
        </div>
      </nav>
    </SidebarContainer>
  );
};

export default Sidebar;