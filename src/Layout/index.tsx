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
import { Twitter, Instagram, Facebook } from 'lucide-react';



const MainContent = styled.main<{
  $sidebarOpen: boolean;
  $isMobile: boolean;
  $auth: boolean
}>`
  flex: 1;
`;

const Layout = () => {
  const [sidebarItem, setSidebarItem] = useState(HEADER_LINKS);
  const auth = useSelector(isAuthenticated);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const selectedUserType = useSelector(selectUserType);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const slectSidebarItemms = () => {
    if (selectedUserType === UserCategory.KAKRAN_SUPER_ADMIN) {
      setSidebarItem(adminSidebarItems)
    }
    if (selectedUserType === UserCategory.User) {
      setSidebarItem(userSidebarItems)
    }
  }

  useEffect(() => {
    slectSidebarItemms();
  }
    , [selectedUserType]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="relative w-full overflow-hidden">

      <Header title={"SAMSARA"} links={HEADER_LINKS} auth={auth} toggleMobileMenu={toggleMobileMenu}
        mobileMenuOpen={mobileMenuOpen} isMobile={isMobile} />
       {isMobile && <Sidebar
          items={sidebarItem}
          isOpen={mobileMenuOpen}
          onToggle={toggleMobileMenu}
        />
       }

      <MainContent
        $sidebarOpen={mobileMenuOpen}
        $isMobile={isMobile}
        $auth={auth}
      >
        <Outlet />
      </MainContent>
      <div className="z-50 hidden md:flex absolute right-6 top-1/2 transform -translate-y-1/2 flex-col space-y-6">
          <a href="http://instagram.com/" className="text-white hover:text-gray-300">
            <Twitter size={24} />
          </a>
          <a href="http://instagram.com/" className="text-white hover:text-gray-300">
            <Instagram size={24} />
          </a>
          <a href="http://instagram.com/" className="text-white hover:text-gray-300">
            <Facebook size={24} />
          </a>
        </div>
        
        {!mobileMenuOpen && (
          <div className="z-50 md:hidden flex justify-center space-x-8 mt-6">
            <a href="http://instagram.com/" className="text-white hover:text-gray-300">
              <Twitter size={20} />
            </a>
            <a href="http://instagram.com/" className="text-white hover:text-gray-300">
              <Instagram size={20} />
            </a>
            <a href="http://instagram.com/" className="text-white hover:text-gray-300">
              <Facebook size={20} />
            </a>
          </div>
        )}
      <Footer />
    </div>
  );
};

export default Layout;