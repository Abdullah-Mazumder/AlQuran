// Import necessary dependencies from Redux Toolkit and other libraries
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistedAppReducer from "./features/app/appSlice";
import persistedThemeReducer from "./features/theme/themeSlice";
import surahListReducer from "./features/surahList/surahListSlice";
import singleSurahReducer from "./features/singleSurah/singleSurahSlice";
import surahInfReducer from "./features/surahInfo/surahInfoSlice";
import alQuranReducer from "./features/alQuran/alQuranSlice";
import tafseerDataReducer from "./features/tafseer/tafseerSlice";
import bookmarkListReducer from "./features/bookmarkList/bookmarkListSlice";
import quranSubjectsReducer from "./features/subjectWiseQuran/subject/subWiseQuranSubSlice";
import wordsReducer from "./features/words/wordsSlice";

// Configure the Redux store with persisted reducers
const store = configureStore({
  reducer: {
    theme: persistedThemeReducer,
    app: persistedAppReducer,
    surahList: surahListReducer,
    surahInfo: surahInfReducer,
    singleSurah: singleSurahReducer,
    alQuran: alQuranReducer,
    tafseerData: tafseerDataReducer,
    bookmarkedList: bookmarkListReducer,
    quranSubjects: quranSubjectsReducer,
    words: wordsReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({ serializableCheck: false }),
});

// Create a persistor for persisting the Redux store
const persistor = persistStore(store);

// Export the Redux store and persistor for use in the application
export { store, persistor };
