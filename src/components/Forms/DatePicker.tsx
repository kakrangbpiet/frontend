import React from 'react';
import { Box, Grid, IconButton, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import CustomDateField from '../CustomDateField';

interface UnixDateInputProps {
  startDate: number | null;
  endDate: number | null;
  maxTravelers: number;
  availableSpots: number;
  price: number;
  originalPrice?: number;
  onStartDateChange: (unixTimestamp: number | null) => void;
  onEndDateChange: (unixTimestamp: number | null) => void;
  onMaxTravelersChange: (maxTravelers: number) => void;
  onAvailableSpotsChange: (availableSpots: number) => void;
  onPriceChange: (price: number) => void;
  onOriginalPriceChange: (originalPrice: number | undefined) => void;
  onRemove?: () => void;
  showRemove?: boolean;
}

const UnixDateInput: React.FC<UnixDateInputProps> = ({
  startDate,
  endDate,
  maxTravelers,
  availableSpots,
  price,
  originalPrice,
  onStartDateChange,
  onEndDateChange,
  onMaxTravelersChange,
  onAvailableSpotsChange,
  onPriceChange,
  onOriginalPriceChange,
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
        <Grid size={{ xs: 6, md: 6 }}>
          <CustomDateField
            placeholder="Start Date"
            value={startDate}
            onChange={onStartDateChange}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <CustomDateField
            placeholder="End Date"
            value={endDate}
            onChange={onEndDateChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 6, md: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="Max Travelers"
            value={maxTravelers}
            onChange={(e) => onMaxTravelersChange(parseInt(e.target.value) || 0)}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="Available Spots"
            value={availableSpots}
            onChange={(e) => onAvailableSpotsChange(parseInt(e.target.value) || 0)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 6, md: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="Price"
            value={price}
            onChange={(e) => onPriceChange(parseFloat(e.target.value) || 0)}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="Original Price (optional)"
            value={originalPrice || ''}
            onChange={(e) => onOriginalPriceChange(
              e.target.value ? parseFloat(e.target.value) : undefined
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UnixDateInput;