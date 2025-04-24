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
`;



// Component props interface
interface VideoHeroProps {
  videoSrc: string;
  title?: string;
  subtitle?: string;
  onDestinationChange?: (value: string) => void;
  onCustomizedTripClick?: () => void;
  onPrePlannedTripsClick?: () => void;
}

const VideoHero: React.FC<VideoHeroProps> = ({
  videoSrc,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video play failed:", error);
      });
    }
  }, []);
  

  
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
   
    </VideoContainer>
  );
};

export default VideoHero;