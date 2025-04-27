
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITravelPackage {
    id: string;
    title: string;
    description?: string;
    image: string;
    images?: string[]; // Additional images for gallery
    videos?: IVideosResponse[] | string[]; 
    location?: string;
    category: string;
    status: 'active' | 'inactive' | 'sold-out' | 'coming-soon';
    maxTravelers?: number;
    availableSpots?: number;
    travelType?: 'group' | 'private' | 'self-guided';
    dateAvailabilities:DateAvailability[],
    activities?:string[]
  }

  export interface IVideoItem {
    id: string;
    base64Data: string;
    // title?: string;
    // duration?: number;
    // thumbnail?: string;
  }
  export interface IVideosResponse {
    videoCount: number;
    randomVideo: IVideoItem;
  }
  export interface DateAvailability {
    id?: string;
    startDate: number;
    endDate: number;
    maxTravelers: number;
    availableSpots: number;
    price: number;
    originalPrice?: number; // For showing discounts
    travelPackageId?:string
  }
  interface TravelState {
    travelPackages: ITravelPackage[];
    travelPackagesByCategory: { [category: string]: ITravelPackage[] };
    loading: boolean;
    loadingFields: Record<string, boolean>; 
    loadingByCategory: { [category: string]: boolean };
    categories?: string[];
    locations?: Array<{ value: string; label: string }>;
    titles?: Array<{ id: string; title: string }>;
    pagination: {
      currentPage: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    };
  }


const initialState: TravelState = {
  travelPackages: [] as ITravelPackage[],
  travelPackagesByCategory: {} as { [category: string]: ITravelPackage[] },
  loading: false,
  loadingFields: {},
  loadingByCategory: {},
  categories: [],
  locations: [],
  titles: [],
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1,
  },
};

const travelSlice = createSlice({
  name: 'travelCollection',
  initialState,
  reducers: {
    setLoadedItems: (state, action: PayloadAction<{
      itemData?: ITravelPackage[];
      loading: boolean;
      loadingFields?: Record<string, boolean>;
      pagination?: {
        currentPage: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
      };
    }>) => {
      const { itemData, loading, loadingFields, pagination } = action.payload;
    
      if (itemData) {
        itemData.forEach((newItem) => {
          const index = state.travelPackages.findIndex((item) => item.id === newItem.id);
          if (index !== -1) {
            // Deep merge the existing item with the new data
            state.travelPackages[index] = {
              ...state.travelPackages[index],
              ...newItem,
              // Special handling for arrays to prevent overwriting
              images: newItem.images ?? state.travelPackages[index].images,
              videos: newItem.videos ?? state.travelPackages[index].videos,
              dateAvailabilities: newItem.dateAvailabilities ?? state.travelPackages[index].dateAvailabilities,
              activities: newItem.activities ?? state.travelPackages[index].activities
            };
          } else {
            state.travelPackages.push(newItem);
          }
        });
      }
    
      if (pagination) {
        state.pagination = pagination;
      }
    
      state.loading = loading;
    
      if (loadingFields) {
        state.loadingFields = {
          ...state.loadingFields,
          ...loadingFields,
        };
      }
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
    setTravelItemVideos: (state, action: PayloadAction<{ packageId: string; videos: IVideosResponse[] }>) => {
      const { packageId, videos } = action.payload;
      const packageIndex = state.travelPackages.findIndex((item) => item.id === packageId);
      
      if (packageIndex !== -1) {
        // Update the main travelPackages array
        state.travelPackages[packageIndex].videos = videos;
        
        // Also update any instances in the categorized packages
        for (const category in state.travelPackagesByCategory) {
          const categoryPackageIndex = state.travelPackagesByCategory[category].findIndex(
            (item) => item.id === packageId
          );
          if (categoryPackageIndex !== -1) {
            state.travelPackagesByCategory[category][categoryPackageIndex].videos = videos;
          }
        }
      }
    },
    updatePackageDates: (state, action: PayloadAction<{
      packageId: string;
      dateAvailabilities: DateAvailability[];
    }>) => {
      const { packageId, dateAvailabilities } = action.payload;
      const packageIndex = state.travelPackages.findIndex(p => p.id === packageId);
      
      if (packageIndex !== -1) {
        state.travelPackages[packageIndex].dateAvailabilities = dateAvailabilities;
        
        // Also update in categorized packages if exists
        for (const category in state.travelPackagesByCategory) {
          const catPackageIndex = state.travelPackagesByCategory[category]
            .findIndex(p => p.id === packageId);
          if (catPackageIndex !== -1) {
            state.travelPackagesByCategory[category][catPackageIndex].dateAvailabilities = dateAvailabilities;
          }
        }
      }
    },
    updateItem: (state, action: PayloadAction<ITravelPackage>) => {
      const updatedItem = action.payload;
      const itemIndex = state.travelPackages.findIndex((item) => item.id === updatedItem.id);
      if (itemIndex !== -1) {
        state.travelPackages[itemIndex] = updatedItem;
      }
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setLocations: (state, action: PayloadAction<Array<{ value: string; label: string }>>) => {
      state.locations = action.payload;
    },
    setTitles: (state, action) => {
      state.titles = action.payload;
    },
  },
});

export const {
  setLoadedItems,
  setCategoryLoading,
  setTravelPackagesByCategory,
  addItem,
  updateItem,
  setTravelItemVideos,
  setCategories,
  setLocations,
  setTitles,
  updatePackageDates
} = travelSlice.actions;

export default travelSlice.reducer;

export const selectedTravelPackages = (state: { travelCollection: TravelState }) =>
  state.travelCollection;
export const selectedTravelPackagesLoading = (state: { travelCollection: TravelState }) =>
  state.travelCollection.loading;

export const useSelectedTravelPackage = (itemId: string | undefined) => (state: { travelCollection: TravelState }) =>
  state.travelCollection.travelPackages.find((item) => item.id === itemId);

export const selectTravelPackagesByCategory = (category: string) =>(state: { travelCollection: TravelState }) =>
  state.travelCollection.travelPackagesByCategory[category] || [];


export const selectCategories = (state: { travelCollection: TravelState }) =>
  state.travelCollection.categories || [];

export const selectLocations = (state: { travelCollection: TravelState }) =>
  state.travelCollection.locations || [];

export const selectTitles = (state: { travelCollection: TravelState }) =>
  state.travelCollection.titles || [];

export const selectFieldLoading = (field: string) => (state: { travelCollection: TravelState }) =>
  state.travelCollection.loadingFields[field] || false;

export const selectPackageDates = (packageId: string) => (state: { travelCollection: TravelState }) => {
  const packageItem = state.travelCollection.travelPackages.find(p => p.id === packageId);
  return packageItem?.dateAvailabilities || [];
};


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