import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { isAuthenticated } from '../../redux/slices/login/authSlice';
import { Button, Container } from '@mui/material';
import PackagesVerification from '../../components/AllPackagesDataGrid/AllPackagesGrid';


const MiddleRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
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
      </Container>
    </div>
  );
};


export default Dashboard;