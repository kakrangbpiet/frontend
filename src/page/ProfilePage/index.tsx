import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated, JwtPayload, selectToken } from '../../redux/slices/login/authSlice';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import UserDetails from './userDetailsJwt';
import { registerUserDispatcher } from '../../redux/slices/login/authApiSlice';
import { AppDispatch } from '../../redux/store';
import { SignUpData } from '../../Datatypes';
import { accountStatus, UserCategory } from '../../Datatypes/Enums/UserEnums';

const ProfilePage = () => {
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const isUserAuthenticated = useSelector(isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();
  const [userData, setUserData] = useState<SignUpData>({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    accountStatus: accountStatus.pending
  });
  const shouldShowRegister = !isUserAuthenticated;

  useEffect(() => {
    const getUserInfoFromToken = () => {
      if (!token) return null;
      try {
        const decoded = jwtDecode(token) as JwtPayload;
        const userInfo = {
          name: decoded.name,
          email: decoded.email,
          phoneNumber: decoded.phoneNumber,
          address: decoded.address,
        };
        if (userInfo) {
          setUserData(userInfo);
        }
        return decoded.sub;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    };

    getUserInfoFromToken();
  }, [token]);

  const getUserIdFromToken = () => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token) as JwtPayload;
      if (decoded && typeof decoded === 'object' && 'id' in decoded) {
        return (decoded as { id: string }).id;
      }
      return decoded.sub;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const navigateToInquiries = () => {
    const userId = getUserIdFromToken();
    if (userId) {
      navigate(`/inquiries/${userId}`);
    } else {
      console.error('No user ID found in token');
    }
  };

  const handleRegister = () => {
    const emptyUserData = {
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      address: userData.address,
      accountStatus: accountStatus.pending,
      category: UserCategory.User,
    };

    dispatch(registerUserDispatcher({
      userData: emptyUserData,
      onVerified: () => {}
    }));
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-white/10 via-gray-800/20 to-black/30 py-12 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 backdrop-blur-lg bg-white/20 p-6 rounded-xl shadow-lg mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-purple-100/30 opacity-40"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-gray-800 sm:text-5xl mb-4 bg-gradient-to-r from-white/80 via-white/60 to-white/80 bg-clip-text text-transparent">
              My Profile
            </h2>
            <p className="text-xl  text-gray-800 ">
              Manage your account and travel inquiries
            </p>
          </div>
        </div>
        
        <div className="backdrop-blur-lg bg-white/20 p-6 rounded-xl shadow-lg mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-purple-50/20 opacity-30"></div>
          <div className="relative z-10">
            <UserDetails
              shouldShowRegister={shouldShowRegister}
              userData={userData}
              setUserData={setUserData}
              isRegister={true}
              handleRegister={handleRegister}
            />
          </div>
        </div>
        
        {!shouldShowRegister && (
          <div className="backdrop-blur-lg bg-white/20 shadow-lg rounded-xl p-6 relative overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50/20 to-emerald-50/20 opacity-30"></div>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800">Travel Inquiries</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    View and manage your travel requests
                  </p>
                </div>
                <button
                  onClick={navigateToInquiries}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                  disabled={!isUserAuthenticated}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Go to My Inquiries
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;