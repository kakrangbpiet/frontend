import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';

// Dashboard card styling
const DashboardCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 1.5rem;
  min-height: 100px;
`;

// Grid layout styling
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

// Icons for sidebar
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const ShoppingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

const LayersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

const Dashboard = () => {
  const headerLinks = [
    { to: '/', label: 'Dashboard' },
    { to: '/analytics', label: 'Analytics' },
    { to: '/settings', label: 'Settings' },
  ];
  
  const sidebarItems = [
    { to: '/', label: 'Dashboard', icon: <DashboardIcon /> },
    { to: '/shop', label: 'Shop', icon: <ShoppingIcon /> },
    { to: '/charts', label: 'Charts', icon: <ChartIcon /> },
    { to: '/layers', label: 'Layers', icon: <LayersIcon /> },
  ];
  
  return (
    <Layout
      title="Dashboard"
      headerLinks={headerLinks}
      sidebarItems={sidebarItems}
    >
      <div>
        <small>Dashboard</small>
        <h1>Dashboard</h1>
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