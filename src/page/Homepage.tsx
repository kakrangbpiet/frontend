import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { HEADER_LINKS, navItems } from '../components/Layout/routes';

const DashboardCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 1.5rem;
  min-height: 100px;
`;

const DashboardGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-rows: auto auto auto;
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
  return (
    <Layout title="Dashboard" headerLinks={HEADER_LINKS} sidebarItems={navItems}>
      <div>
        <small>Dashboard</small>
      </div>
      
      <DashboardGrid>
        <TopRow>
          <DashboardCard />
          <DashboardCard />
        </TopRow>
        
        <MiddleRow>
          <DashboardCard />
          <DashboardCard />
        </MiddleRow>
        
        <BottomRow>
          <DashboardCard />
        </BottomRow>
      </DashboardGrid>
    </Layout>
  );
};

export default Dashboard;