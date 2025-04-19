import { Box, TextField, Button, Typography } from '@mui/material';
import { TravelInquiry } from '../../redux/slices/Travel/Booking/BoookTravelSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { SelectConactVerified, SelectContact, selectTrxId, setContactVerified } from '../../redux/slices/login/authSlice';
import { registerNumberDispatcher, registerNumberOtpDispatcher } from '../../redux/slices/login/authApiSlice';
import { AppDispatch } from '../../redux/store';

interface ContactDetailsProps {
  inquiryData: any;
  setInquiryData: any;
  isRegister?: boolean;
  shouldShowRegister?: boolean;
}

function ContactDetails({ inquiryData, setInquiryData, isRegister, shouldShowRegister }: ContactDetailsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [phoneInput, setPhoneInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const isContactVerified = useSelector(SelectConactVerified);
  const verifiedPhoneNumber = useSelector(SelectContact);
  const trxId = useSelector(selectTrxId);

  useEffect(() => {
    if (isContactVerified) {
      setInquiryData(prev => ({
        ...prev,
        phoneNumber: verifiedPhoneNumber
      }));
    }
  }, [isContactVerified, verifiedPhoneNumber]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneInput(e.target.value);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpInput(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      await dispatch(registerNumberDispatcher(phoneInput));
      setShowOtpField(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const deviceId = "550e8400-e29b-41d4-a716-446655440000";
      await dispatch(registerNumberOtpDispatcher({
        otp: otpInput,
        trxId,
        deviceId,
        phoneNumber: phoneInput
      }));
      
      setInquiryData(prev => ({
        ...prev,
        phoneNumber: phoneInput
      }));
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const handleEditNumber = () => {
    if (shouldShowRegister) { // Only allow editing if shouldShowRegister is true
      setShowOtpField(false);
      setOtpInput('');
      dispatch(setContactVerified({ isContactVerified: false }));
    }
  };

  const handleChange = (field: keyof TravelInquiry, value: string) => {
    setInquiryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={{ px: 2 }}>
      <TextField
        fullWidth
        label="Email Address"
        type="email"
        value={inquiryData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        margin="normal"
        required
        disabled={!shouldShowRegister}
      />
      
      {!isContactVerified ? (
        <>
          <TextField
            fullWidth
            label="Phone Number"
            type="tel"
            value={phoneInput}
            onChange={handlePhoneChange}
            margin="normal"
            required
            disabled={showOtpField || !shouldShowRegister} // Disable if shouldShowRegister is false
          />
          
          {!showOtpField ? (
            <Button 
              variant="contained" 
              onClick={handleSendOtp}
              disabled={!phoneInput || !shouldShowRegister} // Disable if shouldShowRegister is false
              sx={{ mt: 2 }}
            >
              Send Verification Code
            </Button>
          ) : (
            <>
              <TextField
                fullWidth
                label="Verification Code"
                type="text"
                value={otpInput}
                onChange={handleOtpChange}
                margin="normal"
                required
                sx={{ mt: 2 }}
                disabled={!shouldShowRegister} // Disable if shouldShowRegister is false
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  onClick={handleVerifyOtp}
                  disabled={!otpInput || isContactVerified || !shouldShowRegister} // Disable if shouldShowRegister is false
                  sx={{ mt: 2 }}
                >
                  Verify Phone Number
                </Button>
                {!isRegister && (
                  <Button 
                    variant="outlined" 
                    onClick={handleEditNumber}
                    sx={{ mt: 2 }}
                    disabled={!shouldShowRegister} // Disable if shouldShowRegister is false
                  >
                    Edit Number
                  </Button>
                )}
              </Box>
            </>
          )}
        </>
      ) : (
        <>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Verified Phone: {verifiedPhoneNumber}
          </Typography>
          {shouldShowRegister && ( // Only show change button if shouldShowRegister is true
            <Button 
              variant="outlined" 
              onClick={handleEditNumber}
              sx={{ mt: 2 }}
            >
              Change Phone Number
            </Button>
          )}
          <input type="hidden" name="phoneNumber" value={verifiedPhoneNumber || ''} />
        </>
      )}
    </Box>
  );
}

export default ContactDetails;