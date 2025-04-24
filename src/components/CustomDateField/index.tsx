import React from 'react';
import { TextField } from '@mui/material';

interface CustomDateFieldProps {
  placeholder: string;
  value: number | null;
  onChange: (unixTimestamp: number | null) => void;
  fullWidth?: boolean;
  required?: boolean;
  minDate?: number;
  'aria-label'?: string;
}

const CustomDateField: React.FC<CustomDateFieldProps> = ({
  placeholder,
  value,
  onChange,
  fullWidth = true,
  required = false,
  minDate,
  'aria-label': ariaLabel,
}) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    if (dateString) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        onChange(Math.floor(date.getTime() / 1000));
      } else {
        onChange(null);
      }
    } else {
      onChange(null);
    }
  };

  // Format value to YYYY-MM-DD if present
  const formattedValue = value
    ? new Date(value * 1000).toISOString().split('T')[0]
    : '';

  // Today's date in local time zone, formatted as YYYY-MM-DD
  const today = new Date();
  const localToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const minDateString = minDate 
    ? new Date(minDate * 1000).toISOString().split('T')[0]
    : localToday.toISOString().split('T')[0];

  // Custom MUI styles for white background
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
    <TextField
      type="date"
      placeholder={placeholder}
      value={formattedValue}
      onChange={handleDateChange}
      fullWidth={fullWidth}
      required={required}
      inputProps={{
        min: minDateString,
        'aria-label': ariaLabel,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      sx={textFieldStyle}
    />
  );
};

export default CustomDateField;