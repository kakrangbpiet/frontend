import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoadedItems, addItem, updateItem, ITravelPackage, setTravelItemVideos, IVideosResponse, setTitles, setLocations, setCategories, updatePackageDates } from './TravelSlice';
import Request from '../../../Backend/apiCall.tsx';
import { addItemToCart, CartItem, loadCart, removeItemFromCart } from './AddToCartSlice.tsx';
import { ApiError, ApiSuccess } from '../../../Datatypes/interface.ts';

export const fetchTravelPackagesApi = createAsyncThunk(
  'travelCollection/setLoadedItems',
  async (
    params: {
      pageSize?: number;
      page?: number;
      status?: string;
      location?: string;
      category?: string;
      select?: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    // Determine which fields are being loaded
    const loadingFields = params.select ? params.select.split(',') : ['all'];
    
    // Set loading state for each field
    dispatch(setLoadedItems({ 
      loading: true,
      loadingFields: loadingFields.reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {} as Record<string, boolean>)
    }));

    try {
      const queryParams = new URLSearchParams();
      if (params?.status) queryParams.append('status', params.status);
      if (params?.location) queryParams.append('location', params.location);
      if (params?.category) queryParams.append('category', params.category);
      if (params?.pageSize) queryParams.append('pageSize', String(params.pageSize));
      if (params?.page) queryParams.append('page', String(params.page));
      if (params?.select) queryParams.append('select', params.select);

      const slug = queryParams.toString() ? `?${queryParams.toString()}` : '';

      const response = await Request({
        endpointId: "GET_TRAVEL_ITEMS",
        slug,
      });

      const { data, total, page, pageSize, totalPages } = response;

      dispatch(setLoadedItems({
        itemData: data,
        loading: false,
        loadingFields: loadingFields.reduce((acc, field) => {
          acc[field] = false;
          return acc;
        }, {} as Record<string, boolean>),
        pagination: {
          currentPage: page || 1,
          pageSize: pageSize || 10,
          totalItems: total || 0,
          totalPages: totalPages || 1,
        }
      }));

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Items fetched successfully',
        data: response.data,
      };

      return apiSuccess;
    } catch (error) {
      dispatch(setLoadedItems({ 
        loading: false,
        loadingFields: {}
      }));
      const castedError = error as ApiError;
      return rejectWithValue(
        typeof castedError?.error === 'string' ? castedError?.error : 'Unknown Error'
      );
    }
  }
);

