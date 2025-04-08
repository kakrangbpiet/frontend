import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Button from '../../components/common/Button';
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/slices/login/authSlice';
import { jwtDecode } from 'jwt-decode'; // Make sure to install this package

const ProfileContainer = styled.div`
  text-align: center;
  padding: 40px;
  
  h1 {
    font-size: 72px;
    color: #197642;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 20px;
    margin-bottom: 24px;
  }
  
  a {
    display: inline-block;
    background-color: #197642;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    
    &:hover {
      background-color: #0f5730;
    }
  }
`;

const ProfilePage = () => {
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  // Function to decode the token and get user ID
const getUserIdFromToken = () => {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    
    // Type guard to check if the decoded object has an 'id' property
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
      // You might want to handle this case, e.g., redirect to login
    }
  };

  return (
    <ProfileContainer>
      <Box>
        <Button onClick={navigateToInquiries}>
          Go to My Inquiries
        </Button>
      </Box>
    </ProfileContainer>
  );
};

export default ProfilePage;