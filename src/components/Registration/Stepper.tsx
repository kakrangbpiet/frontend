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
import { accountStatus, UserCategory } from '../../Datatypes/Enums/UserEnums.ts';
import { isAuthenticated, JwtPayload, selectToken,} from '../../redux/slices/login/authSlice.tsx';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Extend JwtPayload to include custom properties
/**
 * Steps for the travel inquiry process:
 * 1. Location Details - Where they want to travel
 * 2. Personal Details - Basic information about the traveler
 * 3. Contact Details - How to reach the traveler
 */
const inquirySteps = [
  'Travel Destination', 
  'Personal Information', 
  'Contact Details'
];

/**
 * Renders the appropriate component based on the current step
 * @param step Current step index
 * @param inquiryData Current inquiry data
 * @param setInquiryData Function to update inquiry data
 * @returns JSX component for the current step
 */
function getStepContent(step: number, inquiryData: TravelInquiry, setInquiryData: React.Dispatch<React.SetStateAction<TravelInquiry>>) {
  switch (step) {
    case 0:
      return <LocationDetails inquiryData={inquiryData} setInquiryData={setInquiryData} />;
    case 1:
      return <PersonalDetails inquiryData={inquiryData} setInquiryData={setInquiryData} />;
    case 2:
      return <ContactDetails inquiryData={inquiryData} setInquiryData={setInquiryData} />;
    default:
      return 'Unknown step';
  }
}

// Type definition for travel inquiry data

function TravelInquiryForm({packageId, packageTitle}: {packageId: string, packageTitle: string}) {
  const dispatch=useDispatch<AppDispatch>()
  const [activeStep, setActiveStep] = useState(0);
  const auth = useSelector(isAuthenticated);
  const token = useSelector(selectToken);
  
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
  
  // Initialize inquiry data with default values
  const [inquiryData, setInquiryData] = useState<TravelInquiry>({
    packageId:packageId,
    packageTitle:packageTitle,
    destination: packageTitle,
    address: "",
    travelDates: '',
    passengerCount: 1,
    name: userDetails?.name || '',
    email: userDetails?.email || '',
    phoneNumber: userDetails?.phoneNumber || '',
    specialRequests: ''
  });

  /**
   * Handles moving to the next step in the inquiry process
   */
  const handleNext = () => {
    // Validate current step data before proceeding
    if (validateCurrentStep()) {
      setActiveStep(activeStep + 1);
    }
  };

  /**
   * Handles returning to the previous step
   */
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  /**
   * Resets the form and navigates to the home page
   */
  // const handleReset = () => {
  //   setInquiryData({
  //     packageId:packageId,
  //     packageTitle:packageTitle,
  //     destination: packageTitle,
  //     departure: '',
  //     travelDates: '',
  //     passengerCount: 1,
  //     name: '',
  //     email: '',
  //     phoneNumber: '',
  //     specialRequests: ''
  //   });
  //   // navigate("/");
  // };
  /**
   * Resets the form and navigates to the home page
   */
  const navigateToProfile = () => {
    navigate("/profile");
  };

  /**
   * Validates the data for the current step
   * @returns boolean indicating if the data is valid
   */
  const validateCurrentStep = (): boolean => {
    switch (activeStep) {
      case 0: // Location Details
        if (!inquiryData.destination  || !inquiryData.travelDates) {
          alert('Please fill in all required fields');
          return false;
        }
        return true;
      case 1: // Personal Details
        if (!inquiryData.name || inquiryData.passengerCount < 1) {
          alert('Please provide your name and at least 1 passenger');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  /**
   * Submits the travel inquiry to the server
   */
  const submitTravelInquiry = async () => {
    try {
      // Here you would typically dispatch an action to send the inquiry to your backend
      if (!inquiryData.phoneNumber) {
        alert('Please provide your phone number');
        return false;
      }
      if (!inquiryData.email && !auth) {
        alert('Please provide your email');
        return false;
      }
      // For now, we'll simulate a successful submission
      // dispatch(submitInquiryDispatcher(inquiryData));
      const modifiedInquiryData = {
        ...inquiryData,
        category: UserCategory.User,
        address: "address",
        accountStatus: accountStatus.pending,
      };
      if (!auth) {
        // If not authenticated, register first, then create inquiry
        const registrationResult = await dispatch(registerUserDispatcher({userData:modifiedInquiryData})).unwrap();
        
        // Only proceed if registration was successful
        if (registrationResult) {
          await dispatch(createTravelInquiry(inquiryData));
          handleNext(); // Move to success step
        }
      } else {
        // If already authenticated, just create the inquiry
        await dispatch(createTravelInquiry(inquiryData));
        handleNext(); // Move to success step
      }
      
      // handleReset();
      // handleNext()
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('There was an error submitting your inquiry. Please try again.');
    }
  };

  return (
    <Container >
      <Paper elevation={3} sx={{ mt: 4, mb: 4, p: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Travel Inquiry Form
        </Typography>
        
        {/* Stepper showing progress through the form */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {inquirySteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Show success message or form content */}
        {activeStep === inquirySteps.length ? (
          <div>
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              Thank you for your inquiry!
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button 
                variant="contained" 
                onClick={navigateToProfile}
                sx={{ mr: 1 }}
              >
                View Updates
              </Button>
            </Box>
          </div>
        ) : (
          <div>
            {/* Render the current step's form */}
            {getStepContent(activeStep, inquiryData, setInquiryData)}
            
            {/* Navigation buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              
              <Button
                variant="contained"
                onClick={activeStep === inquirySteps.length - 1 ? submitTravelInquiry : handleNext}
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