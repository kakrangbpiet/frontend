import { createAsyncThunk } from "@reduxjs/toolkit";
import Request from "../../../../Backend/apiCall";
import { BookingDetails, TravelInquiry } from "./BoookTravelSlice";
import { ApiError } from "../../../../Datatypes";

// Async Thunks
export const createTravelInquiry = createAsyncThunk(
    'bookTravel/createInquiry',
    async (inquiryData: Omit<TravelInquiry, 'inquiryId' | 'status'>, { rejectWithValue }) => {
      try {
        const response = await Request({
          endpointId: 'CREATE_TRAVEL_INQUIRY',
          data: inquiryData,
        });
        
        return response.data as TravelInquiry;
      } catch (error) {
        const castedError = error as ApiError;
        return rejectWithValue(castedError?.error || 'Failed to create inquiry');
      }
    }
  );
  
  export const fetchUserInquiries = createAsyncThunk(
    'bookTravel/fetchUserInquiries',
    async (_, { rejectWithValue }) => {
      try {
        const response = await Request({
          endpointId: 'GET_USER_INQUIRIES',
        });
        
        return response.data as TravelInquiry[];
      } catch (error) {
        const castedError = error as ApiError;
        return rejectWithValue(castedError?.error || 'Failed to fetch inquiries');
      }
    }
  );
  
  export const completeBooking = createAsyncThunk(
    'bookTravel/completeBooking',
    async (
      { inquiryId, bookingDetails }: { inquiryId: string; bookingDetails: Omit<BookingDetails, 'inquiryId'> },
      { rejectWithValue }
    ) => {
      try {
        const response = await Request({
          endpointId: 'COMPLETE_BOOKING',
          slug: `/${inquiryId}`,
          data: bookingDetails,
        });
        
        return response.data as BookingDetails;
      } catch (error) {
        const castedError = error as ApiError;
        return rejectWithValue(castedError?.error || 'Failed to complete booking');
      }
    }
  );