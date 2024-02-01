import { SingleSurahInfo } from "src/types/types";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("data.db");

export const getSurahList = async (): Promise<SingleSurahInfo[]> => {
  return new Promise<SingleSurahInfo[]>((resolve) => {
    db.transaction((tx) => {
      const surahListQuery = "SELECT * FROM surahList";
      tx.executeSql(surahListQuery, [], async (_, { rows }) => {
        const result = rows._array;
        resolve(result);
      });
    });
  });
};
