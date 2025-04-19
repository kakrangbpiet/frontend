import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from '@mui/material';
import { registerNumberDispatcher, registerNumberOtpDispatcher } from '../../redux/slices/login/authApiSlice';
import { AppDispatch } from '../../redux/store';
import { authLoading, isAuthenticated, SelectConactVerified, SelectContact, selectTrxId } from '../../redux/slices/login/authSlice';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onVerified?: (phoneNumber: string) => void;
}




const PasswordlessLoginForm: React.FC<LoginProps> = ({ onVerified }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthLoading = useSelector(authLoading);
  const trxId = useSelector(selectTrxId);
  const isUserAuthenticated = useSelector(isAuthenticated);
  const isContactVerified = useSelector(SelectConactVerified);
  const [error, setError] = useState<string | null>(null);
const navigate=useNavigate()
//   const [contactVerified, setContactVerified] = useState(isContactVerified);

  const verifiedContactState = useSelector(SelectContact);
  const [verifiedContact, setVerifiedContact] = useState<string>(verifiedContactState);

  useEffect(() => {
    if (isContactVerified) {
      navigate('/profile');
      onVerified(verifiedContact);

    }
  }, [isContactVerified, navigate]);
  useEffect(() => {
    if (isUserAuthenticated) {
      navigate("/profile")
      onVerified(verifiedContact);
    //   setContactVerified(true);
    }
  }, [isUserAuthenticated, verifiedContactState]);

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState(false);

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
    } catch (error) {
        console.log(error);
        
      setError('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (!otp) {
        setError('OTP is required');
        return;
      }
      setError('');
      await dispatch(
        registerNumberOtpDispatcher({
          otp,
          trxId: trxId || '',
          deviceId: '550e8400-e29b-41d4-a716-446655440000',
          phoneNumber,
        })
      ).unwrap();
      onVerified(verifiedContact);

    } catch (error) {
      setError('Failed to verify OTP');
    }
  };


  return (
    <div>
      <form noValidate>
        <Grid container spacing={1}>
          {!isContactVerified && (
            <Grid size={{xs:12}} >
              <Stack spacing={1}>
                <InputLabel htmlFor="phone-number">Phone Number</InputLabel>
                <OutlinedInput
                  id="phone-number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  fullWidth
                  error={!!error && !otpSent}
                />
                {error && !otpSent && <FormHelperText error>{error}</FormHelperText>}
              </Stack>
            </Grid>
          )}

          {otpSent && !isContactVerified && (
            <Grid size={{xs:12}} >
              <Stack spacing={1}>
                <InputLabel htmlFor="otp">OTP</InputLabel>
                <OutlinedInput
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  fullWidth
                  error={!!error && otpSent}
                />
                {error && otpSent && <FormHelperText error>{error}</FormHelperText>}
              </Stack>
            </Grid>
          )}

          {/* {!isUserAuthenticated && isContactVerified && (
            <Grid item xs={12}>
              {openMap && <ChooseLocation setAddress={handleAddressChange} open={openMap} handleClose={toggleMapInfo} />}

              <Box
                className="relative flex items-center w-full h-12 rounded-lg border border-black focus-within:shadow-lg overflow-hidden"
                onClick={toggleMapInfo}
              >
                {formData.address && typeof formData.address === 'string' ? (
                  <Typography variant="body2" className="flex overflow-hidden">
                    {formData.address}
                  </Typography>
                ) : (
                  <Box className="grid place-items-center h-full w-16">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                    </svg>
                  </Box>
                )}
              </Box>
            </Grid>
          )} */}

          <Grid size={{xs:12}} >
            {!isContactVerified ? (
              !otpSent ? (
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  onClick={handleSendOtp}
                  variant="contained"
                  color="primary"
                  disabled={isAuthLoading}
                >
                  Send OTP
                </Button>
              ) : (
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  onClick={handleVerifyOtp}
                  variant="contained"
                  color="primary"
                  disabled={isAuthLoading}
                >
                  Verify OTP
                </Button>
              )
            ) : (
                <>
                <TextField>

                </TextField>
              
              </>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default PasswordlessLoginForm;