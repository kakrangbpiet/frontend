import { Box, TextField, InputAdornment, Autocomplete } from '@mui/material';
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
  titles?: { id: string; title: string }[]; 
  isCustomForm?: boolean;
}

function LocationDetails({
  inquiryData,
  setInquiryData,
  isRegister,
  shouldShowRegister,
  dateAvailabilities = [],
  titles = [],
  isCustomForm
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
      backgroundColor: 'rgba(245, 243, 255, 0.4)', 
      backdropFilter: 'blur(10px)', 
      WebkitBackdropFilter: 'blur(10px)', 
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
      fontWeight: '400',
      color: '#000000',
    },
  };

  return (
    <Box sx={{}} className="space-y-6">
      {/* Current Location */}
      <div className='m-0'>
  
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Your Current Location
        </label>
        <TextField
          fullWidth
          placeholder="Select your location"
          value={inquiryData.address}
          onClick={() => setOpenAddressDialog(true)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PlaceIcon className="text-gray-500" />
              </InputAdornment>
            ),
            readOnly: true,
          }}
          margin="normal"
          required
          disabled={!shouldShowRegister && isRegister}
          sx={textFieldStyle}
        />
        {inquiryData.address && (
          <p className="mt-0 text-xs text-gray-100">We'll use this for pickup arrangements</p>
        )}
      </div>

      {!isRegister && (
        <>
          {/* Destination */}
          {('destination' in inquiryData) && (
            <div>
              {inquiryData.destination ? (
                <TextField
                  fullWidth
                  value={inquiryData.destination}
                  placeholder="Destination"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PlaceIcon className="text-gray-500" />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                  margin="normal"
                  sx={textFieldStyle}
                  disabled={true}
                />
              ) : (
                isCustomForm && titles.length > 0 && (
                  <div>
                    <Autocomplete
                      options={titles}
                      getOptionLabel={(option) => option.title}
                      value={null}
                      onChange={(_, newValue) => {
                        handleChange('destination', newValue?.title || '');
                        handleChange('packageTitle', newValue?.title || '');
                        handleChange('packageId', newValue?.id || '');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          placeholder="Choose your destination"
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <PlaceIcon className="text-gray-500" />
                              </InputAdornment>
                            ),
                          }}
                          margin="normal"
                          required
                          sx={textFieldStyle}
                        />
                      )}
                    />
                    <p className="mt-1 text-xs text-gray-100">Select from our available destinations</p>
                  </div>
                )
              )}
            </div>
          )}

          {/* Date Selection */}
          {'startDate' in inquiryData && 'endDate' in inquiryData && (
            <div>
              <DateSelectionTabs
                tripType={('tripType' in inquiryData ? inquiryData.tripType : 'pre-planned') as 'pre-planned' | 'custom'}
                setTripType={(type) => handleChange('tripType', type)}
                dateAvailabilities={dateAvailabilities}
                startDate={inquiryData.startDate}
                endDate={inquiryData.endDate}
                setStartDate={(date) => handleChange('startDate', date)}
                setEndDate={(date) => handleChange('endDate', date)}
                isCustomForm={isCustomForm}
              />
              {inquiryData.startDate && inquiryData.endDate && (
                <p className="mt-1 text-xs text-gray-100">
                  {inquiryData.tripType === 'custom' ? 
                    "Your custom dates have been selected" : 
                    "Pre-planned itinerary dates selected"}
                </p>
              )}
            </div>
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