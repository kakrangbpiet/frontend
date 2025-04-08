import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { isAuthenticated, selectUserType } from '../../redux/slices/login/authSlice';
import { Button, Container } from '@mui/material';
import PackagesVerification from '../../components/AllPackagesDataGrid/AllPackagesGrid';
import { UserCategory } from '../../Datatypes/Enums/UserEnums';


const MiddleRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;


const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const isUserAuthenticated = useSelector(isAuthenticated);
  const selectedUserType = useSelector(selectUserType);
  const navigation = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated && selectedUserType!==UserCategory.KAKRAN_SUPER_ADMIN) {
      navigation("/"); 
    }
  }, [isUserAuthenticated, history]);

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