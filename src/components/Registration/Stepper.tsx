import { useState } from 'react';
import { Container, Stepper, Step, StepLabel, Button, Paper, Typography, Box } from '@mui/material';

// Components for each step of the inquiry process
import LocationDetails from './LocationDetails.tsx';
import PersonalDetails from './PersonalDetails';
import ContactDetails from './ContactDetails';
import { TravelInquiry } from '../../redux/slices/Travel/Booking/BoookTravelSlice.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserDispatcher } from '../../redux/slices/login/authApiSlice.tsx';
import { AppDispatch } from '../../redux/store.ts';
import { createTravelInquiry } from '../../redux/slices/Travel/Booking/BookTravelApiSlice.tsx';
import { isAuthenticated, JwtPayload, selectToken,} from '../../redux/slices/login/authSlice.tsx';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { DateAvailability, useSelectedTravelPackage } from '../../redux/slices/Travel/TravelSlice.tsx';
import { formatDate } from '../../page/SinglePackage/DateAvailability.tsx';
import { accountStatus, UserCategory } from '../../Datatypes/Enums/UserEnums.ts';

const inquirySteps = [
  'Travel Destination', 
  'Personal Information', 
  'Contact Details'
];

function getStepContent(step: number, inquiryData: TravelInquiry, setInquiryData: React.Dispatch<React.SetStateAction<TravelInquiry>>, dateAvailabilities:DateAvailability[]) {
  switch (step) {
    case 0:
      return <LocationDetails inquiryData={inquiryData} setInquiryData={setInquiryData} dateAvailabilities={dateAvailabilities} />;
    case 1:
      return <PersonalDetails inquiryData={inquiryData} setInquiryData={setInquiryData} />;
    case 2:
      return <ContactDetails inquiryData={inquiryData} setInquiryData={setInquiryData} />;
    default:
      return 'Unknown step';
  }
}

