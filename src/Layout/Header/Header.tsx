import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  title?: string;
  links: Array<{
    to: string;
    label: string;
  }>;
  auth: any;
  mobileMenuOpen: any;
  toggleMobileMenu: any;
  isMobile: any;
}

const Header: React.FC<HeaderProps> = ({
  links,
  mobileMenuOpen,
  toggleMobileMenu,
  isMobile
}) => {
  const navigate = useNavigate();
  return (
    <header className="fixed z-100 pt-0 px-3 sm:px-6 md:px-6 lg:px-12 flex justify-between items-center w-full">
      <div className="flex items-center justify-center h-16 w-32  md:h-24 md:w-40" onClick={() => navigate('/')}>
        <img src={"/Samsara-Logo.svg"} alt="Logo" className="object-contain" />
      </div>

      <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
        <nav className="flex space-x-8 lg:space-x-12 text-white tracking-wide text-lg">
          {links.map((link, index) => (
            <div className={`hover:text-gray-400 text-white text-xl font-extralight  px-3 py-2 rounded 
                ${window.location.pathname === link.to ? 'bg-transparent' : 'bg-transparent'}`}
              key={index}
              onClick={() => navigate(link.to)}
            >
              {link.label}
            </div>
          ))}
        </nav>
      </div>

      <div className="flex items-center">
        {/* Desktop buttons */}
        <div className="hidden md:flex space-x-4 ml-8">
          <button className="text-white hover:text-gray-300">Switch to App</button>
          <button
            onClick={() => navigate('/profile')}
            className="bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-700"
          >
            Profile
          </button>
        </div>

        {isMobile && (
          <button
            className="text-white p-2 relative z-20"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ?
              <X size={24} /> :
              <Menu size={24} style={{ color: 'white' }} />
            }
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;