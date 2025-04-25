
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
// Header Links
export const HEADER_LINKS = [
  { to: '/', label: 'DASHBOARD',icon:<HomeIcon sx={{color:"white"}}/> },
  { to: '/about-us', label: 'ABOUT',icon:<InfoIcon sx={{color:"white"}}/> },
  { to: '/settings', label: 'SETTINGS',icon:<SettingsIcon sx={{color:"white"}}/> },
];

// Sidebar Items
export const adminSidebarItems = [
    { to: '/dashboard', label: 'Dashboard',icon: <DashboardIcon sx={{color:"white"}}/>},
    { to: '/orders', label: 'Orders',icon:<LocalMallIcon sx={{color:"white"}}/> },
    { to: '/users', label: 'Users',icon :<AnalyticsIcon sx={{color:"white"}}/>},
  ];

export const userSidebarItems = [
    { to: '/', label: 'Home',icon: <DashboardIcon sx={{color:"white"}}/>},
    // { to: '/profile', label: 'Profile',icon:<LocalMallIcon sx={{color:"white"}}/> },
    // { to: '/bookings', label: 'Bookings',icon :<AnalyticsIcon sx={{color:"white"}}/>},
  ];