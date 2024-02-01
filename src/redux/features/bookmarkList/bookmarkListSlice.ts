import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AyahInfo } from "src/types/types";
import { Condition, getBookmarkedVerses } from "./bookmarkListApi";

export interface BookmarkedListState {
  isLoading: boolean;
  verses: AyahInfo[];
}

const initialState: BookmarkedListState = {
  isLoading: true,
  verses: [],
};

export const readBookmarkedListFromDb = createAsyncThunk(
  "bookmarkedList/getBookmarkedList",
  async (conditions: Condition[]) => {
    const verses = await getBookmarkedVerses(conditions);

    return { verses };
  }
);

const bookmarkedListSlice = createSlice({
  name: "bookmarkedList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readBookmarkedListFromDb.pending, (state) => {
      state.isLoading = true;
      state.verses = [];
    });

    builder.addCase(
      readBookmarkedListFromDb.fulfilled,
      (
        state,
        action: PayloadAction<{
          verses: AyahInfo[];
        }>
      ) => {
        state.isLoading = false;
        state.verses = action.payload.verses;
      }
    );
  },
});

export default bookmarkedListSlice.reducer;
