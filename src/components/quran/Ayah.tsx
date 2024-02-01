import { View, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import * as Clipboard from "expo-clipboard";
import {
  AlQuranInfo,
  ApplicationState,
  SingleAyahOfFullSurah,
} from "src/types/types";
import BismillahImage from "../BismillahImage";
import useLanguage from "src/hooks/useLanguage";
import QuranInfoTag from "./QuranInfoTag";
import convertEnglishToBanglaNumber from "src/utils/convertEnglishToBanglaNumber";
import useTheme from "src/hooks/useTheme";
import { useDispatch, useSelector } from "react-redux";
import CustomText from "../CustomText";
import { font } from "src/utils/fonts";
import IconInfoTag from "../IconInfoTag";
import AyahActionButton from "./AyahActionButton";
import {
  updateBookmarkList,
  updateHistory,
} from "src/redux/features/alQuran/alQuranSlice";
import showToast from "src/utils/showToast";
import { useNavigation } from "@react-navigation/native";
import htmlToText from "src/utils/htmlToText";
import RenderHTMLVerse from "./RenderHTMLVerse";
import { WebView } from "react-native-webview";

interface AyahProps {
  ayah: SingleAyahOfFullSurah;
  totalAyah: number;
  playWord: (audioName: string) => void;
  handleWordMeaning: (position: string) => void;
  surahNameEn: string;
  surahNameBn: string;
  webViewRefs: React.RefObject<WebView>[];
}

const Ayah: React.FC<AyahProps> = ({
  ayah,
  totalAyah,
  playWord,
  surahNameBn,
  surahNameEn,
  handleWordMeaning,
  webViewRefs,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();
  const { bnTranslator, bookmarkList, history } = useSelector(
    (state: { alQuran: AlQuranInfo }) => state.alQuran
  );
  const {
    isShowBanglaText,
    isShowEnglishText,
    banglaTextSize,
    englishTextSize,
  } = useSelector((state: { app: ApplicationState }) => state.app);
  const [isCopied, setIsCopied] = useState(false);
  const language = useLanguage();
  const { color } = useTheme();
  const { surahId, verseId, meaningEn, isSajdahAyat, verseHtml } = ayah;

  const bookmarkKey = `${surahId}_${verseId}`;

  const copyToClipboard = async () => {
    setIsCopied(true);

    let textToCopy = htmlToText(verseHtml);

    if (isShowBanglaText) textToCopy += ayah[bnTranslator] + "   ";

    if (isShowEnglishText) textToCopy += meaningEn + "  ";

    if (language === "bangla")
      textToCopy += `(সূরা - ${surahNameBn}, আয়াত - ${convertEnglishToBanglaNumber(
        verseId.toString()
      )})`;
    else textToCopy += `(Surah - ${surahNameEn}, Ayah - ${verseId})`;

    await Clipboard.setStringAsync(textToCopy);

    if (language === "bangla") showToast("কপি করা হয়েছে!");
    else showToast("Copied!");
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  return (
    <View style={{ marginBottom: verseId === totalAyah ? height : 0 }}>
      {surahId !== 1 && verseId === 1 && (
        <View className="flex items-center my-1">
          <BismillahImage />
        </View>
      )}

      <View
        className={`w-full flex flex-row items-center justify-center mb-1 py-1`}
        style={{ backgroundColor: color.bgColor1 }}
      >
        <QuranInfoTag
          title={
            language === "bangla"
              ? `আয়াত - ${convertEnglishToBanglaNumber(verseId.toString())}`
              : `Ayah - ${verseId}`
          }
        />

        {isSajdahAyat ? (
          <IconInfoTag
            title={language === "bangla" ? "সিজদাহ আয়াত" : "Sijdah Ayah"}
          />
        ) : null}

        {bookmarkList[bookmarkKey] ? (
          <IconInfoTag
            title={language === "bangla" ? "বুকমার্ক করা" : "Bookmarked"}
          />
        ) : null}

        {history[surahId] === verseId ? (
          <IconInfoTag
            title={language === "bangla" ? "সর্বশেষ পঠিত" : "Last Read"}
          />
        ) : null}
      </View>

      <RenderHTMLVerse
        playWord={playWord}
        verseHtml={verseHtml}
        handleWordMeaning={handleWordMeaning}
        verseId={verseId}
        webViewRefs={webViewRefs}
      />

      {isShowBanglaText && (
        <View className="mx-3 mb-2">
          <CustomText style={[font.regularFont, { fontSize: banglaTextSize }]}>
            {ayah[bnTranslator]}
          </CustomText>
        </View>
      )}

      {isShowEnglishText && (
        <View className="mx-3 mb-2">
          <CustomText style={[font.regularFont, { fontSize: englishTextSize }]}>
            {meaningEn}
          </CustomText>
        </View>
      )}

      <View className="my-4 w-full flex flex-row items-center justify-center ">
        <AyahActionButton
          iconName="bookmark"
          action={() => {
            dispatch(updateBookmarkList({ surahId, verseId, language }));
          }}
          solid={Boolean(bookmarkList[bookmarkKey])}
        />
        <AyahActionButton
          iconName="copy"
          action={copyToClipboard}
          solid={isCopied}
        />

        <AyahActionButton
          iconName="book-open"
          action={() => {
            //@ts-ignore
            navigation.navigate("ShortTafseer", {
              surahId,
              verseId,
            });
          }}
          solid
        />
        <AyahActionButton
          iconName={history[surahId] === verseId ? "trash" : "save"}
          action={() => {
            dispatch(
              updateHistory({
                surahNumber: surahId,
                verseNumber: verseId,
                language: language,
              })
            );
          }}
          solid
        />
      </View>
    </View>
  );
};

export default React.memo(Ayah);
