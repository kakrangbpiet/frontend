import { Box, TextField, InputAdornment } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import { TravelInquiry } from '../../redux/slices/Travel/Booking/BoookTravelSlice';
import CustomTextField from '../CustomTextField';
import { useState } from 'react';
import ChooseLocation from '../Location/ChooseLocation';

interface LocationDetailsProps {
  inquiryData: any;
  setInquiryData: any;
  isRegister?: boolean
  shouldShowRegister?: boolean
}

/**
 * Component for collecting travel destination and dates
 */
function LocationDetails({ inquiryData, setInquiryData, isRegister, shouldShowRegister }: LocationDetailsProps) {
  const [openDepartureDialog, setOpenAddressDialog] = useState(false);

  const handleChange = (field: keyof TravelInquiry, value: string | number) => {
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

  return (
    <Box sx={{ padding: 2, mt: 2 }}>
      {/* Departure input */}
      <TextField
        fullWidth
        label="Choose Current Location"
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
      />

      {!isRegister &&
        <>
          <TextField
            fullWidth
            label="Destination"
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
          />
          <CustomTextField
            id="travelDates"
            type="text"
            label="Travel Dates"
            value={inquiryData.travelDates}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange('travelDates', e.target.value)}
            placeholder="Choose Travel Date"
            // error={errors.title}
            // isError={!!errors.title}
            fullWidth
          />
        </>
      }
      {/* Departure Location Dialog */}
      <ChooseLocation
        open={openDepartureDialog}
        handleClose={handleLocationClose}
        setAddress={setLocation}
      />
    </Box>
  );
}

export default LocationDetails;