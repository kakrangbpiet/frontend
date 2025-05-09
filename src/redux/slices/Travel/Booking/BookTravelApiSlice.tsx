import { createAsyncThunk } from "@reduxjs/toolkit";
import Request from "../../../../Backend/apiCall";
import { BookingDetails, TravelInquiry } from "./BoookTravelSlice";
import { ApiError } from "../../../../Datatypes";

// Async Thunks
export const createTravelInquiry = createAsyncThunk(
    'bookTravel/createInquiry',
    async ({ inquiryToSend, handleNext }: { inquiryToSend: Omit<TravelInquiry, 'inquiryId' | 'status'>; handleNext: () => void }, { rejectWithValue }) => {
      try {
        const response = await Request({
          endpointId: 'CREATE_TRAVEL_INQUIRY',
          data: inquiryToSend,
        });
        handleNext();
        
        return response.data as TravelInquiry;
      } catch (error) {
        const castedError = error as ApiError;
        return rejectWithValue(castedError?.error || 'Failed to create inquiry');
      }
    }
  );
  
  export const fetchUserInquiries = createAsyncThunk(
    'bookTravel/fetchUserInquiries',
    async (userid:any, { rejectWithValue }) => {
      try {
        const response = await Request({
          endpointId: 'GET_USER_INQUIRIES',
          slug: `/${userid}`,
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