function TravelInquiryForm({packageId, packageTitle}: {packageId: string, packageTitle: string}) {
  const dispatch=useDispatch<AppDispatch>()
  const [activeStep, setActiveStep] = useState(0);
  const auth = useSelector(isAuthenticated);
  const token = useSelector(selectToken);
  const selectedPackage = useSelector(useSelectedTravelPackage(packageId));

  const navigate=useNavigate()
  const getUserDetailsFromToken = (token: string | null): {name?: string, email?: string, phoneNumber?: string} => {
    if (!token) return {};
    try {
      const decoded = jwtDecode(token) as JwtPayload;
      return {
        name: decoded.name,
        email: decoded.email,
        phoneNumber: decoded.phoneNumber
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return {};
    }
  };
  const userDetails = getUserDetailsFromToken(token);
  
  const [inquiryData, setInquiryData] = useState<TravelInquiry>({
    packageId:packageId,
    packageTitle:packageTitle,
    destination: packageTitle,
    address: "",
    tripType: 'custom',
    startDate: null,
    endDate: null,
    passengerCount: 1,
    name: userDetails?.name || '',
    email: userDetails?.email || '',
    phoneNumber: userDetails?.phoneNumber || '',
    specialRequests: ''
  });

  const handleNext = () => {
    if (validateCurrentStep()) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const validateCurrentStep = (): boolean => {
    switch (activeStep) {
      case 0:
        if (!inquiryData.address) {
          alert('Please select your current location');
          return false;
        }
        if (inquiryData.tripType === 'pre-planned' && (!inquiryData.startDate || !inquiryData.endDate)) {
          alert('Please select a travel date from the available options');
          return false;
        }
        if (inquiryData.tripType === 'custom' && (!inquiryData.startDate || !inquiryData.endDate)) {
          alert('Please select your custom travel dates');
          return false;
        }
        if (inquiryData.startDate && inquiryData.endDate && inquiryData.startDate > inquiryData.endDate) {
          alert('End date must be after start date');
          return false;
        }
        return true;
    case 1:
        if (!inquiryData.name || inquiryData.passengerCount < 1) {
          alert('Please provide your name and at least 1 passenger');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const submitTravelInquiry = async () => {
    try {
      if (!inquiryData.phoneNumber) {
        alert('Please provide your phone number');
        return false;
      }
      if (!inquiryData.email && !auth) {
        alert('Please provide your email');
        return false;
      }
      
      const inquiryToSend = {
        ...inquiryData,
        category: UserCategory.User,
        accountStatus: accountStatus.pending,
        formattedStartDate: inquiryData.startDate ? formatDate(inquiryData.startDate) : undefined,
        formattedEndDate: inquiryData.endDate ? formatDate(inquiryData.endDate) : undefined
      };
      
      if (!auth) {
        const registrationResult = await dispatch(registerUserDispatcher({userData:inquiryToSend})).unwrap();
        
        if (registrationResult) {
          await dispatch(createTravelInquiry(inquiryToSend));
          handleNext();
        }
      } else {
        await dispatch(createTravelInquiry(inquiryToSend));
        handleNext();
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('There was an error submitting your inquiry. Please try again.');
    }
  };

  return (
    <Container maxWidth="xl" sx={{ width: '92%' }}>
      <Paper 
        elevation={0} 
        sx={{ 
          mt: 4, 
          mb: 4, 
          p: 3,
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(128, 128, 128, 0.1)', // Gray with high transparency
          borderRadius: '16px',
          border: '1px solid rgba(211, 211, 211, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.3s ease',
          '&:hover': {
            backdropFilter: 'blur(15px)',
            backgroundColor: 'rgba(128, 128, 128, 0.15)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            background: 'linear-gradient(135deg, rgba(211, 211, 211, 0.2) 0%, rgba(128, 128, 128, 0.05) 100%)',
            borderRadius: '16px',
          }
        }}
      >
        <Typography 
          variant="h5" 
          align="center" 
          sx={{
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            mb: 2
          }}
        >
          Travel Inquiry Form
        </Typography>
        
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel
          sx={{
            mb: 3,
            '& .MuiStepLabel-root .Mui-completed': {
              color: 'rgba(255, 255, 255, 0.8)',
            },
            '& .MuiStepLabel-root .Mui-active': {
              color: 'rgba(255, 255, 255, 0.9)',
            },
            '& .MuiStepLabel-label': {
              mt: 1,
              color: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiStepConnector-line': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }
          }}
        >
          {inquirySteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === inquirySteps.length ? (
          <Box sx={{ 
            textAlign: 'center',
            p: 3,
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(211, 211, 211, 0.1)',
            borderRadius: '12px',
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 2
              }}
            >
              Thank you for your inquiry!
            </Typography>
            <Button 
              variant="contained" 
              onClick={navigateToProfile}
              sx={{ 
                mt: 1,
                py: 1,
                px: 3,
                background: 'linear-gradient(135deg, rgba(211, 211, 211, 0.3) 0%, rgba(128, 128, 128, 0.2) 100%)',
                backdropFilter: 'blur(8px)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                textTransform: 'none',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 500,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(211, 211, 211, 0.4) 0%, rgba(128, 128, 128, 0.3) 100%)',
                }
              }}
            >
              View Updates
            </Button>
          </Box>
        ) : (
          <div>
            <Box sx={{ 
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(211, 211, 211, 0.1)',
              borderRadius: '12px',
              p: 2.5,
              mb: 2,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              {getStepContent(activeStep, inquiryData, setInquiryData, selectedPackage?.dateAvailabilities || [])}
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '8px',
                  textTransform: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(4px)',
                  backgroundColor: activeStep === 0 ? 'rgba(128, 128, 128, 0.05)' : 'rgba(128, 128, 128, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(128, 128, 128, 0.2)',
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(255, 255, 255, 0.3)',
                  }
                }}
              >
                Back
              </Button>
              
              <Button
                variant="contained"
                onClick={activeStep === inquirySteps.length - 1 ? submitTravelInquiry : handleNext}
                sx={{ 
                  background: 'linear-gradient(135deg, rgba(211, 211, 211, 0.3) 0%, rgba(128, 128, 128, 0.2) 100%)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  textTransform: 'none',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(211, 211, 211, 0.4) 0%, rgba(128, 128, 128, 0.3) 100%)',
                  }
                }}
              >
                {activeStep === inquirySteps.length - 1 ? 'Submit Inquiry' : 'Next'}
              </Button>
            </Box>
          </div>
        )}
      </Paper>
    </Container>
  );
}

export default TravelInquiryForm;