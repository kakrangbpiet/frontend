// Create a new file DateSelectionTabs.tsx
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { DateAvailability } from '../../redux/slices/Travel/TravelSlice';
import { useState } from 'react';
import { formatDate } from '../../page/SinglePackage/DateAvailability';
import CustomDateField from '../CustomDateField';

interface DateSelectionTabsProps {
  tripType: 'pre-planned' | 'custom';
  setTripType: (type: 'pre-planned' | 'custom') => void;
  dateAvailabilities: DateAvailability[];
  startDate?: number;
  endDate?: number;
  setStartDate: (date?: number) => void;
  setEndDate: (date?: number) => void;
}

function DateSelectionTabs({
  // tripType,
  setTripType,
  dateAvailabilities,
  startDate,
  endDate,
  setStartDate,
  setEndDate
}: DateSelectionTabsProps) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setTripType(newValue === 0 ? 'pre-planned' : 'custom');
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Pre-Planned Dates" />
        <Tab label="Custom Dates" />
      </Tabs>

      {tabValue === 0 ? (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Available Dates:
          </Typography>
          {dateAvailabilities.length === 0 ? (
            <Typography>No available dates</Typography>
          ) : (
            <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
              {dateAvailabilities.map((availability, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    my: 1,
                    border: '1px solid',
                    borderColor: startDate === availability.startDate ? 'primary.main' : 'divider',
                    borderRadius: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                  onClick={() => {
                    setStartDate(availability.startDate);
                    setEndDate(availability.endDate);
                  }}
                >
                  <Typography>
                    {formatDate(availability.startDate)} - {formatDate(availability.endDate)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {availability.availableSpots} spots available
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          <CustomDateField
            label="Start Date"
            value={startDate || null}
            onChange={(date) => setStartDate(date || undefined)}
            fullWidth
          />

          <CustomDateField
            label="End Date"
            value={endDate || null}
            onChange={(date) => setEndDate(date || undefined)}
            fullWidth
          />
        </Box>
      )}
    </Box>
  );
}

export default DateSelectionTabs;