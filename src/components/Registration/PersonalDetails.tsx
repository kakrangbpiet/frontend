import { Box, TextField } from '@mui/material';
import { TravelInquiry } from '../../redux/slices/Travel/Booking/BoookTravelSlice';

interface PersonalDetailsProps {
  inquiryData: any;
  setInquiryData:any
}

/**
 * Component for collecting personal details and passenger count
 */
function PersonalDetails({ inquiryData, setInquiryData }: PersonalDetailsProps) {
  const handleChange = (field: keyof TravelInquiry, value: string | number) => {
    setInquiryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={{ padding: 2, mt: 2 }}>
      {/* Name input */}
      <TextField
        fullWidth
        label="Your Name"
        value={inquiryData.userName}
        onChange={(e) => handleChange('name', e.target.value)}
        margin="normal"
        required
      />
      
      {/* Passenger count input */}
      <TextField
        fullWidth
        label="Number of Passengers"
        type="number"
        inputProps={{ min: 1 }}
        value={inquiryData.passengerCount}
        onChange={(e) => handleChange('passengerCount', parseInt(e.target.value) || 1)}
        margin="normal"
        required
      />
      
      {/* Special requests input */}
      <TextField
        fullWidth
        label="Special Requests (Optional)"
        value={inquiryData.specialRequests}
        onChange={(e) => handleChange('specialRequests', e.target.value)}
        margin="normal"
        multiline
        rows={4}
      />
    </Box>
  );
}

export default PersonalDetails;