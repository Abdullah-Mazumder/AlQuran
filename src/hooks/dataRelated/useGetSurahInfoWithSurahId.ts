import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SurahInfoState,
  readSurahInfoWithIdFromDb,
} from "src/redux/features/surahInfo/surahInfoSlice";

const useGetSurahInfoWithSurahId = (ids: number[]) => {
  const dispatch = useDispatch();
  const { isLoading, surahInfo } = useSelector(
    (state: { surahInfo: SurahInfoState }) => state.surahInfo
  );

  useEffect(() => {
    dispatch(readSurahInfoWithIdFromDb(ids) as any);
  }, [ids]);

  return { isLoading, surahInfo };
};

export default useGetSurahInfoWithSurahId;
