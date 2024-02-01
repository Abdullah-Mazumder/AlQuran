import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookmarkedListState,
  readBookmarkedListFromDb,
} from "src/redux/features/bookmarkList/bookmarkListSlice";
import {
  SurahInfoState,
  readSurahInfoWithIdFromDb,
} from "src/redux/features/surahInfo/surahInfoSlice";
import {
  WordsState,
  readWordsFromDb,
} from "src/redux/features/words/wordsSlice";
import { AyahInfo, SingleSurahInfo, WordInfo } from "src/types/types";

interface VersesWithSurahInfo extends AyahInfo {
  surahInfo?: SingleSurahInfo;
}

const useGetSubjectWiseQuranData = (
  surahIds: number[],
  conditions: { surahId: number; verseId: number }[]
) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [newVerses, setNewVerses] = useState<VersesWithSurahInfo[]>([]);
  const [surahInformations, setSurahInformations] = useState<
    Record<string, SingleSurahInfo>
  >({});
  const [wordsInformations, setWordsInformations] = useState<
    Record<string, WordInfo[]>
  >({});

  const { verses } = useSelector(
    (state: { bookmarkedList: BookmarkedListState }) => state.bookmarkedList
  );
  const { surahInfo } = useSelector(
    (state: { surahInfo: SurahInfoState }) => state.surahInfo
  );
  const { words } = useSelector((state: { words: WordsState }) => state.words);

  useEffect(() => {
    dispatch(readBookmarkedListFromDb(conditions) as any);
  }, [conditions]);

  useEffect(() => {
    dispatch(readSurahInfoWithIdFromDb(surahIds) as any);
  }, [surahIds]);

  useEffect(() => {
    dispatch(readWordsFromDb(conditions) as any);
  }, [conditions]);

  useEffect(() => {
    if (verses.length > 0 && surahInfo.length > 0 && words.length > 0) {
      const wordsInfo = words.reduce((acc, word) => {
        const { surahId, verseId } = word;
        const key = `${surahId}_${verseId}`;

        if (acc[key]) acc[key].push(word);
        else acc[key] = [word];

        return acc;
      }, {});

      setWordsInformations(wordsInfo);

      const surahInformation = surahInfo.reduce((acc, cur) => {
        acc[cur.id.toString()] = cur;
        return acc;
      }, {});

      setSurahInformations(surahInformation);

      const allVerses = verses.reduce((acc, cur) => {
        const surahId = cur.surahId.toString();
        if (acc[surahId]) {
          acc[surahId].push(cur);
        } else {
          acc[surahId] = [cur];
        }
        return acc;
      }, {});

      const updatedVerses: VersesWithSurahInfo[] = [];

      for (const key of Object.keys(allVerses)) {
        const surahId = key.toString();
        const verseArray = allVerses[surahId];

        verseArray[0] = {
          ...verseArray[0],
          ...{ surahInfo: surahInformation[surahId] },
        };
        updatedVerses.push(...verseArray);
      }

      setNewVerses(updatedVerses);

      setIsLoading(false);
    }
  }, [verses, surahInfo, words]);

  return { isLoading, verses: newVerses, surahInformations, wordsInformations };
};

export default useGetSubjectWiseQuranData;
