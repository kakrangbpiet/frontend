import { useState } from 'react';
import { Container, Stepper, Step, StepLabel, Button, Paper, useTheme } from '@mui/material';

import AddressInfo from './AddressInfo';
import UserDetails from './UserDetails';
// import ContactDetails from './ContactDetails';
import PaymentInfo from './PaymentInfo';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserDispatcher } from '../../redux/slices/register/RegisterApiSlice';
import { selectRegistrationStatus } from '../../redux/slices/register/RegisterSlice';
import { AppDispatch } from '../../redux/store';
import { IUser } from '../../Datatypes';
import { UserCategory } from '../../Datatypes/Enums/UserEnums';

const steps = [' Location Details', 'User Details', 'Payment Details', ];

function getStepContent(step, stepData, setStepData, _handleProceedToNext) {
  switch (step) {
    case 0:
      return <AddressInfo stepData={stepData} setStepData={setStepData}/>;
    case 1:
      return <UserDetails stepData={stepData} setStepData={setStepData} />;
    //  case 2:
    //  return <ContactDetails stepData={stepData} setStepData={setStepData}/>;
     case 2:
     return <PaymentInfo stepData={stepData} setStepData={setStepData}/>;
    default:
      return 'Unknown step';
  }
}

function SellerSignup() {
  const theme = useTheme()
  const navigate=useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const [activeStep, setActiveStep] = useState(0);
  const [stepData, setStepData] = useState<IUser>({
    name: '',
    phoneNumber: '',
    address: '',
    category: UserCategory.User,
    email:"",
  });
  const registrationStatus = useSelector(selectRegistrationStatus);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setStepData({
      name: '',
      phoneNumber: '',
      address: '',
      category: UserCategory.User,
      email:''
      
    });
    navigate("/seller-dashboard")
  }

  const handleProceedToNext = () => {
    handleNext(); // Increment the activeStep
  };


  const handleRegisterSeller = async () => {
    try {
      console.log('SignUp Data:', stepData);
      dispatch(registerUserDispatcher(stepData));
      // Additional logic for submitting the form data if needed
    } catch (error) {
      console.error('Error In signUp:', error);
    }
  };


  return (
    <Container >
      <Paper elevation={3} sx={{
        mt: 4,
        p: 2,
        backgroundColor: theme.palette.background.default
      }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
        {activeStep === steps.length && registrationStatus === 'success' ? (
          <div>
            <h3>Signed Up successfully!</h3>
            <Button onClick={handleReset}>Call Now For Confirmation</Button>
          </div>
        ) : (
          <div>

           {getStepContent(activeStep, stepData, setStepData, handleProceedToNext)}
        <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={activeStep === steps.length - 1 ? handleRegisterSeller : handleNext}
              >
                {activeStep === steps.length - 1 ? 'Verify By OTP' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </Paper>
      </Container>
  );
}

export default SellerSignup;