import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SingleSurahInfo } from "src/types/types";
import { getSurahInfoById } from "./surahInfoApi";

export interface SurahInfoState {
  isLoading: boolean;
  surahInfo: SingleSurahInfo[];
}

const initialState: SurahInfoState = {
  isLoading: true,
  surahInfo: [],
};

export const readSurahInfoWithIdFromDb = createAsyncThunk(
  "surahInfo/getSurahInfo",
  async (ids: number[]) => {
    const data = await getSurahInfoById(ids);
    return data as SingleSurahInfo[];
  }
);

const surahInfoSlice = createSlice({
  name: "surahInfo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(readSurahInfoWithIdFromDb.pending, (state) => {
      state.isLoading = true;
      state.surahInfo = [];
    });

    builder.addCase(
      readSurahInfoWithIdFromDb.fulfilled,
      (state, action: PayloadAction<SingleSurahInfo[]>) => {
        state.isLoading = false;
        state.surahInfo = action.payload;
      }
    );
  },
  reducers: {},
});

export default surahInfoSlice.reducer;
