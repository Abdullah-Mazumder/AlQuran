import { useDispatch, useSelector } from "react-redux";
import {
  SingleSurahState,
  readSingleSurahFromDb,
} from "src/redux/features/singleSurah/singleSurahSlice";
import { useEffect, useState } from "react";
import { SingleAyahOfFullSurah, WordInfoInAyah } from "src/types/types";

interface AyahByWords {
  verseId: number;
  words: WordInfoInAyah[];
}

const useGetSingleSurah = (id: number) => {
  const dispatch = useDispatch();
  const [surah, setSurah] = useState<SingleAyahOfFullSurah[]>([]);
  const { isLoading, meaningByWord, verses, surahInfo } = useSelector(
    (state: { singleSurah: SingleSurahState }) => state.singleSurah
  );

  useEffect(() => {
    if (id) dispatch(readSingleSurahFromDb(id) as any);
  }, [id]);

  useEffect(() => {
    if (!isLoading) {
      const transformedData: AyahByWords[] = [];

      meaningByWord.forEach((word) => {
        const { meaningEn, verseId, meaningBn, wordId } = word;

        const verse = transformedData.find(
          (v: AyahByWords) => v.verseId == verseId
        );

        if (verse) {
          verse.words.push({
            wordId,
            meaningBn,
            meaningEn,
          });
        } else {
          transformedData.push({
            verseId,
            words: [{ wordId, meaningBn, meaningEn }],
          });
        }
      });

      const fullSurah: SingleAyahOfFullSurah[] = JSON.parse(
        JSON.stringify(verses)
      );

      transformedData.forEach((item, index) => {
        fullSurah[index].words = item.words;
      });

      setSurah(fullSurah);
    }
  }, [isLoading]);

  return { isLoading, surahInfo, surah };
};

export default useGetSingleSurah;
