import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

// Styled components
const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const ContentOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeroText = styled.div`
  max-width: 800px;
  margin-bottom: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 300; // Making it lighter to match the example
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  
  @media (max-width: 768px) {
    max-width: 90%;
    gap: 0.75rem;
  }
`;

const DestinationSelectButton = styled.button`
  width: 100%;
  max-width: 20rem;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
  margin: 0 auto 1.5rem;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const ChevronIcon = styled.div<{ isOpen: boolean }>`
  width: 10px;
  height: 10px;
  border-style: solid;
  border-width: 0 2px 2px 0;
  transform: ${props => props.isOpen ? 'rotate(225deg)' : 'rotate(45deg)'};
  transition: transform 0.3s;
  margin-top: ${props => props.isOpen ? '0' : '3px'};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.a`
  display: block;
  padding: 0.5rem 1rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 640px) {
    width: 100%;
    font-size: 0.875rem;
    padding: 0.625rem 1.25rem;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 20rem;
  margin: 0 auto 1.5rem;
`;

// Component props interface
interface VideoHeroProps {
  videoSrc: string;
  title: string;
  subtitle?: string;
  onDestinationChange?: (value: string) => void;
  onCustomizedTripClick?: () => void;
  onPrePlannedTripsClick?: () => void;
}

const VideoHero: React.FC<VideoHeroProps> = ({
  videoSrc,
  title,
  onDestinationChange,
  onCustomizedTripClick,
  onPrePlannedTripsClick
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video play failed:", error);
      });
    }
  }, []);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const handleDestinationSelect = (value: string) => {
    if (onDestinationChange) {
      onDestinationChange(value);
    }
    setIsDropdownOpen(false);
  };
  
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
      <ContentOverlay>
        <HeroText>
          <HeroTitle>{title}</HeroTitle>
        </HeroText>
        
        <ButtonContainer>
          <SelectWrapper>
            <DestinationSelectButton onClick={toggleDropdown}>
              <span>Destination</span>
              <ChevronIcon isOpen={isDropdownOpen} />
            </DestinationSelectButton>
            
            {isDropdownOpen && (
              <DropdownMenu>
                <DropdownItem href="#" onClick={() => handleDestinationSelect('himachal')}>Himachal</DropdownItem>
                <DropdownItem href="#" onClick={() => handleDestinationSelect('uttrakhand')}>Uttrakhand</DropdownItem>
                <DropdownItem href="#" onClick={() => handleDestinationSelect('ladakh')}>Ladakh</DropdownItem>
                <DropdownItem href="#" onClick={() => handleDestinationSelect('kashmir')}>Kashmir</DropdownItem>
              </DropdownMenu>
            )}
          </SelectWrapper>
          
          <ButtonGroup>
            <Button onClick={onCustomizedTripClick}>
              Your Customized Trip
            </Button>
            <Button onClick={onPrePlannedTripsClick}>
              Pre-planned Trips
            </Button>
          </ButtonGroup>
        </ButtonContainer>
      </ContentOverlay>
    </VideoContainer>
  );
};

export default VideoHero;