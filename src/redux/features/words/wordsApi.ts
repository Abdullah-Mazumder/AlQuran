import { WordInfo } from "src/types/types";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("data.db");

export interface Condition {
  surahId: number;
  verseId: number;
}

const generateDynamicQuery = (conditions: Condition[]): string => {
  return conditions
    .map(
      (condition) =>
        `(surahId = ${condition.surahId} AND verseId = ${condition.verseId})`
    )
    .join(" OR ");
};

export const getWords = async (conditions: Condition[]) => {
  if (conditions.length === 0) return [];
  return new Promise<WordInfo[]>((resolve) => {
    db.transaction((tx) => {
      const query =
        "SELECT * FROM meaningByWord WHERE " + generateDynamicQuery(conditions);

      tx.executeSql(query, [], (_, { rows }) => {
        const result = rows._array as WordInfo[];
        resolve(result);
      });
    });
  });
};
