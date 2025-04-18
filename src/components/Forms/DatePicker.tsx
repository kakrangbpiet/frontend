import React from 'react';
import { Box, Grid, IconButton, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import CustomDateField from '../CustomDateField';

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
  return (
    <Box sx={{ mb: 3, border: '1px solid #eee', p: 2, borderRadius: 1, position: 'relative' }}>
      {showRemove && (
        <IconButton
          onClick={onRemove}
          color="error"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <RemoveIcon />
        </IconButton>
      )}
      
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomDateField
            label="Start Date"
            value={startDate}
            onChange={onStartDateChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomDateField
            label="End Date"
            value={endDate}
            onChange={onEndDateChange}
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
            onChange={(e) => onMaxTravelersChange(parseInt(e.target.value) || 0)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="Available Spots"
            value={availableSpots}
            onChange={(e) => onAvailableSpotsChange(parseInt(e.target.value) || 0)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UnixDateInput;