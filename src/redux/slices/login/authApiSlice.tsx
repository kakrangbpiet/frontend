// authActions.tsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setContactVerified, setCredentials, setLoading, setPhoneNumber } from './authSlice';
import Request from '../../../Backend/apiCall';
import { ApiError, ApiSuccess, IUser, LoginData, OtpData, SignUpData } from '../../../Datatypes';
// import { ApiSuccess } from '../../Datatypes/interfaces/interface';

// interface JwtPayload {
//   sub: string;
//   walletAddress: string;
//   user_type: string; 
// }
// TODO create custom Payload

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password, OnFormSuccess,userType }: LoginData, { rejectWithValue, dispatch }) => {
    try {
      
      dispatch(setLoading({ isLoading: true }));

      const response = await Request({
        endpointId: "MAIN_LOGIN",
        data: { userType,email, password,deviceId:"550e8400-e29b-41d4-a716-446655440000" },
      })
      
      // Assuming the response contains user information and a token
      const {  accessToken,refreshToken } = response.data.token;

      // $TODO save access and refresh in cookies and apply the refresh logic
      // Dispatch the setCredentials action to update the authentication state
      // const apiSuccess: ApiSuccess = {
      //   statusCode: response?.status,
      //   message: 'Login Request successful',
      //   data: response?.data,
      // };
      
      
      dispatch(setCredentials({ user:response?.data?.email,phoneNumber:response?.data?.email, token:{accessToken,refreshToken}, userType:response?.data?.category,isLoading:false })); // todo use phoneNumber instead of email in PhoneNumber
      OnFormSuccess()
      return response.data;

    } catch (error) {
      dispatch(setLoading({ isLoading: false }));

      const castedError =error as ApiError
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);

// Handle sending OTP for login or signup
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (data: SignUpData | { phoneNumber: string }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading({ isLoading: true }));
      
      const response = await Request({
        endpointId: "SEND_OTP",
        data,
      });

      dispatch(setLoading({ isLoading: false }));
      return response.data;
       // Assuming response contains `trxId` or any metadata required
    } catch (error) {
      dispatch(setLoading({ isLoading: false }));
      const castedError = error as ApiError;
      return rejectWithValue(castedError.error || 'Failed to send OTP');
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ otp, trxId, deviceId, phoneNumber }: OtpData, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading({ isLoading: true }));
      const response = await Request({
        endpointId: "VERIFY_OTP",
        data: { otp, trxId, deviceId, phoneNumber },
      });

      if(response?.data?.token){
        const {  accessToken,refreshToken } = response.data.token;
        dispatch(setCredentials({ user:response?.data?.email,phoneNumber:phoneNumber, token:{accessToken,refreshToken}, userType:response?.data?.category,isLoading:false }));
        dispatch(setContactVerified({ isContactVerified: true }));
        dispatch(setPhoneNumber({ phoneNumber: phoneNumber }));
      }
      dispatch(setLoading({ isLoading: false }));
      dispatch(setPhoneNumber({ phoneNumber: phoneNumber }));
      dispatch(setContactVerified({ isContactVerified: true }));

      return response.data;
    } catch (error) {
      dispatch(setLoading({ isLoading: false }));
      const castedError = error as ApiError;
      return rejectWithValue(castedError.error || 'Failed to verify OTP');
    }
  }
);


export const registerNumberDispatcher = createAsyncThunk(
  'RegisterNumberPasswordLess',
  async (phoneNumber: string, { rejectWithValue, dispatch }) => {
    try {
      // Dispatch loading state
      dispatch(setLoading({ isLoading: true }));

      // Perform the API call to register the user
      const response = await Request({
        endpointId: "REGISTER_NUMBER_PASSWORDLESS",
        data: {phoneNumber:phoneNumber},
      });

      // Check if the response contains tokens
        dispatch(setPhoneNumber({ phoneNumber: phoneNumber }));

      dispatch(setLoading({ isLoading: false }));

      // Return the API response as a success object
      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Otp Sent Successfully',
        data: response,
      };
      return apiSuccess;
    } catch (error) {
      // Handle errors during registration
      dispatch(setLoading({ isLoading: false }));
      const castedError = error as ApiError;
      const errorMessage =
        typeof castedError?.error === 'string' ? castedError?.error : 'Unknown Error';

      return rejectWithValue(errorMessage);
    }
  }
);
export const registerNumberOtpDispatcher = createAsyncThunk(
  'RegisterNumberOtpPasswordLess',
  async ({otp,trxId,deviceId,phoneNumber}: any, { rejectWithValue, dispatch }) => {
    try {
      // Dispatch loading state
      dispatch(setLoading({ isLoading: true }));

      // Perform the API call to register the user
      const response = await Request({
        endpointId: "REGISTER_NUMBER_OTP_PASSWORDLESS",
        data: {otp,trxId,deviceId,phoneNumber},
      });

      // Check if the response contains tokens
      if (response?.data?.token) {
   
        dispatch(setContactVerified({ isContactVerified: true }));
        dispatch(setPhoneNumber({ phoneNumber: phoneNumber }));
      }

      dispatch(setLoading({ isLoading: false }));

      // Return the API response as a success object
      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Phone Verified Successfully',
        data: response,
      };
      return apiSuccess;
    } catch (error) {
      // Handle errors during registration
      dispatch(setLoading({ isLoading: false }));
      const castedError = error as ApiError;
      const errorMessage =
        typeof castedError?.error === 'string' ? castedError?.error : 'Unknown Error';

      return rejectWithValue(errorMessage);
    }
  }
);
export const registerUserDispatcher = createAsyncThunk(
  'RegisterUserPasswordLess',
  async (userData: IUser, { rejectWithValue, dispatch }) => {
    try {
      // Dispatch loading state
      dispatch(setLoading({ isLoading: true }));

      // Perform the API call to register the user
      const response = await Request({
        endpointId: "REGISTER_USER_PASSWORDLESS",
        data: userData,
      });

      // Check if the response contains tokens
      if (response?.data?.token) {
        const { accessToken, refreshToken } = response.data.token;

        // Dispatch the setCredentials action with token and user data
        dispatch(
          setCredentials({
            user: response?.data?.email,
            phoneNumber: userData.phoneNumber,
            token: { accessToken, refreshToken },
            userType: response?.data?.category,
            isLoading: false,
          })
        );

        dispatch(setContactVerified({ isContactVerified: true }));
        dispatch(setPhoneNumber({ phoneNumber: userData.phoneNumber }));
      }

      dispatch(setLoading({ isLoading: false }));

      // Return the API response as a success object
      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'User Registered Successfully',
        data: response,
      };
      return apiSuccess;
    } catch (error) {
      // Handle errors during registration
      dispatch(setLoading({ isLoading: false }));
      const castedError = error as ApiError;
      const errorMessage =
        typeof castedError?.error === 'string' ? castedError?.error : 'Unknown Error';

      return rejectWithValue(errorMessage);
    }
  }
);
