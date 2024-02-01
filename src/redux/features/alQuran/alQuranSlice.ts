import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { AlQuranInfo } from "src/types/types";
import showToast from "src/utils/showToast";

const initialState: AlQuranInfo = {
  isEnableTajweed: true,
  isShowAudioPlayer: true,
  isPlayFullSurah: true,
  repeatAyahPlaying: 1,
  bnTranslator: "meaningBnAhbayan",
  reciter: "7",
  bookmarkList: {},
  lastReadSurah: 0,
  history: {},
  favouriteSurahList: {},
};

const alQuranSlice = createSlice({
  name: "alQuran",
  initialState,
  reducers: {
    setIsEnableTajweed: (state, action: PayloadAction<boolean>) => {
      state.isEnableTajweed = action.payload;
    },
    setIsShowAudioPlayer: (state, action: PayloadAction<boolean>) => {
      state.isShowAudioPlayer = action.payload;
    },
    setIsPlayFullSurah: (state, action: PayloadAction<boolean>) => {
      state.isPlayFullSurah = action.payload;
    },
    setRepeatAyahPlaying: (state, action: PayloadAction<number>) => {
      state.repeatAyahPlaying = action.payload;
    },
    setBnTranslator: (state, action: PayloadAction<string>) => {
      state.bnTranslator = action.payload;
    },
    setReciter: (state, action: PayloadAction<string>) => {
      state.reciter = action.payload;
    },

    updateBookmarkList: (
      state,
      action: PayloadAction<{
        surahId: number;
        verseId: number;
        language: string;
      }>
    ) => {
      const { surahId, verseId, language } = action.payload;
      const key = `${surahId}_${verseId}`;
      if (state.bookmarkList[key]) {
        delete state.bookmarkList[key];
        if (language === "bangla") showToast("বুকমার্ক থেকে সরানো হয়েছে!");
        else showToast("Removed from bookmark!");
      } else {
        state.bookmarkList[key] = true;
        if (language === "bangla") showToast("বুকমার্ক করা হয়েছে!");
        else showToast("Bookmarked!");
      }
    },

    updateHistory: (
      state,
      action: PayloadAction<{
        surahNumber: number;
        verseNumber: number;
        language: string;
      }>
    ) => {
      let { history } = state;
      const { surahNumber, verseNumber, language } = action.payload;

      if (history[surahNumber] && history[surahNumber] === verseNumber) {
        delete history[surahNumber];
        state.lastReadSurah =
          +Object.keys(history)[Object.keys(history).length - 1];

        if (language === "bangla") showToast("হিসটোরি থেকে বাদ দেয়া হয়েছে!");
        else showToast("Removed From History!");
      } else {
        history[surahNumber] = verseNumber;
        state.lastReadSurah = surahNumber;

        if (language === "bangla") showToast("হিসটোরিতে সেভ করা হয়েছে!");
        else showToast("Saved In History!");
      }
    },

    updateFavouriteSurahList: (state, action: PayloadAction<number>) => {
      if (state.favouriteSurahList[action.payload])
        delete state.favouriteSurahList[action.payload];
      else state.favouriteSurahList[action.payload] = true;
    },
  },
});

const alQuranPersistConfig = {
  key: "QuranApp/alQuran",
  storage: AsyncStorage,
};
const persistedAlQuranReducer = persistReducer(
  alQuranPersistConfig,
  alQuranSlice.reducer
);

export default persistedAlQuranReducer;
export const {
  setIsEnableTajweed,
  setIsShowAudioPlayer,
  setIsPlayFullSurah,
  setRepeatAyahPlaying,
  setBnTranslator,
  setReciter,
  updateBookmarkList,
  updateHistory,
  updateFavouriteSurahList,
} = alQuranSlice.actions;
