import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers, User, UnverifiedUser } from './UsersApiSlice';

interface UserState {
    verifiedUsers: User[];
    unverifiedUsers: UnverifiedUser[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    verifiedUsers: [],
    unverifiedUsers: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearUsersError: (state) => {
            state.error = null;
        },
        resetUsersState: (state) => {
            state.loading = false;
            state.error = null;
            state.verifiedUsers = [];
            state.unverifiedUsers = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Get All Users
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.verifiedUsers = action.payload.verifiedUsers;
                state.unverifiedUsers = action.payload.unverifiedUsers;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

// Selectors
export const selectVerifiedUsers = (state: { users: UserState }) => 
    state.users.verifiedUsers;

export const selectUnverifiedUsers = (state: { users: UserState }) => 
    state.users.unverifiedUsers;

export const selectUsersLoading = (state: { users: UserState }) => 
    state.users.loading;

export const selectUsersError = (state: { users: UserState }) => 
    state.users.error;

// Actions
export const { clearUsersError, resetUsersState } = userSlice.actions;

export default userSlice.reducer;