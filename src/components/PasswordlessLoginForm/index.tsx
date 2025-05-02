  import React, { useState, useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import {
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    Box,
    // Divider,
    Container,
  } from '@mui/material';

  import { registerNumberDispatcher, registerNumberOtpDispatcher } from '../../redux/slices/login/authApiSlice';
  import { AppDispatch } from '../../redux/store';
  import { 
    authLoading, 
    SelectConactVerified, 
    SelectContact, 
    selectTrxId 
  } from '../../redux/slices/login/authSlice';

  // import GoogleIcon from '@mui/icons-material/Google';
  // import EmailIcon from '@mui/icons-material/Email';
  import PhoneIcon from '@mui/icons-material/Phone';

  interface LoginProps {
    onVerified?: (phoneNumber: string) => void;
  }

  const PasswordlessLoginForm: React.FC<LoginProps> = ({ onVerified }) => {
    const dispatch = useDispatch<AppDispatch>();
    
    // Redux state
    const isAuthLoading = useSelector(authLoading);
    const trxId = useSelector(selectTrxId);
    const isContactVerified = useSelector(SelectConactVerified);
    const verifiedContactState = useSelector(SelectContact);
    
    // Local state
    const [verifiedContact, setVerifiedContact] = useState<string>(verifiedContactState);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    useEffect(() => {
      return () => {
        // Cleanup any pending timers or async operations
      };
    }, []);
    
    useEffect(() => {
      let interval: NodeJS.Timeout;
      if (resendDisabled && resendTimer > 0) {
        interval = setInterval(() => {
          setResendTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      } else if (resendTimer === 0) {
        setResendDisabled(false);
      }
      return () => clearInterval(interval);
    }, [resendDisabled, resendTimer]);

    const handleSendOtp = async () => {
      try {
        if (!phoneNumber) {
          setError('Phone number is required');
          return;
        }
        setError('');
        await dispatch(registerNumberDispatcher(phoneNumber)).unwrap();
        setVerifiedContact(phoneNumber);
        setOtpSent(true);
        // Set resend timer
        setResendDisabled(true);
        setResendTimer(30);
      } catch (error) {
        setError('Failed to send OTP');
      }
    };

    // Handle resend OTP
    const handleResendOtp = async () => {
      if (resendDisabled) return;
      
      try {
        await dispatch(registerNumberDispatcher(phoneNumber)).unwrap();
        setResendDisabled(true);
        setResendTimer(30);
      } catch (error) {
        setError('Failed to resend OTP');
      }
    };

    // Handle OTP verification
    const handleVerifyOtp = async () => {
      try {
        if (!otp) {
          setError('OTP is required');
          return;
        }
        await dispatch(
          registerNumberOtpDispatcher({
            otp,
            trxId: trxId || '',
            deviceId: '550e8400-e29b-41d4-a716-446655440000',
            phoneNumber,
          })
        ).unwrap();
             setTimeout(() => {
        onVerified?.(verifiedContact);
      }, 100);
      } catch (error) {
        setError('Failed to verify OTP');
      }
    };

    // const handleGoogleSignIn = () => {
    //   console.log("Google sign-in clicked");
    // };


    // const handleEmailSignIn = () => {
    //   console.log("Email sign-in clicked");
    // };

    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 4,
            mb: 4,
            p: 4,
            borderRadius: 3,
            backgroundColor: '#f7f7f7',
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
        >
          <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Login to Your Account
          </Typography>
          
          <form noValidate onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={3}>
              {!isContactVerified && (
                <Grid size={{xs:12}}>
                  <Stack spacing={1}>
                    {!otpSent ? (
                      <>
                        <InputLabel htmlFor="phone-number" sx={{ fontWeight: 'medium' }}>
                          Phone Number
                        </InputLabel>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2,
                             flexDirection: { xs: 'column', md: 'row' },
                         }}>
                          <OutlinedInput
                            id="phone-number"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter phone number"
                            fullWidth
                            error={!!error && !otpSent}
                            startAdornment={<PhoneIcon sx={{ color: 'text.secondary', mr: 1 }} />}
                            sx={{
                              borderRadius: 2,
                              backgroundColor: 'white',
                              '&:hover': { backgroundColor: 'white' },
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSendOtp();
                              }
                            }}
                          />
                          <Button
                            disableElevation
                            size="large"
                            onClick={handleSendOtp}
                            variant="contained"
                            disabled={isAuthLoading}
                            sx={{
                              borderRadius: 2,
                              py: 1.5,
                              px: 3,
                              backgroundColor: 'black',
                              color: 'white',
                              fontWeight: 'bold',
                              whiteSpace: 'nowrap',
                              '&:hover': {
                                backgroundColor: '#333',
                              },
                            }}
                          >
                            SEND OTP
                          </Button>
                        </Box>
                        {error && !otpSent && (
                          <FormHelperText error sx={{ ml: 1 }}>
                            {error}
                          </FormHelperText>
                        )}
                      </>
                    ) : (
                      <>
                        <InputLabel htmlFor="otp" sx={{ fontWeight: 'medium' }}>
                          Enter OTP sent to {phoneNumber}
                        </InputLabel>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <OutlinedInput
                            id="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            fullWidth
                            error={!!error && otpSent}
                            sx={{
                              borderRadius: 2,
                              backgroundColor: 'white',
                              '&:hover': { backgroundColor: 'white' },
                              letterSpacing: '0.5rem',
                              textAlign: 'center'
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleVerifyOtp();
                              }
                            }}
                          />
                          <Button
                            disableElevation
                            size="large"
                            onClick={handleVerifyOtp}
                            variant="contained"
                            disabled={isAuthLoading}
                            sx={{
                              borderRadius: 2,
                              py: 1.5,
                              px: 3,
                              backgroundColor: 'black',
                              color: 'white',
                              fontWeight: 'bold',
                              whiteSpace: 'nowrap',
                              '&:hover': {
                                backgroundColor: '#333',
                              },
                            }}
                          >
                            VERIFY OTP
                          </Button>
                        </Box>
                        {error && otpSent && (
                          <FormHelperText error sx={{ ml: 1 }}>
                            {error}
                          </FormHelperText>
                        )}
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          mt: 2
                        }}>
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => setOtpSent(false)}
                            sx={{ 
                              color: 'primary.main',
                              '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
                            }}
                          >
                            Change number?
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            onClick={handleResendOtp}
                            disabled={resendDisabled}
                            sx={{ 
                              color: resendDisabled ? 'text.disabled' : 'primary.main',
                              '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
                            }}
                          >
                            {resendDisabled ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                          </Button>
                        </Box>
                      </>
                    )}
                  </Stack>
                </Grid>
              )}

              {/* {!otpSent && (
                <>
                  <Grid size={{xs:12}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                      <Divider sx={{ flexGrow: 1 }} />
                      <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>
                        OR CONTINUE WITH
                      </Typography>
                      <Divider sx={{ flexGrow: 1 }} />
                    </Box>
                  </Grid>

                  <Grid size={{xs:12}}>
                    <Stack spacing={2}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleSignIn}
                        sx={{
                          borderRadius: 2,
                          py: 1.5,
                          borderColor: '#ddd',
                          color: '#333',
                          backgroundColor: 'white',
                          '&:hover': {
                            backgroundColor: '#f5f5f5',
                            borderColor: '#ccc',
                          },
                        }}
                      >
                        Continue with Google
                      </Button>


                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<EmailIcon />}
                        onClick={handleEmailSignIn}
                        sx={{
                          borderRadius: 2,
                          py: 1.5,
                          borderColor: '#ddd',
                          color: '#333',
                          backgroundColor: 'white',
                          '&:hover': {
                            backgroundColor: '#f5f5f5',
                            borderColor: '#ccc',
                          },
                        }}
                      >
                        Continue with Email
                      </Button>
                    </Stack>
                  </Grid>
                </>
              )} */}
            </Grid>
          </form>

          <Typography 
            variant="body2" 
            align="center" 
            sx={{ mt: 3, color: 'text.secondary' }}
          >
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </Box>
      </Container>
    );
  };

  export default PasswordlessLoginForm;