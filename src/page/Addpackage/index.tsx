import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, selectUserType } from '../../redux/slices/login/authSlice';
import { UserCategory } from '../../Datatypes/Enums/UserEnums';
import AddTravelPackageForm from '../../components/Forms/AddPackageForm';
import { Box } from '@mui/material';

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
    <Box className=''>
            <AddTravelPackageForm  userType={userType} formEvent={"Add Package"} />
    </Box>
  )
}

export default AddPackagePage