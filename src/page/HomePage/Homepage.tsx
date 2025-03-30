import React, { useEffect } from 'react';
import styled from 'styled-components';
import TravelItemsList from './HomeCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../redux/slices/login/authSlice';

const DashboardGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-rows: auto auto auto;

  @media (max-width: 768px) {
    margin-left: 50px;
  }
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useSelector(isAuthenticated);

  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);
  return (
    <div>
      <DashboardGrid>
        <TravelItemsList category="hotdeals" />
      </DashboardGrid>
    </div>
  );
};

export default HomePage;
