import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SurahListState,
  readSurahListFromDb,
} from "src/redux/features/surahList/surahListSlice";

const useGetSurahList = () => {
  const dispatch = useDispatch();
  const { isLoading, surahList } = useSelector(
    (state: { surahList: SurahListState }) => state.surahList
  );

  useEffect(() => {
    dispatch(readSurahListFromDb() as any);
  }, []);

  return { isSurahListLoading: isLoading, surahList };
};

export default useGetSurahList;
