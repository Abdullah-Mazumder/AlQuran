import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSurahList } from "./surahListApi";
import { SingleSurahInfo } from "src/types/types";

export interface SurahListState {
  isLoading: boolean;
  surahList: SingleSurahInfo[];
}

const initialState: SurahListState = {
  isLoading: true,
  surahList: [],
};

export const readSurahListFromDb = createAsyncThunk(
  "surahList/getSurahList",
  async () => {
    const data = await getSurahList();
    return data as SingleSurahInfo[];
  }
);

const surahListSlice = createSlice({
  name: "surahList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(readSurahListFromDb.pending, (state) => {
      state.isLoading = true;
      state.surahList = [];
    });

    builder.addCase(
      readSurahListFromDb.fulfilled,
      (state, action: PayloadAction<SingleSurahInfo[] | undefined>) => {
        state.isLoading = false;
        state.surahList = action.payload || [];
      }
    );

    builder.addCase(readSurahListFromDb.rejected, (state, action) => {
      console.log(action);
    });
  },
  reducers: {},
});

export default surahListSlice.reducer;
