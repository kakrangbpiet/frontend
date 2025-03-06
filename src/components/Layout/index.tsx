import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import {LayoutProps} from '../../Datatypes/interface';
import Tooltip from './Tooltip';
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

const Layout: React.FC<LayoutProps> = ({
  children,
  headerLinks,
  sidebarItems,
  title,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    
    <LayoutContainer>
      
      <Header title={title} links={headerLinks} />
      <Sidebar 
        items={sidebarItems} 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
     
      <MainContent $sidebarOpen={sidebarOpen}>
        {children}
      </MainContent>
      <Tooltip content={undefined} children={undefined}/>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;