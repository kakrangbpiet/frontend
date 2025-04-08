import { Box, TextField, InputAdornment } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import { TravelInquiry } from '../../redux/slices/Travel/Booking/BoookTravelSlice';
import CustomTextField from '../CustomTextField';
import { useState } from 'react';
import ChooseLocation from '../Location/ChooseLocation';

interface LocationDetailsProps {
  inquiryData: any;
  setInquiryData: any;
}

/**
 * Component for collecting travel destination and dates
 */
function LocationDetails({ inquiryData, setInquiryData }: LocationDetailsProps) {
  const [openDepartureDialog, setOpenDepartureDialog] = useState(false);
  const [openDestinationDialog, setOpenDestinationDialog] = useState(false);

  const handleChange = (field: keyof TravelInquiry, value: string | number) => {
    setInquiryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDepartureClose = () => {
    setOpenDepartureDialog(false);
  };

  const handleDestinationClose = () => {
    setOpenDestinationDialog(false);
  };

  const setDeparture = (address: string) => {
    handleChange('departure', address);
  };

  const setDestination = (address: string) => {
    handleChange('destination', address);
  };

  return (
    <Box sx={{ padding: 2, mt: 2 }}>
      {/* Departure input */}
      <TextField
        fullWidth
        label="Origin or Departure point"
        value={inquiryData.departure}
        onClick={() => setOpenDepartureDialog(true)}
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
      />

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

      {/* Departure Location Dialog */}
      <ChooseLocation
        open={openDepartureDialog}
        handleClose={handleDepartureClose}
        setAddress={setDeparture}
      />


    </Box>
  );
}

export default LocationDetails;