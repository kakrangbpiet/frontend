
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
// Header Links
export const HEADER_LINKS = [
  { to: '/', label: 'Dashboard',icon:<HomeIcon sx={{color:"white"}}/> },
  { to: '/about-us', label: 'About',icon:<InfoIcon sx={{color:"white"}}/> },
  { to: '/settings', label: 'Settings',icon:<SettingsIcon sx={{color:"white"}}/> },
];

// Sidebar Items
export const adminSidebarItems = [
    { to: '/dashboard', label: 'Dashboard',icon: <DashboardIcon sx={{color:"white"}}/>},
    { to: '/orders', label: 'Orders',icon:<LocalMallIcon sx={{color:"white"}}/> },
    { to: '/analytics', label: 'Analytics',icon :<AnalyticsIcon sx={{color:"white"}}/>},
  ];

export const userSidebarItems = [
    { to: '/', label: 'Home',icon: <DashboardIcon sx={{color:"white"}}/>},
    { to: '/orders', label: 'Inquiries',icon:<LocalMallIcon sx={{color:"white"}}/> },
    { to: '/analytics', label: 'Bookings',icon :<AnalyticsIcon sx={{color:"white"}}/>},
  ];