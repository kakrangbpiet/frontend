import { Box, TextField } from '@mui/material';
import { TravelInquiry } from '../../redux/slices/Travel/Booking/BoookTravelSlice';
interface ContactDetailsProps {
  inquiryData: any;
  setInquiryData: any
}

/**
 * Component for collecting contact information
 */
function ContactDetails({ inquiryData, setInquiryData }: ContactDetailsProps) {
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
        value={inquiryData.userEmail}
        onChange={(e) => handleChange('userEmail', e.target.value)}
        margin="normal"
        required
      />
      
      {/* Phone number input */}
      <TextField
        fullWidth
        label="Phone Number"
        type="tel"
        value={inquiryData.userPhone}
        onChange={(e) => handleChange('userPhone', e.target.value)}
        margin="normal"
        required
      />
    
    </Box>
  );
}

export default ContactDetails;