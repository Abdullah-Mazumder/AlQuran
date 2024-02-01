import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSubWiseQuranSub, QuranSubject } from "./subWiseQuranSubApi";

export interface SubWiseQuranSubState {
  isLoading: boolean;
  subjects: QuranSubject[];
}

const initialState: SubWiseQuranSubState = {
  isLoading: false,
  subjects: [],
};

export const readSubWiseQuranSubFromDb = createAsyncThunk(
  "subWiseQuranSub/getSubWiseQuranSub",
  async () => {
    const subjects = await getSubWiseQuranSub();
    return { subjects };
  }
);

const subWiseQuranSubSlice = createSlice({
  name: "quranSubjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readSubWiseQuranSubFromDb.pending, (state) => {
      state.isLoading = true;
      state.subjects = [];
    });

    builder.addCase(readSubWiseQuranSubFromDb.fulfilled, (state, action) => {
      state.isLoading = false;
      state.subjects = action.payload.subjects;
    });
  },
});

export default subWiseQuranSubSlice.reducer;
