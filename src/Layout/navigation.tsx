
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
// Header Links
export const HEADER_LINKS = [
  { to: '/', label: 'Dashboard' },
  { to: '/analytics', label: 'Analytics',icon:<AnalyticsIcon/> },
  { to: '/settings', label: 'Settings',icon:<SettingsIcon/> },
];

// Sidebar Items
export const sidebarItems = [
    { to: '/dashboard', label: 'Dashboard',icon: <DashboardIcon/>},
    { to: '/orders', label: 'Orders',icon:<LocalMallIcon/> },
    { to: '/analytics', label: 'Analytics',icon :<AnalyticsIcon/>},
    { to: '/layers', label: 'Layers' }
  ];