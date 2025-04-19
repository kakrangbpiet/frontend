import { Box, TextField, Button, Typography } from '@mui/material';
import { TravelInquiry } from '../../redux/slices/Travel/Booking/BoookTravelSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { SelectConactVerified, SelectContact, selectTrxId, setContactVerified } from '../../redux/slices/login/authSlice';
import { registerNumberDispatcher, registerNumberOtpDispatcher } from '../../redux/slices/login/authApiSlice';
import { AppDispatch } from '../../redux/store';

interface ContactDetailsProps {
  inquiryData: any;
  setInquiryData: any
}

/**
 * Component for collecting contact information
 */
function ContactDetails({ inquiryData, setInquiryData }: ContactDetailsProps) {
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
      const deviceId = "550e8400-e29b-41d4-a716-446655440000"; // Example device ID
      await dispatch(registerNumberOtpDispatcher({
        otp: otpInput,
        trxId,
        deviceId,
        phoneNumber: phoneInput
      }));
      
      // Only set the phone number in inquiry data after verification
      setInquiryData(prev => ({
        ...prev,
        phoneNumber: phoneInput
      }));
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const handleEditNumber = () => {
    setShowOtpField(false);
    setOtpInput('');
    dispatch(setContactVerified({ isContactVerified: false }));
    
    // You might want to dispatch an action to reset verification status if needed
  };

  const handleChange = (field: keyof TravelInquiry, value: string) => {
    setInquiryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={{ padding: 2, mt: 2 }}>
      {/* Email input */}
      <TextField
        fullWidth
        label="Email Address"
        type="email"
        value={inquiryData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        margin="normal"
        required
      />
      
      {/* Phone number verification flow */}
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
            disabled={showOtpField}
          />
          
          {!showOtpField ? (
            <Button 
              variant="contained" 
              onClick={handleSendOtp}
              disabled={!phoneInput}
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
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  onClick={handleVerifyOtp}
                  disabled={!otpInput || isContactVerified}
                  sx={{ mt: 2 }}
                >
                  Verify Phone Number
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={handleEditNumber}
                  sx={{ mt: 2 }}
                >
                  Edit Number
                </Button>
              </Box>
            </>
          )}
        </>
      ) : (
        <>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Verified Phone: {verifiedPhoneNumber}
          </Typography>
          <Button 
            variant="outlined" 
            onClick={handleEditNumber}
            sx={{ mt: 2 }}
          >
            Change Phone Number
          </Button>
          {/* Hidden field to include verified phone in form data */}
          <input type="hidden" name="phoneNumber" value={verifiedPhoneNumber || ''} />
        </>
      )}
    </Box>
  );
}

export default ContactDetails;