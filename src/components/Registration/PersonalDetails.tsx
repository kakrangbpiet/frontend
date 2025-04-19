import { Box, TextField } from '@mui/material';
import { TravelInquiry } from '../../redux/slices/Travel/Booking/BoookTravelSlice';

interface PersonalDetailsProps {
  inquiryData: any;
  setInquiryData:any
  isRegister?:boolean
  shouldShowRegister?:boolean
}

/**
 * Component for collecting personal details and passenger count
 */
function PersonalDetails({ inquiryData, setInquiryData,isRegister, shouldShowRegister }: PersonalDetailsProps) {
  const handleChange = (field: keyof TravelInquiry, value: string | number) => {
    setInquiryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={{ px: 2, mt: 2 }}>
      {/* Name input */}
      <TextField
        fullWidth
        label="Your Name"
        value={inquiryData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        margin="normal"
        required
        disabled={!shouldShowRegister && isRegister}
      />
      
      {/* Passenger count input */}
    {!isRegister &&  <TextField
        fullWidth
        label="Number of Passengers"
        type="number"
        inputProps={{ min: 1 }}
        value={inquiryData.passengerCount}
        onChange={(e) => handleChange('passengerCount', parseInt(e.target.value) || 1)}
        margin="normal"
        required
      />
    }
      
      {/* Special requests input */}
      {!isRegister &&    <TextField
        fullWidth
        label="Special Requests (Optional)"
        value={inquiryData.specialRequests}
        onChange={(e) => handleChange('specialRequests', e.target.value)}
        margin="normal"
        multiline
        rows={4}
      />
}
    </Box>
  );
}

export default PersonalDetails;