import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import {LayoutProps} from '../../Datatypes/interface';
import { Outlet } from "react-router-dom";
import { HEADER_LINKS, navItems } from './routes';


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

const Layout: React.FC<LayoutProps> = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <LayoutContainer>
      <Header title={"React"} links={HEADER_LINKS} />
      <Sidebar 
        items={navItems} 
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