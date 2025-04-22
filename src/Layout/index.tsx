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
import VideoHero from '../page/HomePage/VideoHero';
import ScrollToTop from './ScrollToTop';

const heroContent = [
  {
    video: '/HomeVideos/v1.mp4',
    title: "Discover the world's hidden gems with Samsara Adventures—where every journey tells a unique story and every destination leaves you breathless."
  },
  {
    video: '/HomeVideos/v2.mp4',
    title: "Begin your unforgettable journey with Samsara Adventures—where every path leads to wonder, and every moment becomes a memory in time."
  },
  {
    video: '/HomeVideos/v3.mp4',
    title: "Embark on extraordinary adventures with Samsara—crafting experiences that go beyond the ordinary and into the extraordinary."
  },
  {
    video: '/HomeVideos/v4.mp4',
    title: "Let Samsara Adventures be your guide to the world's most captivating destinations—where dreams meet reality and adventures begin."
  }
];

export const VideoHeroContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1; // Ensure it stays behind other content
`;

const MainContent = styled.main<{
  $sidebarOpen: boolean;
  $isMobile: boolean;
  $auth: boolean
}>`
  flex: 1;
    position: relative;
  position: relative;
  z-index: 1; // Ensure content appears above the video
`;


const Layout = () => {
  const [sidebarItem, setSidebarItem] = useState(HEADER_LINKS);
  const auth = useSelector(isAuthenticated);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const selectedUserType = useSelector(selectUserType);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [randomHero, setRandomHero] = useState<{video: string, title: string} | null>(null);
  useEffect(() => {
    // Select a random hero content when component mounts
    const randomIndex = Math.floor(Math.random() * heroContent.length);
    setRandomHero(heroContent[randomIndex]);
  }, []);

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
  }, [selectedUserType,auth,selectedUserType]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="relative w-full overflow-hidden">
    <ScrollToTop />
      <Header title={"SAMSARA"} links={sidebarItem} auth={auth} toggleMobileMenu={toggleMobileMenu}
        mobileMenuOpen={mobileMenuOpen} isMobile={isMobile} />
      
      {isMobile && <Sidebar
          items={sidebarItem}
          isOpen={mobileMenuOpen}
          onToggle={toggleMobileMenu}
        />
      }

      {/* VideoHero at the top of the layout */}
        {randomHero && (
        <VideoHeroContainer>
          <VideoHero
            videoSrc={randomHero.video}
            title={randomHero.title}
          />
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
        </VideoHeroContainer>
      )}

      <MainContent
        $sidebarOpen={mobileMenuOpen}
        $isMobile={isMobile}
        $auth={auth}
      >
          <Outlet context={{ title: randomHero?.title }} />
      </MainContent>
  
      <Footer />
    </div>
  );
};

export default Layout;