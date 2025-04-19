
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITravelPackage {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number; // For showing discounts
    image: string;
    images?: string[]; // Additional images for gallery
    location?: string;
    category: string;
    status: 'active' | 'inactive' | 'sold-out' | 'coming-soon';
    maxTravelers?: number;
    availableSpots?: number;
    travelType?: 'group' | 'private' | 'self-guided';
    dateAvailabilities:DateAvailability[]
  }
  export interface DateAvailability {
    startDate: number;
    endDate: number;
    maxTravelers: number;
    availableSpots: number;
  }
interface TravelState {
  travelPackages: ITravelPackage[];
  travelPackagesByCategory: { [category: string]: ITravelPackage[] };
  loading: boolean;
  loadingByCategory: { [category: string]: boolean };
}

const initialState: TravelState = {
  travelPackages: [] as ITravelPackage[],
  travelPackagesByCategory: {} as { [category: string]: ITravelPackage[] },
  loading: false,
  loadingByCategory: {},
};

const travelSlice = createSlice({
  name: 'travelCollection',
  initialState,
  reducers: {
    setLoadedItems: (state, action: PayloadAction<{ itemData?: ITravelPackage[]; loading: boolean }>) => {
      const loadedItems = action.payload.itemData;
      loadedItems &&
        loadedItems.forEach((item) => {
          if (!state.travelPackages.some((existingItem) => existingItem.id === item.id)) {
            state.travelPackages.push(item);
          }
        });
      state.loading = action.payload.loading;
    },
    setTravelPackagesByCategory: (
      state,
      action: PayloadAction<{ category: string; itemData?: ITravelPackage[]; loading: boolean }>
    ) => {
      const { category, itemData, loading } = action.payload;
      state.travelPackagesByCategory[category] = itemData || [];
      state.loadingByCategory[category] = loading;
      const loadedItems = action.payload.itemData;
      loadedItems &&
        loadedItems.forEach((item) => {
          if (!state.travelPackages.some((existingItem) => existingItem.id === item.id)) {
            state.travelPackages.push(item);
          }
        });
      
    },
    setCategoryLoading: (state, action: PayloadAction<{ category: string; loading: boolean }>) => {
      state.loadingByCategory[action.payload.category] = action.payload.loading;
    },

    addItem: (state, action: PayloadAction<ITravelPackage>) => {
      state.travelPackages.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<ITravelPackage>) => {
      const updatedItem = action.payload;
      const itemIndex = state.travelPackages.findIndex((item) => item.id === updatedItem.id);
      if (itemIndex !== -1) {
        state.travelPackages[itemIndex] = updatedItem;
      }
    },
  },
});

export const { setLoadedItems, setCategoryLoading, setTravelPackagesByCategory, addItem, updateItem } = travelSlice.actions;

export default travelSlice.reducer;

export const selectedTravelPackages = (state: { travelCollection: TravelState }) =>
  state.travelCollection;
export const selectedTravelPackagesLoading = (state: { travelCollection: TravelState }) =>
  state.travelCollection.loading;

export const useSelectedTravelPackage = (itemId: string | undefined) => (state: { travelCollection: TravelState }) =>
  state.travelCollection.travelPackages.find((item) => item.id === itemId);

export const selectTravelPackagesByCategory = (category: string) =>(state: { travelCollection: TravelState }) =>
  state.travelCollection.travelPackagesByCategory[category] || [];



// export interface ITravelPackage {
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