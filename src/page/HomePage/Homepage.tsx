import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, selectUserType } from '../../redux/slices/login/authSlice';
import { fetchTravelPackagesByCategoryApi } from '../../redux/slices/Travel/travelApiSlice';
import { AppDispatch } from '../../redux/store';
import { selectedTravelPackagesLoading, selectTravelPackagesByCategory } from '../../redux/slices/Travel/TravelSlice';
import TravelPackages from '../../components/Card/TravelPackageItems.tsx';
import { Typography } from '@mui/material';
import { UserCategory } from '../../Datatypes/Enums/UserEnums';
import VideoHero from './VideoHero.tsx'; 

const DashboardGrid = styled.div`
  width: 100%;
`;

const PackagesSection = styled.div`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useSelector(isAuthenticated);
  const selectedUserType = useSelector(selectUserType);
  const dispatch = useDispatch<AppDispatch>();
  const [randomHero, setRandomHero] = useState<{video: string, title: string} | null>(null);
  
  useEffect(() => {
    // Select a random hero content when component mounts
    const randomIndex = Math.floor(Math.random() * heroContent.length);
    setRandomHero(heroContent[randomIndex]);
  }, []);

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

  const handleDestinationChange = (value: string) => {
    console.log("Selected destination:", value);
    // Add logic to filter or navigate based on destination
  };

  const handleCustomizedTripClick = () => {
    navigate("/travel-form");
  };

  const handlePrePlannedTripsClick = () => {
    navigate("/pre-planned-trips");
  };

  if (!randomHero) return null; // Wait until random hero is selected

  return (
    <div>
      <VideoHero 
        videoSrc={randomHero.video}
        title={randomHero.title}
        onDestinationChange={handleDestinationChange}
        onCustomizedTripClick={handleCustomizedTripClick}
        onPrePlannedTripsClick={handlePrePlannedTripsClick}
      />
      
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