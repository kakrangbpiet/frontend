import { Box, TextField, InputAdornment } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import { TravelInquiry } from '../../redux/slices/Travel/Booking/BoookTravelSlice';
import { useState } from 'react';
import ChooseLocation from '../Location/ChooseLocation';
import { DateAvailability } from '../../redux/slices/Travel/TravelSlice';
import DateSelectionTabs from './DateSelection';
import { SignUpData } from '../../Datatypes';

interface LocationDetailsProps {
  inquiryData: TravelInquiry | SignUpData;
  setInquiryData: React.Dispatch<React.SetStateAction<TravelInquiry>>;
  isRegister?: boolean;
  shouldShowRegister?: boolean;
  dateAvailabilities?: DateAvailability[];
}

function LocationDetails({
  inquiryData,
  setInquiryData,
  isRegister,
  shouldShowRegister,
  dateAvailabilities = []
}: LocationDetailsProps) {
  const [openDepartureDialog, setOpenAddressDialog] = useState(false);

  const handleChange = (field: keyof TravelInquiry, value: any) => {
    setInquiryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationClose = () => {
    setOpenAddressDialog(false);
  };

  const setLocation = (address: string) => {
    handleChange('address', address);
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
    '& input': {
      fontWeight: '500',
      color: '#1f2937',
    },
  };

  return (
    <Box sx={{ padding: 2, mt: 2 }}>
      <TextField
        fullWidth
        placeholder="Choose Current Location"
        value={inquiryData.address}
        onClick={() => setOpenAddressDialog(true)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PlaceIcon />
            </InputAdornment>
          ),
          readOnly: true,
        }}
        margin="normal"
        required
        disabled={!shouldShowRegister && isRegister}
        sx={textFieldStyle}
      />

      {!isRegister && (
        <>
          {('destination' in inquiryData) && (
            <TextField
              fullWidth
              placeholder="Destination"
              disabled={true}
              value={inquiryData.destination}
              onChange={(e) => handleChange('destination', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PlaceIcon />
                  </InputAdornment>
                ),
              }}
              margin="normal"
              required
              sx={textFieldStyle}
            />
          )}

          {'startDate' in inquiryData && 'endDate' in inquiryData && (
            <DateSelectionTabs
              tripType={('tripType' in inquiryData ? inquiryData.tripType : 'pre-planned') as 'pre-planned' | 'custom'}
              setTripType={(type) => handleChange('tripType', type)}
              dateAvailabilities={dateAvailabilities}
              startDate={inquiryData.startDate}
              endDate={inquiryData.endDate}
              setStartDate={(date) => handleChange('startDate', date)}
              setEndDate={(date) => handleChange('endDate', date)}
            />
          )}
        </>
      )}

      <ChooseLocation
        open={openDepartureDialog}
        handleClose={handleLocationClose}
        setAddress={setLocation}
      />
    </Box>
  );
}

export default LocationDetails;