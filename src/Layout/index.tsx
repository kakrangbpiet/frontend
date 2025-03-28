import { useState } from 'react';
import styled from 'styled-components';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Footer from './Footer/Footer';
import { HEADER_LINKS, sidebarItems } from './navigation';
import { Outlet } from 'react-router-dom';
export type { TooltipProps, TooltipPosition, TooltipVariant } from './Tooltip';


const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main<{ $sidebarOpen: boolean }>`
  flex: 1;
  margin-left: ${props => props.$sidebarOpen ? '240px' : '64px'};
  padding: 1rem;
  transition: margin-left 0.3s ease;
  background-color: #121212;
`;

const Layout= () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    
    <LayoutContainer>
      <Header title={"SAMSARA"} links={HEADER_LINKS} />
      <Sidebar 
        items={sidebarItems} 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
     
      <MainContent $sidebarOpen={sidebarOpen}>
        <Outlet/>
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;