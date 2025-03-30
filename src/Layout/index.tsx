import { useState } from 'react';
import styled from 'styled-components';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Footer from './Footer/Footer';
import { HEADER_LINKS, sidebarItems } from './navigation';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../redux/slices/login/authSlice';
import { useMediaQuery } from '@mui/material';
export type { TooltipProps, TooltipPosition, TooltipVariant } from './Tooltip';


const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main<{ $sidebarOpen: boolean; $isMobile: boolean }>`
  flex: 1;

  
  @media (max-width: 768px) {
    margin-left: ${({ $sidebarOpen }) => $sidebarOpen ? '240px' : '60px'};
  }
`;


const Layout= () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const auth = useSelector(isAuthenticated);

  const isMobile = useMediaQuery('(max-width: 768px)'); // Using MUI's hook or similar

  return (
    
    <LayoutContainer>
      <Header title={"SAMSARA"} links={HEADER_LINKS} auth={auth} />
     {auth && <Sidebar 
        items={sidebarItems} 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
     }
     
      <MainContent  $sidebarOpen={sidebarOpen} $isMobile={isMobile}>
        <Outlet/>
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;