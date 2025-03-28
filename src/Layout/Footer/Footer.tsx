import React from 'react';
import {FooterProps} from '../../Datatypes/interface';

const Footer: React.FC<FooterProps> = ({
  companyName = 'SAMSARA',
  showSocials = true,
  variant = '',
}) => {
  const year = new Date().getFullYear();
  
  const getStyles = () => {
    return {
      footer: {
        padding: '24px 40px',
        backgroundColor: variant === 'light' ? '#f8f9fa' : '#1e2937',
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
        marginLeft:"28px"
      },
      nav: {
        display: 'flex',
        gap: '24px',
      },
      link: {
        color: variant === 'light' ? '#495057' : '#e5e7eb',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        fontSize: '14px',
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
    </footer>
  );
};

export default Footer;