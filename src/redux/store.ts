import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
// import logger from 'redux-logger'
import TravelSlice from "./slices/Travel/TravelSlice"
import AddToCartSlice from "./slices/Travel/AddToCartSlice"
import AuthSlice from "./slices/login/authSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
        travelCollection:TravelSlice,
        cart:AddToCartSlice,
        auth:AuthSlice
    }, 
    // middleware:getDefaultMiddlerware =>
    //   getDefaultMiddlerware().concat(logger),
    //   devTools:true
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>