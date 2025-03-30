import React, { useState } from 'react';
import { FooterProps } from '../../Datatypes/interface';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoginForm from '../../components/Login';
import { UserCategory } from '../../Datatypes/Enums/UserEnums';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated, logout } from '../../redux/slices/login/authSlice';

const Footer: React.FC<FooterProps> = ({
  companyName = 'SAMSARA',
  showSocials = true,
  variant = '',
}) => {
  const year = new Date().getFullYear();
  const [open, setOpen] = useState(false);
  const auth = useSelector(isAuthenticated);
  const dispatch=useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
   dispatch(logout())
  };
  const isMobile = window.innerWidth <= 768; 
  const getStyles = () => {
    return {
      footer: {
        padding: '24px 40px',
        backgroundColor: variant === 'light' ? '#f8f9fa' : '#121212',
        color: variant === 'light' ? '#495057' : '#e5e7eb',
        borderTop: `1px solid ${variant === 'light' ? '#e9ecef' : '#374151'}`,
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      container: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '20px',
        ...(isMobile && { marginLeft: '40px' }), // Only applies if mobile
    },
      topSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap' as const,
        gap: '16px',
      },
      logo: {
        fontSize: '20px',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
      },
      nav: {
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
      },
      link: {
        color: variant === 'light' ? '#495057' : '#e5e7eb',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        fontSize: '14px',
      },
      loginButton: {
        color: variant === 'light' ? '#495057' : '#e5e7eb',
        fontSize: '14px',
        padding: '0',
        minWidth: '0',
        '&:hover': {
          backgroundColor: 'transparent',
          textDecoration: 'underline',
        },
      },
      socialIcons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
      },
      socialIcon: {
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: variant === 'light' ? '#e9ecef' : '#374151',
        color: variant === 'light' ? '#495057' : '#e5e7eb',
        transition: 'all 0.2s ease',
      },
      copyright: {
        fontSize: '14px',
        textAlign: 'center' as const,
        color: variant === 'light' ? '#6c757d' : '#9ca3af',
        marginTop: '16px',
      },
    };
  };

  const styles = getStyles();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.topSection}>
          <div style={styles.logo}>{companyName}</div>
          <nav style={styles.nav}>
            <a href="/about" style={styles.link}>About</a>
            <a href="/services" style={styles.link}>Services</a>
            <a href="/contact" style={styles.link}>Contact</a>
            <a href="/privacy" style={styles.link}>Privacy Policy</a>
           {!auth ?( <Button 
              style={styles.loginButton} 
              onClick={handleClickOpen}
              disableRipple
            >
              Login
            </Button>
           ):(<Button
              style={styles.loginButton}
              onClick={handleLogout}
              disableRipple
            >
              logout
            </Button>)}
          </nav>
        </div>
        
        {showSocials && (
          <div style={styles.socialIcons}>
            <a href="https://facebook.com" style={styles.socialIcon} aria-label="Facebook">
              FB
            </a>
            <a href="https://twitter.com" style={styles.socialIcon} aria-label="Twitter">
              TW
            </a>
            <a href="https://instagram.com" style={styles.socialIcon} aria-label="Instagram">
              IG
            </a>
            <a href="https://linkedin.com" style={styles.socialIcon} aria-label="LinkedIn">
              IN
            </a>
          </div>
        )}
        
        <div style={styles.copyright}>
          © {year} {companyName}. All rights reserved.
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <LoginForm loginTitle="" OnFormSuccess={handleClose} userType={UserCategory.KAKRAN_SUPER_ADMIN} />
      </Dialog>
    </footer>
  );
};

export default Footer;