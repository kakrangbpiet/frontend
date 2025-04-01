import { Box, TextField, InputAdornment } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import { TravelInquiry } from '../../redux/slices/Travel/Booking/BoookTravelSlice';
import CustomTextField from '../CustomTextField';

interface LocationDetailsProps {
  inquiryData: any;
  setInquiryData:any
}

/**
 * Component for collecting travel destination and dates
 */
function LocationDetails({ inquiryData, setInquiryData }: LocationDetailsProps) {
  const handleChange = (field: keyof TravelInquiry, value: string | number) => {
    setInquiryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box sx={{ padding: 2, mt: 2 }}>
      {/* Destination input */}
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
      
    </Box>
  );
}

export default LocationDetails;