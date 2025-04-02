import { createAsyncThunk } from "@reduxjs/toolkit";
import Request from "../../../Backend/apiCall";
import { ApiError } from "../../../Datatypes";

// Async Thunks
export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async (_, { rejectWithValue }) => {
      try {
        const response = await Request({
          endpointId: 'GET_ALL_USERS',
        });
        
        return response.data as {
            verifiedUsers: User[],
            unverifiedUsers: UnverifiedUser[]
        };
      } catch (error) {
        const castedError = error as ApiError;
        return rejectWithValue(castedError?.error || 'Failed to fetch users');
      }
    }
);

// Types
export interface User extends UnverifiedUser{
    id: string;
    email: string;
    name: string;
    address?: string;
    category: string;
    accountStatus: string;
    createdAt: string;
    updatedAt: string;
}

export interface UnverifiedUser {
    id: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}