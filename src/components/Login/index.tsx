import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { authLoading } from '../../redux/slices/login/authSlice';
import { LoginData } from '../../Datatypes';
import { UserCategory } from '../../Datatypes/Enums/UserEnums';
import { AppDispatch } from '../../redux/store';
import { loginUser } from '../../redux/slices/login/authApiSlice';

interface LoginProps {
  loginTitle: string;
  OnFormSuccess?:any;
  userType: UserCategory.User | UserCategory.KAKRAN_SUPER_ADMIN
}
const LoginForm: React.FC<LoginProps> = ({OnFormSuccess,userType}) => {
  const dispatch = useDispatch(); // Explicitly type dispatch

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');
  const isAuthLoading=useSelector(authLoading)
  
  useEffect(() => {
 
  }, [isAuthLoading]);
  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const loginData: LoginData = {
        email: email,
        password: password,
        OnFormSuccess,
        userType
      };

      // Dispatch the login action with correct action type
      (dispatch as AppDispatch)(loginUser(loginData));

    } catch (error) {
      setError("Unknown error detected.")
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  return (
    <div style={{
      padding:"20px"
    }}>
       <form noValidate>
        <Grid container spacing={3}>
          <Grid >
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Email Address</InputLabel>
              <OutlinedInput
                id="email-login"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                fullWidth
                error={error.includes('email')}
              />
              {error.includes('email') && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {error}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid >
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Password</InputLabel>
              <OutlinedInput
                fullWidth
                error={error.includes('password')}
                id="-password-login"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
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
                }
                placeholder="Enter password"
              />
              {error.includes('password') && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {error}
                </FormHelperText>
              )}
            </Stack>
          </Grid>

       
          {error && (
            <Grid>
              <FormHelperText error>{error}</FormHelperText>
            </Grid>
          )}
          <Grid >
            {/* <AnimateButton> */}
              <Button
                disableElevation
                fullWidth
                size="large"
                onClick={handleLoginSubmit}
                variant="contained"
                color="primary"
                disabled={isAuthLoading}
              >
                Login
              </Button>
            {/* </AnimateButton> */}
          </Grid>
          {/* <Grid item xs={12}>
            <Divider>
              <Typography variant="caption"> Login with</Typography>
            </Divider>
          </Grid> */}
          {/* <Grid item xs={12}>
            <FirebaseSocial />
          </Grid> */}
        </Grid>
      </form>
    </div>
  );
};

export default LoginForm;