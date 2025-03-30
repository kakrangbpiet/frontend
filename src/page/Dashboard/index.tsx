import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { isAuthenticated } from '../../redux/slices/login/authSlice';
import { Button, Container } from '@mui/material';
import PackagesVerification from '../../components/CustomDataGrid/AllPackagesGrid';

const DashboardGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-rows: auto auto auto;
`;
const DashboardCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 1.5rem;
  min-height: 100px;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const MiddleRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const BottomRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const auth = useSelector(isAuthenticated);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  const addTravelPackage=()=>{
    navigate("/addTravelPackage");
  }

  return (
    <div>
      <Container>
        <MiddleRow>
         Dashboard
          <Button variant="contained" color="primary" onClick={addTravelPackage}>
            Add Package
          </Button>
        </MiddleRow>
        <PackagesVerification  />

          <DashboardCard />
        
      </Container>
    </div>
  );
};


export default Dashboard;