export const fetchSingleTravelPackageApi = createAsyncThunk(
  'travelCollection/setLoadedItems',
  async (
    { 
      itemId, 
      select 
    }: { 
      itemId?: string; 
      select?: string;
    }, 
    { rejectWithValue, dispatch }
  ) => {
    // Determine which fields are being loaded
    const loadingFields = select ? select.split(',') : ['all'];
    
    // Set loading state for each field
    dispatch(setLoadedItems({
      loading: true,
      loadingFields: loadingFields.reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {} as Record<string, boolean>)
    }));

    try {
      const queryParams = new URLSearchParams();
      if (select) queryParams.append('select', select);
      
      const slug = `/${itemId}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

      const response = await Request({
        endpointId: "GET_SINGLE_TRAVEL_ITEM",
        slug,
      });

      const item: ITravelPackage = response.data;
      dispatch(setLoadedItems({ 
        itemData: [item], 
        loading: false,
        loadingFields: loadingFields.reduce((acc, field) => {
          acc[field] = false;
          return acc;
        }, {} as Record<string, boolean>)
      }));

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Item fetched successfully',
        data: response,
      };

      return apiSuccess;

    } catch (error) {
      dispatch(setLoadedItems({
        loading: false,
        loadingFields: {}
      }));
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);

export const addTravelPackageApi = createAsyncThunk(
  'travelCollection/addItem',
  async ({ newTravelPackageData, formEvent, clearForm, setIsSaving }: { newTravelPackageData: ITravelPackage, formEvent: any, clearForm: any, setIsSaving: any }, { rejectWithValue, dispatch }) => {
    try {
      let response;

      if (formEvent === "EDIT") {
        // Update item logic
        response = await Request({
          endpointId: "EDIT_TRAVEL_ITEM",
          slug: `/${newTravelPackageData.id}`,
          data: newTravelPackageData,
        });
        dispatch(updateItem(response));
      } else {
        // Add new item logic
        response = await Request({
          endpointId: "ADD_TRAVEL_ITEM",
          data: newTravelPackageData,
        });
        clearForm();
        dispatch(addItem(response));
      }

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Item processed successfully',
        data: response,
      };

      setIsSaving(false);
      return apiSuccess;

    } catch (error) {
      setIsSaving(false);
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);
// Add these to your existing async thunks
export const fetchTravelPackageDatesApi = createAsyncThunk(
  'travelCollection/setPackageDates',
  async (
    { packageId }: { packageId: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await Request({
        endpointId: "GET_TRAVEL_ITEM_DATES",
        slug: `/${packageId}`,
      });
      

      dispatch(updatePackageDates({
        packageId: packageId,
        dateAvailabilities: response.data
      }));
      dispatch(setLoadedItems({
        loadingFields: {
          dateAvailabilities: false
        },
        loading: false
      }));

      return {
        statusCode: response.status,
        message: 'Dates fetched successfully',
        data: response.data,
      };

    } catch (error) {
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error || 'Error fetching dates');
    }
  }
);

export const updateTravelPackageStatus = createAsyncThunk(
  'travelCollection/updateItem',
  async ({ itemId, status, setIsUpdating }: { itemId?: string, status: string, setIsUpdating?: any }, { rejectWithValue, dispatch }) => {
    try {
      setIsUpdating(true);
      const response = await Request({
        endpointId: "UPDATE_TRAVEL_ITEM_STATUS",
        slug: `/${itemId}`,
        data: { status, id: itemId },
      });

      dispatch(updateItem(response));
      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Item status updated successfully',
        data: response,
      };

      setIsUpdating(false);
      return apiSuccess;

    } catch (error) {
      setIsUpdating(false);
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);

// Async Thunks
export const addToCartApi = createAsyncThunk(
  'cart/addToCartApi',
  async (
    { item, isAuthenticated }: { item: CartItem; isAuthenticated: boolean },
    { rejectWithValue, dispatch }
  ) => {
    if (isAuthenticated) {
      try {
        const response = await Request({
          endpointId: 'ADD_TO_CART',
          data: item,
        });

        const updatedItem = { ...response.data, quantity: item.quantity };

        dispatch(addItemToCart(updatedItem));
        return updatedItem;
      } catch (error) {
        return rejectWithValue('An error occurred while adding to cart.');
      }
    } else {
      try {
        const existingCart = sessionStorage.getItem('cart');
        let cartItems = existingCart ? JSON.parse(existingCart) : [];

        const existingItemIndex = cartItems.findIndex(
          (cartItem: CartItem) => cartItem.id === item.id && cartItem.size === item.size
        );
        if (existingItemIndex !== -1) {
          cartItems[existingItemIndex].quantity += item.quantity;
        } else {
          cartItems.push(item);
        }

        sessionStorage.setItem('cart', JSON.stringify(cartItems));
        dispatch(addItemToCart(item));

        // Show toast notification when item is added to cart in session storage
        alert(`${item.name} (Size: ${item.size}) has been added to your cart!`);

        return { message: 'Item saved to cart in sessionStorage', item };
      } catch (error) {
        return rejectWithValue('Failed to save item to cart in sessionStorage');
      }
    }
  }
);

export const fetchCartApi = createAsyncThunk(
  'cart/fetchCartApi',
  async ({ isAuthenticated }: { isAuthenticated: boolean }, { rejectWithValue, dispatch }) => {
    if (isAuthenticated) {
      try {
        const response = await Request({
          endpointId: 'GET_CART',
        });

        // Ensure `response.data` exists and is an array of cart items
        if (response.data && Array.isArray(response.data)) {
          // Remove duplicates based on the item id
          const uniqueCartItems = response.data.filter((value: { id: any; }, index: any, self: any[]) =>
            index === self.findIndex((t) => t.id === value.id)
          );

          // Dispatch the entire cart once fetched
          const detailedCartItems = await Promise.all(
            uniqueCartItems.map(async (item: CartItem) => {
              const itemDetails = await Request({
                endpointId: 'GET_SINGLE_TRAVEL_ITEM',
                slug: `/${item.id}`,
              });

              return {
                ...item,
                name: itemDetails[0].title,
                price: itemDetails[0].price,
                image: itemDetails[0].image,
              };
            })
          );

          // Dispatch the loaded cart
          dispatch(loadCart(detailedCartItems));
          return detailedCartItems;
        } else {
          console.error('Invalid response structure or cartItems is not an array');
        }
      } catch (error) {
        return rejectWithValue('Failed to fetch cart from backend');
      }
    } else {
      try {
        const savedCart = sessionStorage.getItem('cart');
        const cartItems: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

        // Remove duplicates from savedCart items
        const uniqueCartItems = cartItems.filter((value, index, self) =>
          index === self.findIndex((t) => t.id === value.id)
        );

        // Fetch detailed information for each unique item in the cart
        const detailedCartItems = await Promise.all(
          uniqueCartItems.map(async (item) => {
            try {
              const response = await Request({
                endpointId: "GET_SINGLE_TRAVEL_ITEM",
                slug: `/${item.id}`,
              });

              const detailedItem = response[0];
              return {
                ...item,
                name: detailedItem.title,
                price: detailedItem.price,
                image: detailedItem.image,
              };
            } catch (error) {
              console.error(`Failed to fetch details for item ID: ${item.id}`, error);

              return {
                ...item,
                price: undefined, // Random price if fetching fails
              };
            }
          })
        );

        // Update Redux state with detailed cart items
        dispatch(loadCart(detailedCartItems));
        return detailedCartItems;
      } catch (error) {
        return rejectWithValue('Failed to fetch cart from sessionStorage');
      }
    }
  }
);

export const removeItemQuantityApi = createAsyncThunk(
  'cart/removeItemQuantityApi',
  async (
    { itemId, isAuthenticated }: { itemId: string; isAuthenticated: boolean },
    { rejectWithValue, dispatch }
  ) => {
    if (isAuthenticated) {
      try {
        const response = await Request({
          endpointId: 'REMOVE_ITEM_FROM_CART',
          data: { id: itemId },
        });
        dispatch(removeItemFromCart(itemId));
        return response;
      } catch (error) {
        return rejectWithValue('An error occurred while removing item.');
      }
    } else {
      try {
        const existingCart = sessionStorage.getItem('cart');
        let cartItems = existingCart ? JSON.parse(existingCart) : [];

        const existingItemIndex = cartItems.findIndex((cartItem: CartItem) => cartItem.id === itemId);

        if (existingItemIndex !== -1) {
          const item = cartItems[existingItemIndex];

          // Only reduce quantity if it's greater than 1
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            // If quantity is 1 or less, remove the item entirely
            cartItems = cartItems.filter((cartItem: CartItem) => cartItem.id !== itemId);
          }

          // Ensure sessionStorage is updated with the new cart state
          sessionStorage.setItem('cart', JSON.stringify(cartItems));
        }


        dispatch(removeItemFromCart(itemId));
        return { message: 'Item quantity updated in sessionStorage', itemId };
      } catch (error) {
        return rejectWithValue('Failed to update item in sessionStorage');
      }
    }
  }
);

export const fetchTravelItemVideosApi = createAsyncThunk(
  'travelCollection/setTravelItemVideos',
  async ({ itemId }: { itemId?: string }, { rejectWithValue, dispatch }) => {
    if (!itemId) {
      return rejectWithValue('Item ID is required');
    }

    dispatch(setLoadedItems({ loading: true }));
    try {
      const response = await Request({
        endpointId: 'GET_TRAVEL_ITEM_VIDEOS',
        slug: `/${itemId}`,
      });

      // Type the response data as IVideosResponse[]
      const videosData: IVideosResponse[] = Array.isArray(response.data) 
        ? response.data.map((item: any) => ({
            videoCount: item.videoCount,
            randomVideo: {
              id: item.randomVideo.id,
              base64Data: item.randomVideo.base64Data
            }
          }))
        : [{
            videoCount: response.data.videoCount,
            randomVideo: {
              id: response.data.randomVideo.id,
              base64Data: response.data.randomVideo.base64Data
            }
          }];

      dispatch(setTravelItemVideos({
        packageId: itemId,
        videos: videosData
      }));
      dispatch(setLoadedItems({ loading: false }));

      const apiSuccess: ApiSuccess = {
        message: 'Videos fetched successfully',
        data: videosData,
      };
      return apiSuccess;
    } catch (error) {
      dispatch(setLoadedItems({ loading: false }));
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  'travelCollection/fetchAllCategories',
  async (_, { rejectWithValue,dispatch }) => {
    try {
      // Replace with your actual API endpoint for categories
      const response = await Request({
        endpointId: "GET_ALL_CATEGORIES",
      });
      dispatch(setCategories(response.data))
      
      return {
        statusCode: response.status,
        message: 'Categories fetched successfully',
        data: response.data,
      };
    } catch (error) {
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error || 'Failed to fetch categories');
    }
  }
);

export const fetchAllLocations = createAsyncThunk(
  'travelCollection/fetchAllLocations',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await Request({
        endpointId: "GET_ALL_LOCATIONS",
      });

      // Normalize to { value, label } format
      const data = (response.data as string[]).map((loc) => ({
        value: loc.toLowerCase().replace(/\s+/g, ''),
        label: loc.charAt(0).toUpperCase() + loc.slice(1),
      }));
      dispatch(setLocations(response.data))

      return {
        statusCode: response.status,
        message: 'Locations fetched successfully',
        data,
      };
    } catch (error) {
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error || 'Failed to fetch locations');
    }
  }
);

export const fetchAllTitles = createAsyncThunk(
  'travelCollection/fetchAllTitles',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await Request({
        endpointId: "GET_ALL_TITLES",
      });

      const titles = response.data as Array<{ id: string; title: string }>;

      dispatch(setTitles(titles));

      return {
        statusCode: response.status,
        message: 'Titles fetched successfully',
        data: titles,
      };
    } catch (error) {
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error || 'Failed to fetch titles');
    }
  }
);
