import React from 'react';
import { TextField } from '@mui/material';

interface CustomDateFieldProps {
  label: string;
  value: number | null;
  onChange: (unixTimestamp: number | null) => void;
  fullWidth?: boolean;
  required?: boolean;
}

const CustomDateField: React.FC<CustomDateFieldProps> = ({
  label,
  value,
  onChange,
  fullWidth = true,
  required = false,
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
  const minDate = localToday.toISOString().split('T')[0];

  return (
    <TextField
      type="date"
      label={label}
      value={formattedValue}
      onChange={handleDateChange}
      fullWidth={fullWidth}
      required={required}
      inputProps={{
        min: minDate,
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default CustomDateField;
