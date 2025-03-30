import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { isAuthenticated, selectUserType } from '../../redux/slices/login/authSlice';
import { UserCategory } from '../../Datatypes/Enums/UserEnums';
import AddTravelPackageForm from '../../components/Forms/AddPackageForm';

function AddPackagePage() {

  const userType = useSelector(selectUserType);
  const isUserAuthenticated = useSelector(isAuthenticated);
  const selectedUserType = useSelector(selectUserType);
  const navigation = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated && selectedUserType!==UserCategory.KAKRAN_SUPER_ADMIN) {
      navigation("/"); 
    }
  }, [isUserAuthenticated, history]);
  return (
    <Container className='mt-24'>
          <div>
            <AddTravelPackageForm  userType={userType} formEvent={"Add Package"} />
          </div>
    </Container>
  )
}

export default AddPackagePage