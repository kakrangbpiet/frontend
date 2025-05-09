// const backendUrl="http://localhost:3000/v1"
const backendUrl="http://54.237.234.107:3000/v1"

export const ApiEndpoint: Record<string, any> = {
  // AUTHENTICATION ENDPOINTS
  MAIN_LOGIN: { 
    apiId: 1, 
    withAuth: false, 
    url: `${backendUrl}/login`,
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Logging In",
    successMessage: "",
    errorMessage: "Error Logging In"
  },
  REGISTER_NUMBER_PASSWORDLESS: { 
    apiId: 2, 
    withAuth: false, 
    url: `${backendUrl}/passwordless/login`, 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Logging In",
    successMessage: "",
    errorMessage: "Error Logging In"
  },
  REGISTER_NUMBER_OTP_PASSWORDLESS: { 
    apiId: 3, 
    withAuth: false, 
    url: `${backendUrl}/passwordless/verifyOtp`, 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Logging In",
    successMessage: "",
    errorMessage: "Error Logging In"
  },
  REGISTER_USER_PASSWORDLESS: { 
    apiId: 4, 
    withAuth: false, 
    url: `${backendUrl}/passwordless/registerUser`, 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Logging In",
    successMessage: "",
    errorMessage: "Error Logging In"
  },
  AI_PROMPT: { 
    apiId: 5, 
    withAuth: false, 
    url: `${backendUrl}/ai/prompt`, 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "",
    successMessage: "",
    errorMessage: ""
  },
  GET_ALL_USERS: { 
    apiId: 6, 
    withAuth: true, 
    url: `${backendUrl}/getAllUsers`, 
    method: 'GET', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading user",
    successMessage: "",
    errorMessage: "Error loading users"
  },
  // TRAVEL PACKAGE ENDPOINTS
  GET_TRAVEL_ITEMS: { 
    apiId: 20, 
    withAuth: false, 
    url: `${backendUrl}/Travel/travelType`, 
    method: 'GET', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading travel items",
    successMessage: "",
    errorMessage: "Error loading travel items"
  },
  GET_TRAVEL_ITEMS_BY_CATEGORY: { 
    apiId: 21, 
    withAuth: false, 
    url: `${backendUrl}/Travel/travelCategory`, 
    method: 'GET', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading travel items by category",
    successMessage: "",
    errorMessage: "Error loading travel items by category"
  },
  GET_SINGLE_TRAVEL_ITEM: { 
    apiId: 22, 
    withAuth: false, 
    url: `${backendUrl}/Travel`, 
    method: 'GET', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading travel item details",
    successMessage: "",
    errorMessage: "Error loading travel item"
  },
  ADD_TRAVEL_ITEM: { 
    apiId: 23, 
    withAuth: true, 
    url: `${backendUrl}/Travel`, 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Adding new travel item",
    successMessage: "Travel item added successfully",
    errorMessage: "Error adding travel item"
  },
  UPDATE_TRAVEL_ITEM_STATUS: { 
    apiId: 24, 
    withAuth: true, 
    url: `${backendUrl}/Travel/updateStatus`, 
    method: 'PATCH', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Updating travel item status",
    successMessage: "Travel item status updated successfully",
    errorMessage: "Error updating travel item status"
  },
  EDIT_TRAVEL_ITEM: { 
    apiId: 25, 
    withAuth: true, 
    url: `${backendUrl}/Travel`, 
    method: 'PATCH', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Editing travel item",
    successMessage: "Travel item updated successfully",
    errorMessage: "Error updating travel item"
  },
  GET_TRAVEL_ITEM_VIDEOS: { 
    apiId: 26, 
    withAuth: true, 
    url: `${backendUrl}/Travel/videos`, 
    method: 'GET', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Getting Package Videos",
    successMessage: "Package Videos Fetched successfully",
    errorMessage: "Error Getting Package Videos"
  },
  GET_TRAVEL_RANDOM_VIDEO: { 
    apiId: 26, 
    withAuth: true, 
    url: `${backendUrl}/Travel/randomvideo`, 
    method: 'GET', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Getting Package Videos",
    successMessage: "Package Videos Fetched successfully",
    errorMessage: "Error Getting Package Videos"
  },
  GET_ALL_CATEGORIES: {
    apiId: 27,
    withAuth: false,
    url: `${backendUrl}/Travel/categories`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Fetching categories",
    successMessage: "Categories fetched",
    errorMessage: "Error fetching categories"
  },
  GET_ALL_LOCATIONS: {
    apiId: 28,
    withAuth: false,
    url: `${backendUrl}/Travel/locations`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Fetching locations",
    successMessage: "Locations fetched",
    errorMessage: "Error fetching locations"
  },
  GET_ALL_TITLES: {
    apiId: 29,
    withAuth: false,
    url: `${backendUrl}/Travel/titles`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Fetching titles",
    successMessage: "Titles fetched",
    errorMessage: "Error fetching titles"
  },
  // TRAVEL INQUIRY ENDPOINTS
  CREATE_TRAVEL_INQUIRY: {
    apiId: 30,
    withAuth: true,
    url: `${backendUrl}/TravelInquiry`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Submitting your inquiry",
    successMessage: "Inquiry submitted successfully",
    errorMessage: "Error submitting inquiry"
  },
  GET_USER_INQUIRIES: {
    apiId: 31,
    withAuth: true,
    url: `${backendUrl}/TravelInquiry`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading your inquiries",
    successMessage: "",
    errorMessage: "Error loading inquiries"
  },
  GET_INQUIRY_DETAILS: {
    apiId: 32,
    withAuth: true,
    url: `${backendUrl}/TravelInquiry`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading inquiry details",
    successMessage: "",
    errorMessage: "Error loading inquiry"
  },
  UPDATE_INQUIRY_STATUS: {
    apiId: 33,
    withAuth: true,
    url: `${backendUrl}/TravelInquiry/status`,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Updating inquiry status",
    successMessage: "Status updated successfully",
    errorMessage: "Error updating status"
  },

  UPDATE_TRAVEL_PACKAGE_IMAGE: { 
    apiId: 34, 
    withAuth: true, 
    url: `${backendUrl}/Travel/image`, 
    method: 'PATCH', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Updating package image",
    successMessage: "Package image updated successfully",
    errorMessage: "Error updating package image"
  },
  UPDATE_TRAVEL_PACKAGE_IMAGES: { 
    apiId: 35, 
    withAuth: true, 
    url: `${backendUrl}/Travel/images`, 
    method: 'PATCH', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Updating package images",
    successMessage: "Package images updated successfully",
    errorMessage: "Error updating package images"
  },
  UPDATE_TRAVEL_PACKAGE_VIDEOS: { 
    apiId: 36, 
    withAuth: true, 
    url: `${backendUrl}/Travel/videos`, 
    method: 'PATCH', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Updating package videos",
    successMessage: "Package videos updated successfully",
    errorMessage: "Error updating package videos"
  },
  DELETE_TRAVEL_PACKAGE: { 
    apiId: 37, 
    withAuth: true, 
    url: `${backendUrl}/Travel`, 
    method: 'DELETE', 
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Deleting travel package",
    successMessage: "Travel package deleted successfully",
    errorMessage: "Error deleting travel package"
  },
  // BOOKING ENDPOINTS
  COMPLETE_BOOKING: {
    apiId: 40,
    withAuth: true,
    url: `${backendUrl}/Booking`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Processing your booking",
    successMessage: "Booking completed successfully",
    errorMessage: "Error completing booking"
  },
  GET_USER_BOOKINGS: {
    apiId: 41,
    withAuth: true,
    url: `${backendUrl}/Booking/user`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading your bookings",
    successMessage: "",
    errorMessage: "Error loading bookings"
  },
  GET_BOOKING_DETAILS: {
    apiId: 42,
    withAuth: true,
    url: `${backendUrl}/Booking`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading booking details",
    successMessage: "",
    errorMessage: "Error loading booking"
  },
  CANCEL_BOOKING: {
    apiId: 43,
    withAuth: true,
    url: `${backendUrl}/Booking/cancel`,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Cancelling booking",
    successMessage: "Booking cancelled successfully",
    errorMessage: "Error cancelling booking"
  },
  PROCESS_PAYMENT: {
    apiId: 44,
    withAuth: true,
    url: `${backendUrl}/Payment/process`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Processing payment",
    successMessage: "Payment processed successfully",
    errorMessage: "Error processing payment"
  },

  // CART ENDPOINTS
  ADD_TO_CART: {
    apiId: 50,
    withAuth: true,
    url: `${backendUrl}/Cart`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Adding to cart",
    successMessage: "Added to cart successfully",
    errorMessage: "Error adding to cart"
  },
  GET_CART: {
    apiId: 51,
    withAuth: true,
    url: `${backendUrl}/Cart`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Loading your cart",
    successMessage: "",
    errorMessage: "Error loading cart"
  },
  REMOVE_ITEM_FROM_CART: {
    apiId: 52,
    withAuth: true,
    url: `${backendUrl}/Cart`,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Removing item from cart",
    successMessage: "Item removed successfully",
    errorMessage: "Error removing item"
  },
  CLEAR_CART: {
    apiId: 53,
    withAuth: true,
    url: `${backendUrl}/Cart/clear`,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    loadingMessage: "Clearing cart",
    successMessage: "Cart cleared successfully",
    errorMessage: "Error clearing cart"
  }
};