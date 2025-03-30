import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { isAuthenticated } from '../../redux/slices/login/authSlice';

const DashboardGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-rows: auto auto auto;
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const auth = useSelector(isAuthenticated);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <div>
      <DashboardGrid>
        Dashboard
      </DashboardGrid>
    </div>
  );
};


export default Dashboard;