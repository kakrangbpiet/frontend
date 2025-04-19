import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { isAuthenticated, selectUserType } from '../../redux/slices/login/authSlice';
import { fetchTravelPackagesApi, fetchTravelPackagesByCategoryApi } from '../../redux/slices/Travel/travelApiSlice';
import { AppDispatch } from '../../redux/store';
import { selectedTravelPackages, selectedTravelPackagesLoading, selectTravelPackagesByCategory } from '../../redux/slices/Travel/TravelSlice';
import TravelPackages from '../../components/Card/TravelPackageItems.tsx';
// import { Typography } from '@mui/material';
import { UserCategory } from '../../Datatypes/Enums/UserEnums';
import locationsData from '../../components/Forms/Location.json';

const DashboardGrid = styled.div`
  width: 100%;
`;

const PackagesSection = styled.div`
  padding: 2rem;
  position: relative; 
  z-index: 5;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// change height if packge appear in main page
const ContentOverlay = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; 
  min-height: 60vh; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 2rem;
  text-align: center;
  z-index: 4; 
  margin-bottom: 2rem; 
  
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
  font-weight: 300; 
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

  const travelPackages = useSelector(selectedTravelPackages);
    const travelPackagesLoading = useSelector(selectedTravelPackagesLoading);
    useEffect(() => {
        dispatch(fetchTravelPackagesApi({status:"active"}))
    }, [dispatch]);

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
    if (categoryItemsHotDeals.length === 0 ) {
      handleLoadCategories();
    }
    
    // Debug logs to verify data
  }, [dispatch]);

  const handleCustomizedTripClick = () => {
    navigate("/travel-form");
  };
  
  const handlePrePlannedTripsClick = () => {
    navigate("/pre-planned-trips");
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  // const handleDestinationSelect = (_value: string) => {
  //   setIsDropdownOpen(false);
  // };

  return (
    <div>
      <ContentOverlay>
        <HeroText>
          <HeroTitle>{title || "Discover Amazing Destinations"}</HeroTitle>
        </HeroText>
        
        <ButtonContainer>
          <SelectWrapper>
            <DestinationSelectButton onClick={toggleDropdown}>
              <span>Destination</span>
              <ChevronIcon isOpen={isDropdownOpen} />
            </DestinationSelectButton>
            
            {isDropdownOpen && (
  <DropdownMenu>
    {locationsData.locations.map((location) => (
      <DropdownItem 
        key={location.value} 
        href="#" 
        onClick={() => {
          // Handle location selection
          setIsDropdownOpen(false);
        }}
      >
        {location.label}
      </DropdownItem>
    ))}
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
        <div className="text-center mt-8">
  <div className="inline-block px-6 py-2 text-white text-2xl font-semibold bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    Hot Deals Packages
  </div>
</div>
{/*needed to be set*/}

                    <TravelPackages 
            travelPackages={categoryItemsHotDeals} 
            categoryType="hotdeals" 
            loading={loadingByCategory["hotdeals"] || false} 
          />
          
          <div className="text-center mt-8">
  <div className="inline-block px-6 py-2 text-white text-2xl font-semibold bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
  Pre-Planned Trips
  </div>
</div>
{/*needed to be set*/}

          
          <TravelPackages 
            travelPackages={travelPackages.travelPackages} 
            categoryType="new" 
            loading={travelPackagesLoading} 
          />
        </PackagesSection>
      </DashboardGrid>
    </div>
  );
};

export default HomePage;