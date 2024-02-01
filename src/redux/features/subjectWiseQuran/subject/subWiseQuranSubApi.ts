import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("data.db");

export interface QuranSubject {
  subject: string;
  location: string;
}

export const getSubWiseQuranSub = async () => {
  return new Promise<QuranSubject[]>((resolve) => {
    db.transaction((tx) => {
      const query = "SELECT * FROM subjectWiseAlQuran";

      tx.executeSql(query, [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
};
