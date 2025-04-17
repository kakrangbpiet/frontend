import React, { useEffect } from 'react';
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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useSelector(isAuthenticated);
  const selectedUserType = useSelector(selectUserType);
  const dispatch = useDispatch<AppDispatch>();
  
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

  return (
    <div>
      <VideoHero 
        videoSrc="trekking.mp4"
        title="Begin your unforgettable journey with Samsara Adventures—where every path leads to wonder, and every moment becomes a memory in time."
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