import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../redux/slices/login/authSlice';
import { Typography } from '@mui/material';
import { fetchTravelPackagesByCategoryApi } from '../../redux/slices/Travel/travelApiSlice';
import { AppDispatch } from '../../redux/store';
import { selectedTravelPackagesLoading, selectTravelPackagesByCategory } from '../../redux/slices/Travel/TravelSlice';
import TravelPackages from '../../components/Card/TravelPackageItems.tsx';

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
          category: "hotdeals",
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
    <div>
      <DashboardGrid>
      <Typography variant="h3" sx={{ mt: 4 }} className="text-center mt-8 mb-2">
          Top Products
        </Typography>
        <TravelPackages travelPackages={categoryItemsHotDeals} categoryType="hotdeals"  loading={loadingByCategory["hotdeals"] || false} />
      </DashboardGrid>
       
    </div>
  );
};

export default HomePage;
