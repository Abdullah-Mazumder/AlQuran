import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getMeaningByWordWithSurahId,
  getSurahInfoById,
  getVerseOfSurahWithSurahId,
} from "./singleSurahApi";
import { AyahInfo, SingleSurahInfo, WordInfo } from "src/types/types";

export interface SingleSurahState {
  isLoading: boolean;
  meaningByWord: WordInfo[];
  verses: AyahInfo[];
  surahInfo: SingleSurahInfo;
}

const initialState: SingleSurahState = {
  isLoading: true,
  meaningByWord: [],
  verses: [],
  surahInfo: {
    id: 0,
    locationAr: "",
    locationEn: "",
    meaningBn: "",
    meaningEn: "",
    nameAr: "",
    nameBn: "",
    nameEn: "",
    totalAyah: 0,
  },
};

export const readSingleSurahFromDb = createAsyncThunk(
  "singleSurah/getSingleSurah",
  async (id: number) => {
    try {
      const words = await getMeaningByWordWithSurahId(id);
      const ayahInfo = await getVerseOfSurahWithSurahId(id);
      const surahInfo = await getSurahInfoById(id);

      return { words, ayahInfo, surahInfo };
    } catch (error) {
      console.log("error");
    }
  }
);

const singleSurahSlice = createSlice({
  name: "singleSurah",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(readSingleSurahFromDb.pending, (state) => {
      state.isLoading = true;
      state.meaningByWord = [];
      state.verses = [];
    });

    builder.addCase(readSingleSurahFromDb.fulfilled, (state, action) => {
      state.isLoading = false;
      state.meaningByWord = action.payload.words;
      state.verses = action.payload.ayahInfo;
      state.surahInfo = action.payload.surahInfo;
    });

    builder.addCase(readSingleSurahFromDb.rejected, (state, action) => {
      state.isLoading = false;
      state.meaningByWord = [];
      state.verses = [];
    });
  },
  reducers: {},
});

export default singleSurahSlice.reducer;
