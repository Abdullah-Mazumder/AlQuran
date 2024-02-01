import { SingleSurahInfo } from "src/types/types";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("data.db");

export const getSurahInfoById = async (
  ids: number[]
): Promise<SingleSurahInfo[]> => {
  return new Promise<SingleSurahInfo[]>((resolve) => {
    db.transaction((tx) => {
      const idString = ids.join(",");
      const query = `select * from surahList where id in (${idString})`;
      tx.executeSql(query, [], (_, { rows }) => {
        const result = rows._array as SingleSurahInfo[];
        resolve(result);
      });
    });
  });
};
