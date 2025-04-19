import React from 'react';
import { TextField, Box,  Grid, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';

interface UnixDateInputProps {
  startDate: number | null;
  endDate: number | null;
  maxTravelers: number;
  availableSpots: number;
  onStartDateChange: (unixTimestamp: number | null) => void;
  onEndDateChange: (unixTimestamp: number | null) => void;
  onMaxTravelersChange: (maxTravelers: number) => void;
  onAvailableSpotsChange: (availableSpots: number) => void;
  onRemove?: () => void;
  showRemove?: boolean;
}

const UnixDateInput: React.FC<UnixDateInputProps> = ({
  startDate,
  endDate,
  maxTravelers,
  availableSpots,
  onStartDateChange,
  onEndDateChange,
  onMaxTravelersChange,
  onAvailableSpotsChange,
  onRemove,
  showRemove = false,
}) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onStartDateChange(value ? parseInt(value) : null);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onEndDateChange(value ? parseInt(value) : null);
  };

  const handleMaxTravelersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onMaxTravelersChange(value);
  };

  const handleAvailableSpotsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onAvailableSpotsChange(value);
  };

  return (
    <Box sx={{ mb: 3, border: '1px solid #eee', p: 2, borderRadius: 1, position: 'relative' }}>
      
      <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 12 }}>

      {showRemove && (
        <IconButton
        onClick={onRemove}
        color="error"
        >
          <RemoveIcon />
        </IconButton>
      )}
      </Grid>
         <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="Start Date (Unix timestamp)"
            value={startDate || ''}
            onChange={handleStartDateChange}
            placeholder="e.g., 1633046400"
          />
        </Grid>
         <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="End Date (Unix timestamp)"
            value={endDate || ''}
            onChange={handleEndDateChange}
            placeholder="e.g., 1633132800"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
         <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="Max Travelers"
            value={maxTravelers}
            onChange={handleMaxTravelersChange}
          />
        </Grid>
         <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="Available Spots"
            value={availableSpots}
            onChange={handleAvailableSpotsChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UnixDateInput;