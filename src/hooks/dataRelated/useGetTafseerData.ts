import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TafseerDataState,
  readTafseerDataFromDB,
} from "src/redux/features/tafseer/tafseerSlice";

const useGetTafseerData = (surahId: number, verseId: number) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(
    (state: { tafseerData: TafseerDataState }) => state.tafseerData
  );

  useEffect(() => {
    dispatch(readTafseerDataFromDB({ surahId, verseId }) as any);
  }, [surahId, verseId]);

  return { isLoading, data };
};

export default useGetTafseerData;
