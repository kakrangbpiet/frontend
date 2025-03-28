import React from 'react';
import styled from 'styled-components';
import TravelItemsList from './HomeCard';

const DashboardGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-rows: auto auto auto;
`;

const HomePage: React.FC = () => {
  return (
    <div>
      <DashboardGrid>
        <TravelItemsList category="HotDeals" />
      </DashboardGrid>
    </div>
  );
};

export default HomePage;