import React, { useState, useEffect } from 'react';
import { FooterProps } from '../../Datatypes/interface';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated, logout } from '../../redux/slices/login/authSlice';
import { Container } from '@mui/material';
import PasswordlessLoginForm from '../../components/PasswordlessLoginForm';
import { Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';
// import { WhatsApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const Footer: React.FC<FooterProps> = ({
  companyName = 'SAMSARA',
  showSocials = true,
  variant = '',
}) => {
  const year = new Date().getFullYear();
  const [open, setOpen] = useState(false);
  const auth = useSelector(isAuthenticated);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderLoginDialog = () => (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <PasswordlessLoginForm 
        onVerified={() => {
          handleClose()
          // Optional: Add any post-login logic here
        }} 
      />
    </Dialog>
  );
  const footerStyle: React.CSSProperties = {
    padding: isMobile ? '24px 16px' : '32px 40px',
    background: variant === 'light'
      ? 'rgba(248, 249, 250, 0.8)'
      : 'rgba(18, 18, 18, 0.85)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderTop: `1px solid ${variant === 'light' ? 'rgba(233, 236, 239, 0.6)' : 'rgba(55, 65, 81, 0.6)'}`,
    boxShadow: variant === 'light'
      ? '0 -10px 30px rgba(0, 0, 0, 0.05)'
      : '0 -10px 30px rgba(0, 0, 0, 0.2)',
    color: variant === 'light' ? '#495057' : '#e5e7eb',
    fontFamily: 'Inter, system-ui, sans-serif',
    width: '100%',
    boxSizing: 'border-box',
  };


  const containerStyle = {
    maxWidth: '100%',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
  };

  const topSectionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '24px',
    width: '100%',
    flexDirection: isMobile ? 'column' as const : 'row' as const,
  };

  const logoStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
    letterSpacing: '0.8px',
    background: variant === 'light'
      ? 'linear-gradient(135deg, #4a6cf7 0%, #24bddf 100%)'
      : 'linear-gradient(135deg, #6e8ffb 0%, #42d3f8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: isMobile ? '16px' : '0',
  };

  const navStyle = {
    display: 'flex',
    gap: isMobile ? '16px' : '32px',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    justifyContent: isMobile ? 'center' : 'flex-end',
    width: isMobile ? '100%' : 'auto',
  };

  const linkStyle = {
    color: variant === 'light' ? '#495057' : '#e5e7eb',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontSize: '15px',
    fontWeight: 500,
    padding: '4px 0',
  };

  const buttonStyle = {
    color: variant === 'light' ? '#4a6cf7' : '#6e8ffb',
    fontSize: '15px',
    padding: '8px 16px',
    fontWeight: 500,
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    background: variant === 'light'
      ? 'rgba(74, 108, 247, 0.1)'
      : 'rgba(110, 143, 251, 0.2)',
    textTransform: 'none' as const,
  };

  // const socialIconsStyle = {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   gap: '20px',
  //   padding: '16px 0',
  //   borderTop: `1px solid ${variant === 'light' ? 'rgba(233, 236, 239, 0.6)' : 'rgba(55, 65, 81, 0.4)'}`,
  //   borderBottom: `1px solid ${variant === 'light' ? 'rgba(233, 236, 239, 0.6)' : 'rgba(55, 65, 81, 0.4)'}`,
  //   margin: '8px 0',
  //   flexWrap: 'wrap' as const,
  //   width: '100%',
  // };

  // const socialIconStyle = {
  //   width: '40px',
  //   height: '40px',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius: '12px',
  //   background: variant === 'light' 
  //     ? 'rgba(233, 236, 239, 0.8)'
  //     : 'rgba(55, 65, 81, 0.6)',
  //   backdropFilter: 'blur(5px)',
  //   WebkitBackdropFilter: 'blur(5px)',
  //   color: variant === 'light' ? '#495057' : '#e5e7eb',
  //   fontSize: '16px',
  //   fontWeight: 'bold',
  //   transition: 'all 0.3s ease',
  //   boxShadow: variant === 'light'
  //     ? '0 4px 12px rgba(0, 0, 0, 0.05)'
  //     : '0 4px 12px rgba(0, 0, 0, 0.2)',
  // };

  const copyrightStyle = {
    fontSize: '14px',
    textAlign: 'center' as const,
    color: variant === 'light' ? '#6c757d' : '#9ca3af',
    marginTop: '16px',
    fontWeight: 500,
    width: '100%',
  };

  const containerWrapperStyle = {
    width: '100%',
    maxWidth: '100%',
    padding: 0,
    zIndex:100000
  };

  return (
    <Container style={containerWrapperStyle} maxWidth={false} disableGutters>
      <footer style={footerStyle}>
        <div style={containerStyle}>
          <div style={topSectionStyle}>
            <div style={logoStyle}>{companyName}</div>
            <nav style={navStyle}>
              <div
                onClick={() => navigate('/about-us')}
                style={{ ...linkStyle, cursor: 'pointer' }}
              >
                About
              </div>
              <div
                onClick={() => navigate('/contact')}
                style={{ ...linkStyle, cursor: 'pointer' }}
              >
                Contact
              </div>
              <div
                onClick={() => navigate('/privacy-policy')}
                style={{ ...linkStyle, cursor: 'pointer' }}
              >
                Privacy Policy
              </div>
              {!auth ? (
                <Button
                  style={buttonStyle}
                  onClick={handleClickOpen}
                  disableRipple
                >
                  Login
                </Button>
              ) : (
                <Button
                  style={buttonStyle}
                  onClick={handleLogout}
                  disableRipple
                >
                  Logout
                </Button>
              )}
            </nav>
          </div>

          {showSocials && (
            <div className="flex justify-center items-center space-x-20">
              <a href="https://www.facebook.com/profile.php?id=61575410837166" target='_blank' aria-label="Facebook" className="text-white/70 hover:text-white transition">
                <Facebook size={24} />

              </a>
              <a href="https://twitter.com" target='_blank' aria-label="Twitter" className="text-white/70 hover:text-white transition">
                <Twitter size={24} />
              </a>
              <a href="https://www.instagram.com/samsara_adventures01/" target='_blank' aria-label="Instagram" className="text-white/70 hover:text-white transition">
                <Instagram size={24} />
              </a>
              <a href="https://linkedin.com" target='_blank' aria-label="LinkedIn" className="text-white/70 hover:text-white transition">
                <Linkedin size={24} />
              </a>
            </div>
          )}

          <div style={copyrightStyle}>
            © {year} {companyName}. All rights reserved.
          </div>
        </div>

        {renderLoginDialog()}
      </footer>
    </Container>
  );
};

export default Footer;