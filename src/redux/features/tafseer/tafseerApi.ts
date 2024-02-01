import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("data.db");

export interface TafseerType {
  data: string;
}

interface FnParam {
  surahId: number;
  verseId: number;
}

export const getTafseer = async ({ surahId, verseId }: FnParam) => {
  return new Promise<TafseerType>((resolve) => {
    db.transaction((tx) => {
      const query = `SELECT data FROM tafseer WHERE (surahId = ? and verseId = ?)`;
      tx.executeSql(query, [surahId, verseId], async (_, { rows }) => {
        const result = rows._array;
        resolve(result[0]);
      });
    });
  });
};

export interface AyahInfoType {
  meaningBnMujibur: string;
  meaningBnAhbayan: string;
  meaningBnTaisirul: string;
  meaningEn: string;
  verseHtml: string;
}

export const getAyahInfo = async ({ surahId, verseId }: FnParam) => {
  return new Promise<AyahInfoType>((resolve) => {
    db.transaction((tx) => {
      const query = `SELECT meaningBnMujibur, meaningBnAhbayan, meaningBnTaisirul, meaningEn, verseHtml FROM alQuran WHERE (surahId = ? and verseId = ?)`;

      tx.executeSql(query, [surahId, verseId], async (_, { rows }) => {
        resolve(rows._array[0]);
      });
    });
  });
};
