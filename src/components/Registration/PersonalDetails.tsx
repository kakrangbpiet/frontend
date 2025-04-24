import { Box, TextField } from '@mui/material';
import { TravelInquiry } from '../../redux/slices/Travel/Booking/BoookTravelSlice';

interface PersonalDetailsProps {
  inquiryData: any;
  setInquiryData: any;
  isRegister?: boolean;
  shouldShowRegister?: boolean;
}

/**
 * Component for collecting personal details and passenger count
 */
function PersonalDetails({ inquiryData, setInquiryData, isRegister, shouldShowRegister }: PersonalDetailsProps) {
  const handleChange = (field: keyof TravelInquiry, value: string | number) => {
    setInquiryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Custom MUI styles
  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      '& fieldset': {
        borderColor: 'rgba(209, 213, 219, 1)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(59, 130, 246, 0.8)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3b82f6',
      },
    },
    '& input, & textarea': {
      fontWeight: '500',
      color: '#1f2937',
    },
  };

  return (
    <Box sx={{ px: 2, mt: 2 }}>
      {/* Name input */}
      <TextField
        fullWidth
        placeholder="Your Name"
        value={inquiryData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        margin="normal"
        required
        disabled={!shouldShowRegister && isRegister}
        sx={textFieldStyle}
      />
      
      {/* Passenger count input */}
      {!isRegister && (
        <TextField
          fullWidth
          placeholder="Number of Passengers"
          type="number"
          inputProps={{ min: 1 }}
          value={inquiryData.passengerCount}
          onChange={(e) => handleChange('passengerCount', parseInt(e.target.value) || 1)}
          margin="normal"
          required
          sx={textFieldStyle}
        />
      )}
      
      {/* Special requests input */}
      {!isRegister && (
        <TextField
          fullWidth
          placeholder="Special Requests (Optional)"
          value={inquiryData.specialRequests}
          onChange={(e) => handleChange('specialRequests', e.target.value)}
          margin="normal"
          multiline
          rows={4}
          sx={textFieldStyle}
        />
      )}
    </Box>
  );
}

export default PersonalDetails;