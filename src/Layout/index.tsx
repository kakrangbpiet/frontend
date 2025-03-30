import { useState } from 'react';
import styled from 'styled-components';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Footer from './Footer/Footer';
import { HEADER_LINKS, sidebarItems } from './navigation';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../redux/slices/login/authSlice';
export type { TooltipProps, TooltipPosition, TooltipVariant } from './Tooltip';


const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main<{ $sidebarOpen: boolean; $auth: any }>`
  flex: 1;
  margin-left: ${({ $sidebarOpen, $auth }) =>
    $auth ? ($sidebarOpen ? '240px' : '64px') : '0px'};
  padding: 1rem;
  transition: margin-left 0.3s ease;
  background-color: #121212;
`;


const Layout= () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const auth = useSelector(isAuthenticated);


  return (
    
    <LayoutContainer>
      <Header title={"SAMSARA"} links={HEADER_LINKS} auth={auth} />
     {auth && <Sidebar 
        items={sidebarItems} 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
     }
     
      <MainContent $auth={auth} $sidebarOpen={sidebarOpen}>
        <Outlet/>
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;