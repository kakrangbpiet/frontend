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
      backgroundColor: 'rgba(255, 255, 255, 0.4)', 
      borderRadius: '0.75rem',
      backdropFilter: 'blur(20px)', 
      WebkitBackdropFilter: 'blur(20px)', 
      border: '1px solid rgba(255, 255, 255, 0.3)',
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3b82f6',
      },
    },
    '& input': {
      fontWeight: '500',
      color: '#fffff',
    },
  };

  return (
    <Box sx={{ px: 2, mt: 2 }}>
      {/* Name input */}
      <div className="mb-1">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Your Name
        </label>
        {inquiryData.name && (
          <p className="text-xs text-gray-500 dark:text-gray-400">We'll use this name for your booking</p>
        )}
      </div>
      <TextField
        fullWidth
        id="name"
        placeholder="Enter your full name"
        value={inquiryData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        margin="normal"
        required
        disabled={!shouldShowRegister && isRegister}
        sx={textFieldStyle}
      />
      
      {/* Passenger count input */}
      {!isRegister && (
        <>
          <div className="mb-1 mt-4">
            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Number of Passengers
            </label>
            {inquiryData.passengerCount && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {inquiryData.passengerCount} {inquiryData.passengerCount === 1 ? 'person' : 'people'} will be traveling
              </p>
            )}
          </div>
          <TextField
            fullWidth
            id="passengers"
            placeholder="Enter number of passengers"
            type="number"
            inputProps={{ min: 1 }}
            value={inquiryData.passengerCount}
            onChange={(e) => handleChange('passengerCount', parseInt(e.target.value) || 1)}
            margin="normal"
            required
            sx={textFieldStyle}
          />
        </>
      )}
      
      {/* Special requests input */}
      {!isRegister && (
        <>
          <div className="mb-1 mt-4">
            <label htmlFor="requests" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Special Requests
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Let us know if you have any special requirements
            </p>
          </div>
          <TextField
            fullWidth
            id="requests"
            placeholder="E.g., dietary restrictions, accessibility needs, etc."
            value={inquiryData.specialRequests}
            onChange={(e) => handleChange('specialRequests', e.target.value)}
            margin="normal"
            multiline
            rows={4}
            sx={textFieldStyle}
          />
        </>
      )}
    </Box>
  );
}

export default PersonalDetails;