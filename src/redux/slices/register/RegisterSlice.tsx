import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../Datatypes';

interface UserState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerUserRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerUserSuccess: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.loading = false;
        },
        registerUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
        },
    },
});

export const { registerUserRequest, registerUserSuccess, registerUserFailure, logoutUser } = userSlice.actions;

export default userSlice.reducer;

export const selectLoggedInUser = (state: { user: UserState }) => state.user;
// Add this to your user slice file (where your other selectors are)
export const selectRegistrationStatus = (state: { user: UserState }) => {
    if (state.user.loading) return 'loading';
    if (state.user.error) return 'error';
    if (state.user.user) return 'success';
    return 'idle';
  };