import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TafseerDataType } from "src/types/types";
import {
  AyahInfoType,
  TafseerType,
  getAyahInfo,
  getTafseer,
} from "./tafseerApi";

export interface TafseerDataState {
  isLoading: boolean;
  data: TafseerDataType;
}

const initialState: TafseerDataState = {
  isLoading: true,
  data: {
    meaningBnMujibur: "",
    meaningBnAhbayan: "",
    meaningBnTaisirul: "",
    meaningEn: "",
    tafseer: "",
    verseHtml: "",
  },
};

export const readTafseerDataFromDB = createAsyncThunk(
  "tafseerData/getTafseerData",
  async ({ surahId, verseId }: { surahId: number; verseId: number }) => {
    const { data } = (await getTafseer({ surahId, verseId })) as TafseerType;

    const {
      meaningBnAhbayan,
      meaningBnMujibur,
      meaningBnTaisirul,
      meaningEn,
      verseHtml,
    } = (await getAyahInfo({ surahId, verseId })) as AyahInfoType;

    return {
      meaningBnAhbayan,
      meaningBnMujibur,
      meaningBnTaisirul,
      meaningEn,
      tafseer: data,
      verseHtml,
    };
  }
);

const tafseerSlice = createSlice({
  name: "tafseerData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readTafseerDataFromDB.pending, (state) => {
      state.isLoading = true;
      state.data = {
        meaningBnMujibur: "",
        meaningBnAhbayan: "",
        meaningBnTaisirul: "",
        meaningEn: "",
        tafseer: "",
        verseHtml: "",
      };
    });

    builder.addCase(readTafseerDataFromDB.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});

export default tafseerSlice.reducer;
