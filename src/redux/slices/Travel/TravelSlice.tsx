
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITravelItem {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number; // For showing discounts
    image: string;
    images?: string[]; // Additional images for gallery
    location: string;
    category: string;
    status: 'active' | 'inactive' | 'sold-out' | 'coming-soon';
    maxTravelers?: number;
    availableSpots?: number;
    travelType?: 'group' | 'private' | 'self-guided';
  }

interface TravelState {
  travelItems: ITravelItem[];
  travelItemsByCategory: { [category: string]: ITravelItem[] };
  loading: boolean;
  loadingByCategory: { [category: string]: boolean };
}

const initialState: TravelState = {
  travelItems: [] as ITravelItem[],
  travelItemsByCategory: {} as { [category: string]: ITravelItem[] },
  loading: false,
  loadingByCategory: {},
};

const travelSlice = createSlice({
  name: 'travelCollection',
  initialState,
  reducers: {
    setLoadedItems: (state, action: PayloadAction<{ itemData?: ITravelItem[]; loading: boolean }>) => {
      const loadedItems = action.payload.itemData;
      loadedItems &&
        loadedItems.forEach((item) => {
          if (!state.travelItems.some((existingItem) => existingItem.id === item.id)) {
            state.travelItems.push(item);
          }
        });
      state.loading = action.payload.loading;
    },
    setTravelItemsByCategory: (
      state,
      action: PayloadAction<{ category: string; itemData?: ITravelItem[]; loading: boolean }>
    ) => {
      const { category, itemData, loading } = action.payload;
      state.travelItemsByCategory[category] = itemData || [];
      state.loadingByCategory[category] = loading;
      const loadedItems = action.payload.itemData;
      loadedItems &&
        loadedItems.forEach((item) => {
          if (!state.travelItems.some((existingItem) => existingItem.id === item.id)) {
            state.travelItems.push(item);
          }
        });
      
    },
    setCategoryLoading: (state, action: PayloadAction<{ category: string; loading: boolean }>) => {
      state.loadingByCategory[action.payload.category] = action.payload.loading;
    },

    addItem: (state, action: PayloadAction<ITravelItem>) => {
      state.travelItems.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<ITravelItem>) => {
      const updatedItem = action.payload;
      const itemIndex = state.travelItems.findIndex((item) => item.id === updatedItem.id);
      if (itemIndex !== -1) {
        state.travelItems[itemIndex] = updatedItem;
      }
    },
  },
});

export const { setLoadedItems, setCategoryLoading, setTravelItemsByCategory, addItem, updateItem } = travelSlice.actions;

export default travelSlice.reducer;

export const selectedTravelItems = (state: { travelCollection: TravelState }) =>
  state.travelCollection;

export const useSelectedTravelItem = (itemId: string | undefined) => (state: { travelCollection: TravelState }) =>
  state.travelCollection.travelItems.find((item) => item.id === itemId);

export const selectTravelItemsByCategory = (category: string) =>(state: { travelCollection: TravelState }) =>
  state.travelCollection.travelItemsByCategory[category] || [];



// export interface ITravelItem {
//     id: string;
//     title: string;
//     description: string;
//     price: number;
//     originalPrice?: number; // For showing discounts
//     image: string;
//     images?: string[]; // Additional images for gallery
//     location: string;
//     category: string;
//     duration: string; // e.g., "7 days", "2 weeks"
//     departureDate?: string; // ISO date string
//     returnDate?: string; // ISO date string
//     rating?: number; // 1-5 stars
//     reviewCount?: number;
//     inclusions: string[]; // What's included in the package
//     exclusions?: string[]; // What's not included
//     itinerary?: {
//       day: number;
//       title: string;
//       description: string;
//     }[];
//     status: 'active' | 'inactive' | 'sold-out' | 'coming-soon';
//     createdAt?: string;
//     updatedAt?: string;
//     maxTravelers?: number;
//     availableSpots?: number;
//     difficultyLevel?: 'easy' | 'moderate' | 'challenging';
//     travelType?: 'group' | 'private' | 'self-guided';
//     highlights?: string[]; // Key features/attractions
//     accommodations?: string; // Type of accommodations
//     transportation?: string; // Type of transportation included
//     ageRequirement?: number; // Minimum age
//     cancellationPolicy?: string;
//     tags?: string[]; // For filtering/search (e.g., "beach", "adventure", "family")
//     isFeatured?: boolean;
//     discount?: number; // Percentage discount
//   }