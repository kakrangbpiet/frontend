import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { completeBooking, createTravelInquiry, fetchUserInquiries } from './BookTravelApiSlice.tsx';
import { IUser } from '../../../../Datatypes/interface.ts';

// Types
export interface TravelInquiry extends IUser {
  inquiryId?: string;
  packageId: string;
  packageTitle: string;
  departure: string;
  destination: string;
  passengerCount: number;
  travelDates: string;
  specialRequests?: string;
  status?: 'pending' | 'confirmed' | 'rejected' | 'completed';
  createdAt?: string;
}

export interface TravelerInfo {
  fullName: string;
  age: number;
  passportNumber?: string;
  nationality?: string;
  specialRequirements?: string;
}

export interface BookingDetails extends TravelInquiry {
  travelers: TravelerInfo[];
  paymentMethod?: 'credit-card' | 'paypal' | 'bank-transfer';
  paymentStatus?: 'pending' | 'paid' | 'failed';
  totalAmount: number;
}

interface BookTravelState {
  currentInquiry: TravelInquiry | null;
  currentBooking: BookingDetails | null;
  userInquiries: TravelInquiry[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: BookTravelState = {
  currentInquiry: null,
  currentBooking: null,
  userInquiries: [],
  loading: false,
  error: null,
  success: false,
};

// Slice
const bookTravelSlice = createSlice({
  name: 'bookTravel',
  initialState,
  reducers: {
    setCurrentInquiry: (state, action: PayloadAction<TravelInquiry>) => {
      state.currentInquiry = action.payload;
    },
    clearCurrentInquiry: (state) => {
      state.currentInquiry = null;
    },
    resetBookingState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Inquiry
      .addCase(createTravelInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createTravelInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentInquiry = action.payload;
      })
      .addCase(createTravelInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch User Inquiries
      .addCase(fetchUserInquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.userInquiries = action.payload;
      })
      .addCase(fetchUserInquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Complete Booking
      .addCase(completeBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentBooking = action.payload;
        // Update the inquiry status
        const inquiryIndex = state.userInquiries.findIndex(
          i => i.inquiryId === action.payload.inquiryId
        );
        if (inquiryIndex !== -1) {
          state.userInquiries[inquiryIndex].status = 'completed';
        }
      })
      .addCase(completeBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});



// Selectors
export const selectCurrentInquiry = (state: { bookTravel: BookTravelState }) => 
  state.bookTravel.currentInquiry;

export const selectUserInquiries = (state: { bookTravel: BookTravelState }) => 
  state.bookTravel.userInquiries;

export const selectBookingLoading = (state: { bookTravel: BookTravelState }) => 
  state.bookTravel.loading;

export const selectBookingError = (state: { bookTravel: BookTravelState }) => 
  state.bookTravel.error;

export const selectBookingSuccess = (state: { bookTravel: BookTravelState }) => 
  state.bookTravel.success;

// Actions
export const { setCurrentInquiry, clearCurrentInquiry, resetBookingState } = bookTravelSlice.actions;

export default bookTravelSlice.reducer;