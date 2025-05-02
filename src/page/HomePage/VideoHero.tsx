import React, { useRef, useEffect } from 'react';
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

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; 
  transition: opacity 0.5s ease-in-out;
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
  title,
  subtitle,
  onNextVideo,
  onPreviousVideo
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
      
      videoRef.current.play().catch(error => {
        console.log("Video play failed:", error);
      });
    }
  }, [videoSrc]); // Re-run effect when video source changes
  
  return (
    <VideoContainer>
      <StyledVideo 
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />
      <VideoOverlay />
    </VideoContainer>
  );
};

export default VideoHero;