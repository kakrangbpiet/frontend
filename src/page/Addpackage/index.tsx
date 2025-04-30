import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isAuthenticated, selectUserType } from '../../redux/slices/login/authSlice';
import { UserCategory } from '../../Datatypes/Enums/UserEnums';
import AddTravelPackageForm from '../../components/Forms/AddPackageForm';
import { Box } from '@mui/material';

function AddPackagePage() {
  const { packageId } = useParams(); // Get packageId from URL params
  const userType = useSelector(selectUserType);
  const isUserAuthenticated = useSelector(isAuthenticated);
  const selectedUserType = useSelector(selectUserType);
  const navigation = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated && packageId && selectedUserType !== UserCategory.KAKRAN_SUPER_ADMIN) {
      navigation(`/package/${packageId}/${packageId}`); 
    }
  }, [isUserAuthenticated, navigation, selectedUserType]);

  return (
    <Box className=''>
      <AddTravelPackageForm 
        userType={userType} 
        formEvent={packageId ? "Edit Package" : "Add Package"} 
        packageId={packageId} // Pass packageId to the form
      />
    </Box>
  )
}

export default AddPackagePage