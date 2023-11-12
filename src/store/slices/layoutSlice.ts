import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum ComponentType {
  SECTION = 'section',
  BUTTON = 'button',
  ROOT = 'root',
}

export interface StyleProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
  padding?: string;
  margin?: string;
  [key: string]: string | undefined;
}

export interface ComponentProps {
  id: string;
  type: ComponentType;
  children: string[];
  styles: StyleProps;
  text?: string;
  parentId?: string;
}

export interface LayoutState {
  components: { [id: string]: ComponentProps };
  selectedComponentId: string | null;
}

// Define the initial state using the `ComponentProps` type
export const initialState: LayoutState = {
  components: {
    'root': {
      id: 'root',
      type: ComponentType.ROOT,
      children: [],
      styles: {},
    }
  },
  selectedComponentId: null,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    addComponent: (state, action: PayloadAction<{ type: ComponentType; }>) => {
      const { type } = action.payload;
      const newId = `comp_${Math.random().toString(16).slice(2)}`;
      state.components[newId] = {
        id: newId,
        type,
        children: [],
        styles: {
          backgroundColor: '#e8e7e7',
          padding: '10px',
          display: 'block',
          position: 'relative'
        },
        text: type === ComponentType.BUTTON ? 'Button' : undefined,
        parentId: state.selectedComponentId || 'root',
      };

      if (state.selectedComponentId) {
        state.components[state.selectedComponentId].children.push(newId);
      } else {
        state.components['root'].children.push(newId);
      }
    },
    selectComponent: (state, action: PayloadAction<string>) => {
      if (action.payload === ComponentType.ROOT) {
        state.selectedComponentId = null;
        return;
      } else {
        state.selectedComponentId = action.payload;
      }
    },
    deleteComponent: (state, action: PayloadAction<string>) => {
      if (state.selectedComponentId === action.payload) {
        state.selectedComponentId = null;
      }
      const deleteRecursively = (id: string) => {
        state.components[id]?.children.forEach((childId) => deleteRecursively(childId));
        delete state.components[id];
        state.components.root.children = state.components.root.children.filter((childId) => childId !== id);
      };

      deleteRecursively(action.payload);

    },
    updateStyles: (state, action: PayloadAction<{ styles: StyleProps }>) => {
      const { styles } = action.payload;
      if (state.selectedComponentId) {
        state.components[state.selectedComponentId].styles = { ...state.components[state.selectedComponentId].styles, ...styles };
      }
    },
    updateStyle(state, action: PayloadAction<{ name: string; value: string }>) {
      const { name, value } = action.payload;
      if (state.selectedComponentId) {
        state.components[state.selectedComponentId].styles[name] = value;
      }
    },
    updateText(state, action: PayloadAction<string>) {
      if (state.selectedComponentId) {
        state.components[state.selectedComponentId].text = action.payload;
      }
    },
    setupComponents: (state, action: PayloadAction<LayoutState>) => {
      state.components = action.payload.components;
    }
  },
});

export const {
  addComponent,
  selectComponent,
  updateStyles,
  deleteComponent,
  updateText,
  updateStyle,
  setupComponents
} = layoutSlice.actions;

// Selectors
export const selectComponents = (state: RootState) => state.layout.components;
export const selectSelectedComponentId = (state: RootState) => state.layout.selectedComponentId;
export const getSelectedComponentStyles = (state: RootState) => {
  if (state.layout.selectedComponentId) {
    return state.layout.components[state.layout.selectedComponentId].styles
  }
}
export const getSelectedComponent = (state: RootState) => {
  if (state.layout.selectedComponentId) {
    return state.layout.components[state.layout.selectedComponentId]
  }
};

// The reducer
export default layoutSlice.reducer;
