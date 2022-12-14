import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from './authSlice'
import locationSlice from './locationSlice'
import sidebarSlice from './sidebarSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['location', 'auth'],
  blacklist: ['sidebar'],
}

const rootReducer = combineReducers({
  location: locationSlice,
  auth: authSlice,
  sidebar: sidebarSlice,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export let persistor = persistStore(store)
