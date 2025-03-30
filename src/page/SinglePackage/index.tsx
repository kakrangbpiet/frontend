import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Container, Skeleton, Typography } from '@mui/material';


//theme
//redux
import { useNavigate, useParams } from 'react-router-dom';
import CustomSwiper from '../../components/Swiper/inde';
import { AppDispatch } from '../../redux/store';
import { selectUserType } from '../../redux/slices/login/authSlice';
import AddTravelPackageForm from '../../components/Forms/AddPackageForm';
import { fetchSingleTravelPackageApi, updateTravelPackageStatus } from '../../redux/slices/Travel/travelApiSlice';
import { ITravelPackage, useSelectedTravelPackage } from '../../redux/slices/Travel/TravelSlice';
import { TravelPackageStatus, UserCategory } from '../../Datatypes/Enums/UserEnums';
import { parseHTML, renderCustomStyles } from '../../scripts/handleTravelItemcss';

const SingleTravelPackageDetails = () => {
  const { travelPackageTitle, travelPackageId: travelPackageId } = useParams<{ travelPackageTitle: string; travelPackageId: string }>();

  const selectedTravelPackage = useSelector(useSelectedTravelPackage(travelPackageId)) as ITravelPackage | undefined;
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [isUpdating, setIsUpdating] = useState(false);

  const userType = useSelector(selectUserType);

  const handleLoadTravelPackages = () => {
    if (travelPackageId) {
      (dispatch as AppDispatch)(fetchSingleTravelPackageApi({
        itemId: travelPackageId
      }));
    }
  }

  const navigateToHome = () => {
    navigate("/")
  }

  useEffect(() => {
    handleLoadTravelPackages();
  }, [userType, travelPackageId]);

  // Perform null checks before accessing properties
  const description = selectedTravelPackage?.description ?? '';
  const image = selectedTravelPackage?.image ?? '';
  const images = selectedTravelPackage?.images ?? [image];
  const title = selectedTravelPackage?.title ?? '';
  const location = selectedTravelPackage?.location ?? '';
  const category = selectedTravelPackage?.category ?? '';
  const status = selectedTravelPackage?.status ?? 'inactive';
  const availableSpots = selectedTravelPackage?.availableSpots ?? 0;
  const travelType = selectedTravelPackage?.travelType ?? 'group';
  const price = selectedTravelPackage?.price ?? 0;
  const originalPrice = selectedTravelPackage?.originalPrice;

  const approveTravelPackage = () => {
    (dispatch as AppDispatch)(updateTravelPackageStatus({
      itemId: travelPackageId,
      setIsUpdating,
      status: TravelPackageStatus.Active
    }));
  }

  const pauseTravelPackage = () => {
    (dispatch as AppDispatch)(updateTravelPackageStatus({
      setIsUpdating,
      itemId: travelPackageId,
      status: TravelPackageStatus.InActive
    }));
  }

  return (
    <Container className='px-4 mt-24 ml-2 mr-2'>
      {description ? (
        <>
          <div>
            {userType === UserCategory.KAKRAN_SUPER_ADMIN ? (
              <div className="flex mt-6 flex-wrap justify-between items-center space-x-2 text-md mb-2 text-jacarta-400">
                {userType === UserCategory.KAKRAN_SUPER_ADMIN && 
                  <Button variant='contained' disabled={isUpdating} sx={{
                  }} onClick={status === 'inactive' ? approveTravelPackage : pauseTravelPackage}>
                    {status === 'inactive' ? 'Activate' : 'Deactivate'}
                  </Button>
                }
                <AddTravelPackageForm formEvent={"EDIT"} itemInfo={{
                  id: travelPackageId,
                  title,
                  description,
                  price,
                  originalPrice,
                  image,
                  images,
                  location,
                  category,
                  status,
                  availableSpots,
                  travelType
                }} userType={userType} />
              </div>
            ) : (
              <Box>
                <Button variant='contained' sx={{
                }}
                onClick={navigateToHome}
                >
                  Home
                </Button>

                <Typography variant='h3' sx={{ mb: 1, mt: 6 }}>
                  {travelPackageTitle}
                </Typography>

                {originalPrice && (
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                    <Typography variant='h5' sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                      ${originalPrice.toFixed(2)}
                    </Typography>
                    <Typography variant='h4' color='primary'>
                      ${price.toFixed(2)}
                    </Typography>
                  </Box>
                )}
              
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                  <CustomSwiper  images={images.map(img => `data:image/png;base64,${img}`)} />
                </Box>
                
                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 4
                }}>
                  {/* {travelPackageId && title && (
                    <AddToCart _id={travelPackageId} />
                  )} */}
                  
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography variant='body1'>
                      Location: {location}
                    </Typography>
                    <Typography variant='body1'>
                      Type: {travelType}
                    </Typography>
                    <Typography variant='body1'>
                      Status: {status}
                    </Typography>
                    {availableSpots > 0 && (
                      <Typography variant='body1'>
                        Available Spots: {availableSpots}
                      </Typography>
                    )}
                  </Box>
                </Box>
                
                {parseHTML(description).map((node, index) => renderCustomStyles(node, index))}
                
                <Box sx={{ mt: 4 }}>
                  <Typography variant='h6'>Package Details:</Typography>
                  <Typography variant='body1'>Category: {category}</Typography>
                </Box>
              </Box>
            )}
          </div>
        </>
      ) : (
        <>
          <Typography variant='h3' sx={{ mb: 1, mt: 6 }}>
            {travelPackageTitle}
          </Typography>
          <Skeleton variant="rounded" sx={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px"
          }} width={"50%"} height={"400px"} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={"40px"} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={"40px"} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={"400px"} />
        </>
      )}
    </Container>
  );
};

export default SingleTravelPackageDetails;