import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../redux/slices/login/authSlice';
import { fetchTravelPackagesByCategoryApi } from '../../redux/slices/Travel/travelApiSlice';
import { AppDispatch } from '../../redux/store';
import { selectedTravelPackagesLoading, selectTravelPackagesByCategory } from '../../redux/slices/Travel/TravelSlice';
import TravelPackages from '../../components/Card/TravelPackageItems.tsx';
import { Typography } from '@mui/material';

const DashboardGrid = styled.div`

`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useSelector(isAuthenticated);
  const dispatch=useDispatch()
  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  const loadingByCategory = useSelector(selectedTravelPackagesLoading);


  const  categoryItemsHotDeals  = useSelector(selectTravelPackagesByCategory("hotdeals"));
  const  categoryItemsNew  = useSelector(selectTravelPackagesByCategory("new"));

 
  const handleLoadCategories = async () => {
    try {
      (dispatch as AppDispatch)(
        fetchTravelPackagesByCategoryApi({
          pageSize: 10,
          page: 1,
          category: "hotdeals",
          status:"active"
        })
      );
      (dispatch as AppDispatch)(
        fetchTravelPackagesByCategoryApi({
          pageSize: 10,
          page: 1,
          category: "new",
          status:"active"
        })
      );
    } catch (error) {
      console.error("Failed to fetch DropShip items:", error);
    }
  };

  useEffect(() => {
    handleLoadCategories();
   }, [dispatch,auth]);
  return (
    <div >
      <video
            className="m-0 p-0 w-[100%] h-[100%] object-cover pointer-events-none"
            src="trekking.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
      <DashboardGrid>
      <div className="px-[24px] flat-title mb-0 wow fadeInUp" data-wow-delay="0s">
        <Typography variant="h6" sx={{ mb: 0 }}>
          Hot Deals Packages
        </Typography>
        <TravelPackages travelPackages={categoryItemsHotDeals} categoryType="hotdeals"  loading={loadingByCategory["hotdeals"] || false} />
        <TravelPackages travelPackages={categoryItemsNew} categoryType="new"  loading={loadingByCategory["new"] || false} />
      </div>
      </DashboardGrid>
       
    </div>
  );
};

export default HomePage;
