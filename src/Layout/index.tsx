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
import VideoHero from '../page/HomePage/VideoHero';
import ScrollToTop from './ScrollToTop';
//import {WhatsApp} from '@mui/icons-material';

const heroContent = [
  {
    video: 'https://metakulbucket.s3.us-east-1.amazonaws.com/samsara/homePageVideo/v6.mp4',
    title: "Discover the world's hidden gems with Samsara Adventures—where every journey tells a unique story and every destination leaves you breathless."
  },
  {
    video: 'https://metakulbucket.s3.us-east-1.amazonaws.com/samsara/homePageVideo/v2.mp4',
    title: "Begin your unforgettable journey with Samsara Adventures—where every path leads to wonder, and every moment becomes a memory in time."
  },
  {
    video: 'https://metakulbucket.s3.us-east-1.amazonaws.com/samsara/homePageVideo/m1.mp4',
    title: "Let Samsara Adventures be your guide to the world's most captivating destinations—where dreams meet reality and adventures begin."
  },
  {
    video: 'https://metakulbucket.s3.us-east-1.amazonaws.com/samsara/homePageVideo/v5.mp4',
    title: "Embark on extraordinary adventures with Samsara—crafting experiences that go beyond the ordinary and into the extraordinary."
  },
  // {
  //   video: 'https://metakulbucket.s3.us-east-1.amazonaws.com/samsara/homePageVideo/g1.mp4',
  //   title: "Begin your unforgettable journey with Samsara Adventures—where every path leads to wonder, and every moment becomes a memory in time."
  // },
  {
    video: 'https://metakulbucket.s3.us-east-1.amazonaws.com/samsara/homePageVideo/g2.mp4',
    title: "Let Samsara Adventures be your guide to the world's most captivating destinations—where dreams meet reality and adventures begin."
  }
];

export const VideoHeroContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
`;

const MainContent = styled.main<{
  $sidebarOpen: boolean;
  $isMobile: boolean;
  $auth: boolean;
}>`
  flex: 1;
  position: relative;
  padding-top: 100px;
  z-index: 1;
`;

const Layout = () => {
  const [sidebarItem, setSidebarItem] = useState(HEADER_LINKS);
  const auth = useSelector(isAuthenticated);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const selectedUserType = useSelector(selectUserType);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // video index state
  const [videoIndex, setVideoIndex] = useState(0);
  const currentHero = heroContent[videoIndex];

  // initial random video on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroContent.length);
    setVideoIndex(randomIndex);
  }, []);

  const slectSidebarItemms = () => {
    if (selectedUserType === UserCategory.KAKRAN_SUPER_ADMIN) {
      setSidebarItem(adminSidebarItems);
    }
    if (selectedUserType === UserCategory.User) {
      setSidebarItem(userSidebarItems);
    }
  };

  useEffect(() => {
    slectSidebarItemms();
  }, [selectedUserType, auth]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNextVideo = () => {
    setVideoIndex((prev) => (prev + 1) % heroContent.length);
  };

  const handlePreviousVideo = () => {
    setVideoIndex((prev) => (prev - 1 + heroContent.length) % heroContent.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <ScrollToTop />
      <Header
        title={"SAMSARA"}
        links={sidebarItem}
        auth={auth}
        toggleMobileMenu={toggleMobileMenu}
        mobileMenuOpen={mobileMenuOpen}
        isMobile={isMobile}
      />
      {isMobile && (
        <Sidebar
          items={sidebarItem}
          isOpen={mobileMenuOpen}
          onToggle={toggleMobileMenu}
        />
      )}

      {currentHero && (
        <VideoHeroContainer>
          <VideoHero
            videoSrc={currentHero.video}
            title={currentHero.title}
            onNextVideo={handleNextVideo}
            onPreviousVideo={handlePreviousVideo}
          />
          
          {/* Social media icons moved to HomePage component */}
        </VideoHeroContainer>
      )}

      <MainContent $sidebarOpen={mobileMenuOpen} $isMobile={isMobile} $auth={auth}>
        <Outlet context={{ 
          title: currentHero?.title,
          onNextVideo: handleNextVideo,
          onPreviousVideo: handlePreviousVideo 
        }} />
        <Footer />
      </MainContent>
    </div>
  );
};

export default Layout;