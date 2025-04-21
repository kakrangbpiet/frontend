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
  // Check if user needs to register (no token and not verified)
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
      onVerified: () => {
        console.log('User registration completed');
      }
    }));
  };

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 bg-white bg-opacity-70 p-6 rounded-lg">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            My Profile
          </h1>
          <p className="text-xl text-gray-600">
            Manage your account and travel inquiries
          </p>
        </div>
          <UserDetails
            shouldShowRegister={shouldShowRegister}
            userData={userData}
            setUserData={setUserData}
            isRegister={true}
            handleRegister={handleRegister}
          />
        {!shouldShowRegister &&
          <div className="bg-white bg-opacity-80 shadow overflow-hidden sm:rounded-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-lg font-medium text-gray-900">Travel Inquiries</h3>
                <p className="mt-1 text-sm text-gray-500">
                  View and manage your travel requests
                </p>
              </div>
              <button
                onClick={navigateToInquiries}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                disabled={!isUserAuthenticated}
              >
                Go to My Inquiries
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default ProfilePage;