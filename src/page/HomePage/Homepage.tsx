import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { isAuthenticated, selectUserType } from '../../redux/slices/login/authSlice';
import { fetchTravelPackagesByCategoryApi } from '../../redux/slices/Travel/travelApiSlice';
import { AppDispatch } from '../../redux/store';
import { selectedTravelPackagesLoading, selectTravelPackagesByCategory } from '../../redux/slices/Travel/TravelSlice';
import TravelPackages from '../../components/Card/TravelPackageItems.tsx';
import { Typography } from '@mui/material';
import { UserCategory } from '../../Datatypes/Enums/UserEnums';

const DashboardGrid = styled.div`
  width: 100%;
`;

const PackagesSection = styled.div`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContentOverlay = styled.div`

  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 2rem;
  text-align: center;
  z-index:400;
  
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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useSelector(isAuthenticated);
  const selectedUserType = useSelector(selectUserType);
  const dispatch = useDispatch<AppDispatch>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { title } = useOutletContext<{ title: string }>();

  useEffect(() => {
    if (auth && selectedUserType === UserCategory.KAKRAN_SUPER_ADMIN) {
      navigate("/dashboard");
    }
  }, [auth, navigate, selectedUserType]);

  const loadingByCategory = useSelector(selectedTravelPackagesLoading);
  const categoryItemsHotDeals = useSelector(selectTravelPackagesByCategory("hotdeals"));
  const categoryItemsNew = useSelector(selectTravelPackagesByCategory("pre-planned-trips"));

  const handleLoadCategories = async () => {
    try {
      dispatch(
        fetchTravelPackagesByCategoryApi({
          pageSize: 10,
          page: 1,
          category: "hotdeals",
          status: "active"
        })
      );
      dispatch(
        fetchTravelPackagesByCategoryApi({
          pageSize: 10,
          page: 1,
          category: "pre-planned-trips",
          status: "active"
        })
      );
    } catch (error) {
      console.error("Failed to fetch travel packages:", error);
    }
  };

  useEffect(() => {
    if (categoryItemsHotDeals.length === 0 || categoryItemsNew.length === 0) {
      handleLoadCategories();
    }
  }, [dispatch, categoryItemsHotDeals.length, categoryItemsNew.length]);

// const handleDestinationChange = (value: string) => {
//   console.log("Selected destination:", value);
//   // Add logic to filter or navigate based on destination
// };

const handleCustomizedTripClick = () => {
  navigate("/travel-form");
};

const handlePrePlannedTripsClick = () => {
  navigate("/pre-planned-trips");
};

  
const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

const handleDestinationSelect = (_value: string) => {
  // if (onDestinationChange) {
  //   onDestinationChange(value);
  // }
  setIsDropdownOpen(false);
};
  return (
    <div>
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
            <Button onClick={handleCustomizedTripClick}>
              Your Customized Trip
            </Button>
            <Button onClick={handlePrePlannedTripsClick}>
              Pre-planned Trips
            </Button>
          </ButtonGroup>
        </ButtonContainer>
      </ContentOverlay>
      <DashboardGrid>
        <PackagesSection>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Hot Deals Packages
          </Typography>
          <TravelPackages 
            travelPackages={categoryItemsHotDeals} 
            categoryType="hotdeals" 
            loading={loadingByCategory["hotdeals"] || false} 
          />
          
          <Typography variant="h6" sx={{ mt: 8, mb: 4 }}>
            Pre-Planned Trips
          </Typography>
          <TravelPackages 
            travelPackages={categoryItemsNew} 
            categoryType="new" 
            loading={loadingByCategory["pre-planned-trips"] || false} 
          />
        </PackagesSection>
      </DashboardGrid>
    </div>
  );
};

export default HomePage;