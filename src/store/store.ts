import { Middleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import layoutReducer, { initialState } from './slices/layoutSlice';
import { loadState, saveState } from '@/utils';

const rootReducer = combineReducers({
  layout: layoutReducer,
});


let isInitialized = false;

const localStorageMiddleware: Middleware<{}, RootState> = store => next => action => {
  const result = next(action);
  if (isInitialized && typeof window !== 'undefined') {
    const currentState = store.getState().layout;
    if (currentState !== initialState) {
      saveState(currentState);
    }
  }
  isInitialized = true;
  return result;
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;