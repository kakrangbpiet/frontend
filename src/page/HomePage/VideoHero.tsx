import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

// Styled components
const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
`;

const StyledVideo = styled.video<{ $loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; 
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: -1;
`;

const LoadingBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: -2;
`;

// Component props interface
interface VideoHeroProps {
  videoSrc: string;
  title?: string;
  subtitle?: string;
  onNextVideo?: () => void;
  onPreviousVideo?: () => void;
}

const VideoHero: React.FC<VideoHeroProps> = ({
  videoSrc,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    if (videoRef.current) {
      setIsLoaded(false);
      videoRef.current.pause();
      videoRef.current.load();
      
      const handleCanPlay = () => {
        setIsLoaded(true);
        videoRef.current?.play().catch(error => {
          console.log("Video play failed:", error);
        });
      };
      
      videoRef.current.addEventListener('canplay', handleCanPlay);
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('canplay', handleCanPlay);
        }
      };
    }
  }, [videoSrc]);
  
  return (
    <VideoContainer>
      <LoadingBackground />
      <StyledVideo 
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        $loaded={isLoaded}
      />
      <VideoOverlay />
    </VideoContainer>
  );
};

export default VideoHero;