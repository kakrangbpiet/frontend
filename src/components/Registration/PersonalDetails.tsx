import { Box, TextField } from '@mui/material';
import { TravelInquiry } from '../../redux/slices/Travel/Booking/BoookTravelSlice';
import { useState, useEffect } from 'react';

interface PersonalDetailsProps {
  inquiryData: any;
  setInquiryData: any;
  isRegister?: boolean;
  shouldShowRegister?: boolean;
}

function PersonalDetails({ inquiryData, setInquiryData, isRegister, shouldShowRegister }: PersonalDetailsProps) {
  // Check if passengerCount,default 0
  const [passengerInput, setPassengerInput] = useState<string>(
    inquiryData && inquiryData.passengerCount !== undefined ? 
    inquiryData.passengerCount.toString() : '0'
  );

  useEffect(() => {
    if (inquiryData && inquiryData.passengerCount !== undefined) {
      setPassengerInput(inquiryData.passengerCount.toString());
    }
  }, [inquiryData?.passengerCount]);

  useEffect(() => {
    if (!inquiryData || Object.keys(inquiryData).length === 0) {
      setInquiryData({
        name: '',
        passengerCount: 0,
        specialRequests: ''
      });
    } else if (inquiryData.passengerCount === undefined) {
      setInquiryData(prev => ({
        ...prev,
        passengerCount: 0
      }));
    }
  }, [inquiryData, setInquiryData]);

  const handleChange = (field: keyof TravelInquiry, value: string | number) => {
    setInquiryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePassengerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassengerInput(inputValue); // Update local state immediately for responsive UI

    // Parse the numeric value, handling empty string case
    const numericValue = inputValue === '' ? 0 : parseInt(inputValue, 10);

    // Only update the form data if we have a valid number or empty string
    if (!isNaN(numericValue)) {
      handleChange('passengerCount', numericValue);
    }
  };

  const handlePassengerBlur = () => {
    // When field loses focus, clean up the display value
    const numericValue = parseInt(passengerInput, 10) || 0;
    setPassengerInput(numericValue.toString());
    handleChange('passengerCount', numericValue);
  };

  const name = inquiryData?.name || '';
  const specialRequests = inquiryData?.specialRequests || '';
  const passengerCount = inquiryData?.passengerCount || 0;

  return (
    <Box sx={{ mt: 1, color: 'white' }} className="space-y-3">
      {/* Name input */}
      <TextField
        label="Your Name"
        id="name"
        value={name}
        onChange={(e) => handleChange('name', e.target.value)}
        disabled={!shouldShowRegister && isRegister}
        fullWidth
        size="small"
        className="w-full  px-3 mt-2 py-2 text-sm rounded-md text-white border border-gray-300 
        font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-200 
        transition-all duration-200 outline-none"
        sx={{
          '& .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
          },
          '& .MuiFormHelperText-root': {
            color: 'white',
          },
        }}
        placeholder="Enter your full name"
        required
      />

      {/* Passenger count input */}
      {!isRegister && (
        <Box sx={{mt:4, color: 'white'}}>
          <TextField
            label="Number of Passengers"
            id="passengerCount"
            type="number"
            value={passengerInput}
            onChange={handlePassengerCountChange}
            onBlur={handlePassengerBlur}
            disabled={!shouldShowRegister && isRegister}
            fullWidth
            size="small"
            className="w-full mt-8 px-3 mt-2 py-2 text-sm rounded-md text-white border border-gray-300 
            font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-200 
            transition-all duration-200 outline-none"
            sx={{
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
              '& .MuiFormHelperText-root': {
                color: 'white',
              },
            }}
            InputProps={{
              inputProps: { 
                min: 0,
              }
            }}
            placeholder="Enter number of passengers"
            required
          />
          {passengerCount > 0 && (
            <Box sx={{ mt: 0.5, fontSize: '0.75rem', color: 'white' }}>
              {passengerCount} {passengerCount === 1 ? 'person' : 'people'} traveling
            </Box>
          )}
        </Box>
      )}

      {/* Special requests input */}
      {!isRegister && (
        <TextField
          label="Special Requests"
          id="specialRequests"
          value={specialRequests}
          onChange={(e) => handleChange('specialRequests', e.target.value)}
          disabled={!shouldShowRegister && isRegister}
          fullWidth
          multiline
          rows={3}
          size="small"
          className="w-full px-3 py-2 mt-2 text-sm rounded-md text-white border border-gray-300 
          font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-200 
          transition-all duration-200 outline-none"
          sx={{
            '& .MuiInputBase-input': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiFormHelperText-root': {
              color: 'white',
            },
          }}
          placeholder="E.g., dietary restrictions, accessibility needs, etc."
        />
      )}
    </Box>
  );
}

export default PersonalDetails;