import { AyahInfo, SingleSurahInfo, WordInfo } from "src/types/types";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("data.db");

export const getMeaningByWordWithSurahId = async (
  id: number
): Promise<WordInfo[]> => {
  return new Promise<WordInfo[]>((resolve, reject) => {
    db.transaction((tx) => {
      const query = `SELECT * FROM meaningByWord WHERE surahId = ${id}`;
      tx.executeSql(
        query,
        [],
        (_, { rows }) => {
          const words = rows._array as WordInfo[];
          resolve(words);
        },
        (error) => {
          console.error("Error executing SQL query:", error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const getSurahInfoById = async (
  id: number
): Promise<SingleSurahInfo> => {
  return new Promise<SingleSurahInfo>((resolve, reject) => {
    db.transaction((tx) => {
      const query = `SELECT * FROM surahList WHERE id = ${id}`;
      tx.executeSql(
        query,
        [],
        (_, { rows }) => {
          const result = rows._array[0];
          resolve(result);
        },
        (error) => {
          console.error("Error executing SQL query:", error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const getVerseOfSurahWithSurahId = async (
  id: number
): Promise<AyahInfo[]> => {
  return new Promise<AyahInfo[]>((resolve, reject) => {
    db.transaction((tx) => {
      const query = `SELECT * FROM alQuran WHERE surahId = ${id}`;
      tx.executeSql(
        query,
        [],
        (_, { rows }) => {
          const ayahInfo = rows._array as AyahInfo[];
          resolve(ayahInfo);
        },
        (error) => {
          console.error("Error executing SQL query:", error);
          reject(error);
          return true;
        }
      );
    });
  });
};
