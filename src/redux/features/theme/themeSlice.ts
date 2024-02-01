// Import necessary dependencies from Redux Toolkit and other libraries
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { darkColors, lightColors } from "src/utils/color";

// Define the shape of the theme state
export interface ThemeState {
  isDark: boolean;
  color: typeof darkColors | typeof lightColors;
}

// Initial state for the theme slice
const initialState: ThemeState = {
  isDark: true,
  color: darkColors,
};

// Create a Redux slice for managing the theme state and actions
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // Reducer to toggle the dark mode and update the color accordingly
    toggleIsDark: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
      state.color = action.payload ? darkColors : lightColors;
    },
  },
});

// Configuration for persisting the theme state using Redux Persist
const themePersistConfig = {
  key: "alQuran/theme",
  storage: AsyncStorage,
};

// Create a persisted version of the theme reducer
const persistedThemeReducer = persistReducer(
  themePersistConfig,
  themeSlice.reducer
);

// Export the persisted theme reducer and the corresponding action
export default persistedThemeReducer;
export const { toggleIsDark } = themeSlice.actions;
