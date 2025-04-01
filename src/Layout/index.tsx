import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Footer from './Footer/Footer';
import { adminSidebarItems, HEADER_LINKS, userSidebarItems } from './navigation';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthenticated, selectUserType } from '../redux/slices/login/authSlice';
import { useMediaQuery } from '@mui/material';
import { UserCategory } from '../Datatypes/Enums/UserEnums';
export type { TooltipProps, TooltipPosition, TooltipVariant } from './Tooltip';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main<{ 
  $sidebarOpen: boolean; 
  $isMobile: boolean;
  $auth: boolean 
}>`
  flex: 1;
  margin-left: ${({ $sidebarOpen, $auth }) => 
    $auth ? ($sidebarOpen ? '240px' : '60px') : '0'};
  transition: margin-left 0.3s ease;
@media (max-width: 768px) {
  margin-left: ${({ $sidebarOpen }) => $sidebarOpen ? '240px' : '60px'};
}
`;

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarItem, setSidebarItem] = useState([]);
  const auth = useSelector(isAuthenticated);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const selectedUserType = useSelector(selectUserType);

  const slectSidebarItemms=()=>{
    if(selectedUserType===UserCategory.KAKRAN_SUPER_ADMIN){
      setSidebarItem(adminSidebarItems)
    }
    if(selectedUserType===UserCategory.User){
      setSidebarItem(userSidebarItems)
    }
  }

  useEffect(() => {
    slectSidebarItemms();
  }
  , [selectedUserType]);
  return (
    <LayoutContainer>
      <Header title={"SAMSARA"} links={HEADER_LINKS} auth={auth} />
      {auth && (
        <Sidebar
          items={sidebarItem}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      )}

      <MainContent 
        $sidebarOpen={sidebarOpen} 
        $isMobile={isMobile}
        $auth={auth}
      >
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;