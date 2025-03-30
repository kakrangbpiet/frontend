import React from 'react';
import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import { InputBaseComponentProps } from '@mui/material/InputBase';

interface CustomTextFieldProps extends InputBaseComponentProps {
  id: string;
  type: string;
  label?: string;
  placeholder?: string;
  error?: string;
  isError?:boolean;
  showPassword?: boolean;
  handleClickShowPassword?: () => void;
  handleMouseDownPassword?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomTextField : React.FC<CustomTextFieldProps> =({
  id,
  type,
  label,
  value,
  onChange,
  placeholder,
  error,
  isError,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
}) => {
  return (
    <FormControl fullWidth error={isError}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        endAdornment={
          type === 'password' && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <VisibilityOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
              </IconButton>
            </InputAdornment>
          )
        }
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default CustomTextField;