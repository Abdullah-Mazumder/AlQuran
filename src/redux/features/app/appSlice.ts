import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { ApplicationState } from "src/types/types";
import { setIsEnableTajweed } from "../alQuran/alQuranSlice";

const initialState: ApplicationState = {
  notes: {},
  language: "english",
  arabicTextSize: 30,
  banglaTextSize: 16,
  englishTextSize: 16,
  arabicFont: "noorehuda",
  isShowBanglaText: true,
  isShowEnglishText: true,
  storage: "internal",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleLanguage: (state, action: PayloadAction<"bangla" | "english">) => {
      state.language = action.payload;
    },
    setArabicTextSize: (state, action: PayloadAction<number>) => {
      state.arabicTextSize = action.payload;
    },
    setBanglaTextSize: (state, action: PayloadAction<number>) => {
      state.banglaTextSize = action.payload;
    },
    setEnglishTextSize: (state, action: PayloadAction<number>) => {
      state.englishTextSize = action.payload;
    },

    setArabicFont: (state, action: PayloadAction<string>) => {
      state.arabicFont = action.payload;
    },

    setIsShowBanglaText: (state, action: PayloadAction<boolean>) => {
      state.isShowBanglaText = action.payload;
    },

    setIsShowEnglishText: (state, action: PayloadAction<boolean>) => {
      state.isShowEnglishText = action.payload;
    },

    setStorage: (state, action: PayloadAction<"internal" | "external">) => {
      state.storage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      setIsEnableTajweed,
      (state, action: PayloadAction<boolean>) => {
        if (action.payload) {
          if (state.arabicFont === "noorehuda")
            state.arabicFont = "arabicHafezi";
        } else {
          if (state.arabicFont === "arabicHafezi")
            state.arabicFont = "noorehuda";
        }
      }
    );
  },
});

// Configuration for Redux persist
const appPersistConfig = {
  key: "alQuran/app",
  storage: AsyncStorage,
};

// Create a persisted reducer using Redux persist
const persistedAppReducer = persistReducer(appPersistConfig, appSlice.reducer);

// Export the persisted reducer and action creators
export default persistedAppReducer;

export const {
  toggleLanguage,
  setArabicFont,
  setArabicTextSize,
  setBanglaTextSize,
  setEnglishTextSize,
  setIsShowBanglaText,
  setIsShowEnglishText,
  setStorage,
} = appSlice.actions;
