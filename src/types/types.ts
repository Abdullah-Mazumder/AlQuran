export interface ApplicationState {
  notes: Record<string, any>;
  language: "bangla" | "english";
  arabicTextSize: number;
  banglaTextSize: number;
  englishTextSize: number;
  arabicFont: string;
  isShowBanglaText: boolean;
  isShowEnglishText: boolean;
  storage: "internal" | "external";
}

export interface WordInfo {
  surahId: number;
  verseId: number;
  wordId: number;
  meaningBn: string;
  meaningEn: string;
}

export interface WordInfoInAyah {
  wordId: number;
  meaningBn: string;
  meaningEn: string;
}

export interface SingleAyahOfFullSurah extends AyahInfo {
  words: WordInfoInAyah[];
}

export interface AyahInfo {
  meaningEn: string;
  page: number;
  ruku: number;
  manzil: number;
  isSajdahAyat: boolean;
  juz: number;
  surahId: number;
  verseId: number;
  meaningBnTaisirul: string;
  meaningBnAhbayan: string;
  meaningBnMujibur: string;
  versePosition: number;
  verseHtml: string;
}

export interface SingleSurahInfo {
  id: number;
  locationAr: string;
  locationEn: string;
  meaningBn: string;
  meaningEn: string;
  nameAr: string;
  nameBn: string;
  nameEn: string;
  totalAyah: number;
}

export interface Colors {
  warnBg: string;
  bgColor1: string;
  bgColor2: string;
  txtColor: string;
  activeColor1: string;
  activeColor2: string;
  activeColor3: string;
  borderColor: string;
}

export interface AlQuranInfo {
  isEnableTajweed: boolean;
  isShowAudioPlayer: boolean;
  isPlayFullSurah: boolean;
  repeatAyahPlaying: number;
  bnTranslator: string;
  reciter: string;
  bookmarkList: Record<string, boolean>;
  lastReadSurah: number;
  history: Record<number, number>;
  favouriteSurahList: Record<number, boolean>;
}

export interface SingleSurahPageRouteParams {
  fromWhichScreen?: string;
  surahNumber?: number;
  ayahNumber?: number;
}

export interface TafseerDataType {
  meaningBnMujibur: string;
  meaningBnAhbayan: string;
  meaningBnTaisirul: string;
  meaningEn: string;
  tafseer: string;
  verseHtml: string;
}

export interface VersesByPageType {
  page: number;
  ruku: number;
  manzil: number;
  juz: number;
  html: string;
}
