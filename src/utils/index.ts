import { LayoutState } from '@/store/slices/layoutSlice';
import { RootState } from '@/store/store';

export const loadState = (): RootState | undefined => {
  if (typeof window === 'undefined') {
    return undefined; // Return undefined if we're on the server
  }
  try {
    const serializedState = localStorage.getItem('layout');
    if (serializedState === null) return undefined;
    return { layout: JSON.parse(serializedState) as LayoutState };
  } catch (err) {
    console.error('Failed to load state:', err);
    return undefined;
  }
};

export const saveState = (state: LayoutState): void => {
  if (typeof window === 'undefined') {
    return; // Don't attempt to save if we're on the server
  }
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('layout', serializedState);
  } catch (err) {
    console.error('Failed to save state:', err);
  }
};
