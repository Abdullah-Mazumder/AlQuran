import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WordInfo } from "src/types/types";
import { getWords } from "./wordsApi";

export interface WordsState {
  words: WordInfo[];
}

const initialState: WordsState = {
  words: [],
};

export const readWordsFromDb = createAsyncThunk(
  "words/getWords",
  async (conditions: { surahId: number; verseId: number }[]) => {
    const words = await getWords(conditions);
    return words;
  }
);

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(readWordsFromDb.pending, (state) => {
      state.words = [];
    });

    builder.addCase(readWordsFromDb.fulfilled, (state, action) => {
      state.words = action.payload;
    });
  },
});

export default wordsSlice.reducer;
