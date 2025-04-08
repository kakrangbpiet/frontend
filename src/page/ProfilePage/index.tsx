import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Button from '../../components/common/Button';

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

  const { userId } = useParams<{ userId: string }>();
  const naviagte = useNavigate()
  const naviagteToInquiries = () => {
    naviagte(`/inquiries/${userId}`)
  }
  return (
    <ProfileContainer>
      {userId && (
        <Box >
          <Button onClick={naviagteToInquiries}>

            Go to My Inquiries
          </Button>
        </Box>
      )}
    </ProfileContainer>
  );
};

export default ProfilePage;