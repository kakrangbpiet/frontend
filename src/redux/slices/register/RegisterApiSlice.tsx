import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserRequest, registerUserSuccess, registerUserFailure } from './RegisterSlice';
import Request from '../../../Backend/apiCall';
import { ApiError, ApiSuccess, IUser } from '../../../Datatypes';

export const registerUserDispatcher = createAsyncThunk(
  'RegisterUser',
  async (userData: IUser, { rejectWithValue, dispatch }) => {
    // Dispatch request action to update loading state
    dispatch(registerUserRequest());

    try {
      // Perform the API call to register the user
      const response = await Request({
        endpointId: "RegisterUser",  // This will be mapped to backend API call
        // slug: "/register",           // The registration endpoint slug
        data: userData               // The user data being sent
      });

      // Response contains the newly created user data
      const newUser: IUser = {
        id: response?.id,
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        category: userData.category,
        accountStatus: userData.accountStatus,
        permissions: response?.permissions || [],
      };

      // Dispatch success action and update the state
      dispatch(registerUserSuccess(newUser));

      // Return success object
      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'User Registered Successfully',
        data: response,
      };
      return apiSuccess;

    } catch (error) {
      // Handle error during registration
      const castedError = error as ApiError;
      const errorMessage = typeof castedError?.error === "string" ? castedError?.error : 'Unknown Error';

      // Dispatch failure action with the error message
      dispatch(registerUserFailure(errorMessage));
      
      return rejectWithValue(errorMessage);
    }
  }
);