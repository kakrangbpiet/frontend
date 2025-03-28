// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { AuthState } from '../../../Datatypes';

const storedUser = Cookies.get('user');
const storedAccessToken = Cookies.get('access');
const storedRefreshToken = Cookies.get('refresh');
const storedUserType = Cookies.get('userType');

const initialState: AuthState = {
  isAuthenticated:storedAccessToken ? true : false,
  user: storedUser ? storedUser : null,
  access: storedAccessToken ? storedAccessToken : null,
  refresh: storedRefreshToken ? storedRefreshToken : null,
  userType: storedUserType ? storedUserType : null,
  isLoading:false,
  isContactVerified: false,
  trxId: "",
  phoneNumber: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; phoneNumber:string, token: { accessToken: any, refreshToken: any }; userType: string; isLoading: boolean }>) => {
      state.isAuthenticated = true;
      state.isContactVerified = true;
      state.user = action.payload.user;
      state.access = action.payload.token.accessToken.token;
      state.refresh = action.payload.token.refreshToken.token;
      state.userType = action.payload.userType;
      state.phoneNumber = action.payload.phoneNumber;
      state.isLoading = action.payload.isLoading;
      Cookies.set('user', JSON.stringify(action.payload.user));
      Cookies.set('access', action.payload.token.accessToken.token);
      Cookies.set('refresh', action.payload.token.refreshToken.token);
      Cookies.set('userType', action.payload.userType);
    },
    setLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
    setContactVerified: (state, action: PayloadAction<{ isContactVerified: boolean }>) => {
      state.isContactVerified = action.payload.isContactVerified;
    },
    setPhoneNumber: (state, action: PayloadAction<{ phoneNumber: string }>) => {
      state.phoneNumber = action.payload.phoneNumber;
    },
    setTrxId: (state, action: PayloadAction<string>) => {
      state.trxId = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isContactVerified = false;
      state.user = null;
      state.access = null;
      state.refresh = null;
      state.userType = null;
      state.trxId = ""; 
      state.phoneNumber = null; 
      Cookies.remove('user');
      Cookies.remove('access');
      Cookies.remove('refresh');
      Cookies.remove('userType');
    },
    refreshAccessToken: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
      Cookies.set('access', action.payload);
    },
  },
});

export const { setCredentials, setLoading, logout, refreshAccessToken, setTrxId, setContactVerified, setPhoneNumber } = authSlice.actions;

export default authSlice.reducer;

// Selectors remain the same
export const selectUser = (state: { auth: { user: string } }) => state.auth.user;
export const selectToken = (state: { auth: { access: string } }) => state.auth.access;
export const isAuthenticated = (state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated;
export const selectUserType = (state: { auth: { userType: string } }) => state.auth.userType;
export const authLoading = (state: { auth: { isLoading: boolean } }) => state.auth.isLoading;
export const selectTrxId = (state: { auth: AuthState }) => state.auth.trxId;
export const SelectConactVerified = (state: { auth: { isContactVerified: boolean }}) => state.auth.isContactVerified;
export const SelectContact = (state: { auth: { phoneNumber: string }}) => state.auth.phoneNumber;
