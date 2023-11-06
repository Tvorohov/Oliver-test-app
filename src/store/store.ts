import { Middleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import layoutReducer, { initialState } from './slices/layoutSlice';
import { loadState, saveState } from '@/utils';

const rootReducer = combineReducers({
  layout: layoutReducer,
});

const preloadedState = loadState();

const localStorageMiddleware: Middleware<{}, RootState> = store => next => action => {
  const result = next(action);
  if (typeof window !== 'undefined') {
    saveState(store.getState().layout);
  }
  return result;
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState || { layout: initialState },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;