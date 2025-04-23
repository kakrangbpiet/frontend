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
    <Container maxWidth="xl" sx={{ width: '98%' }}>
      <Paper 
        elevation={0} 
        sx={{ 
          mt: 2, 
          mb: 4, 
          p: 4,
          height: 'auto',
          minHeight: '600px',
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(16, 16, 22, 0.63)', 
          borderRadius: '20px',
          border: '1px solid rgba(180, 180, 190, 0.6)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.3s ease',
          '&:hover': {
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(45, 46, 41, 0.9)',
            boxShadow: '0 15px 50px rgba(0, 0, 0, 0.25)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            background: 'linear-gradient(135deg, rgba(230, 230, 250, 0.5) 0%, rgba(200, 200, 240, 0.4) 100%)',
            borderRadius: '20px',
          }
        }}
      >
        <Typography 
          variant="h4"
          align="center" 
          sx={{
            fontWeight: 700,
            color: 'rgba(30, 30, 70, 0.95)', 
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
            mb: 4, 
            letterSpacing: '1px'
          }}
        >
          Travel Inquiry Form
        </Typography>
        
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel
          sx={{
            mb: 5,
            '& .MuiStepLabel-root .Mui-completed': {
              color: 'rgba(20, 80, 160, 0.95)', 
            },
            '& .MuiStepLabel-root .Mui-active': {
              color: 'rgba(10, 60, 140, 1)', 
            },
            '& .MuiStepLabel-label': {
              mt: 1.5,
              color: 'rgba(20, 20, 50, 0.95)',
              fontWeight: 700, 
              fontSize: '1.1rem',
            },
            '& .MuiStepConnector-line': {
              borderColor: 'rgba(60, 60, 100, 0.7)',
              borderWidth: '2px',
            },
            '& .MuiStepIcon-root': {
              fontSize: '2rem',
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))', 
            },
            '& .MuiStepIcon-text': {
              fill: '#ffffff', 
              fontWeight: 'bold',
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
            p: 5,
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(230, 230, 250, 0.7)', //  background for success message
            borderRadius: '16px',
            border: '1px solid rgba(180, 180, 190, 0.6)',
            boxShadow: 'inset 0 2px 10px rgba(255, 255, 255, 0.3)',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Typography 
              variant="h5"
              sx={{ 
                color: 'rgba(20, 20, 60, 0.95)', // darker text for visibility
                mb: 4,
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
                fontWeight: 700, // Bolder text
                letterSpacing: '0.5px',
              }}
            >
              Thank you for your inquiry!
            </Typography>
            <Button 
              variant="contained" 
              onClick={navigateToProfile}
              sx={{ 
                mt: 3,
                py: 1.5,
                px: 5,
                background: 'linear-gradient(135deg, rgba(25, 80, 170, 0.95) 0%, rgba(10, 40, 130, 1) 100%)', // Darker blue button
                backdropFilter: 'blur(8px)',
                borderRadius: '10px',
                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3), 0 2px 5px rgba(50, 90, 200, 0.4)',
                textTransform: 'none',
                color: '#ffffff', 
                fontWeight: 700, // Bolder text
                letterSpacing: '0.5px',
                fontSize: '1.1rem',
                border: '1px solid rgba(60, 100, 200, 0.7)',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(35, 90, 180, 1) 0%, rgba(20, 50, 150, 1) 100%)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35), 0 3px 8px rgba(50, 90, 200, 0.5)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              View Updates
            </Button>
          </Box>
        ) : (
          <div>
            <Box sx={{ 
              backdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(240, 240, 255, 0.7)', // Lighter background for form content
              borderRadius: '16px',
              p: 4,
              mb: 4,
              minHeight: '320px',
              border: '1px solid rgba(180, 180, 190, 0.6)',
              boxShadow: 'inset 0 1px 8px rgba(255, 255, 255, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              {getStepContent(activeStep, inquiryData, setInquiryData, selectedPackage?.dateAvailabilities || [])}
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, px: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ 
                  color: 'rgba(20, 20, 60, 0.95)', //  dark text for visibility
                  borderRadius: '10px',
                  textTransform: 'none',
                  border: '1px solid rgba(70, 70, 100, 0.7)', // arker border
                  backdropFilter: 'blur(4px)',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  backgroundColor: activeStep === 0 ? 'rgba(200, 200, 220, 0.5)' : 'rgba(210, 210, 230, 0.7)',
                  '&:hover': {
                    backgroundColor: 'rgba(190, 190, 210, 0.85)',
                    borderColor: 'rgba(50, 50, 90, 0.8)',
                    transform: 'translateY(-2px)',
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(80, 80, 110, 0.5)', // Darker disabled text
                    border: '1px solid rgba(100, 100, 130, 0.5)',
                  },
                  letterSpacing: '0.5px',
                  fontWeight: 700, // Bolder text
                  transition: 'all 0.3s ease',
                }}
              >
                Back
              </Button>
              
              <Button
                variant="contained"
                onClick={activeStep === inquirySteps.length - 1 ? submitTravelInquiry : handleNext}
                sx={{ 
                  background: 'linear-gradient(135deg, rgba(25, 80, 170, 0.95) 0%, rgba(10, 40, 130, 1) 100%)', // Darker blue button
                  backdropFilter: 'blur(8px)',
                  borderRadius: '10px',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3), 0 2px 5px rgba(50, 90, 200, 0.4)',
                  textTransform: 'none',
                  color: '#ffffff', 
                  fontWeight: 700, 
                  letterSpacing: '0.5px',
                  border: '1px solid rgba(60, 100, 200, 0.7)',
                  px: 4.5,
                  py: 1.5,
                  fontSize: '1rem',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(35, 90, 180, 1) 0%, rgba(20, 50, 150, 1) 100%)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35), 0 3px 8px rgba(50, 90, 200, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
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