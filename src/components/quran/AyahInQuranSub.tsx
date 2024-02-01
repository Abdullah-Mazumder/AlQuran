import { View, Text, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import * as Clipboard from "expo-clipboard";
import {
  AlQuranInfo,
  ApplicationState,
  AyahInfo,
  SingleSurahInfo,
} from "src/types/types";
import BismillahImage from "../BismillahImage";
import QuranInfoTag from "./QuranInfoTag";
import useTheme from "src/hooks/useTheme";
import convertEnglishToBanglaNumber from "src/utils/convertEnglishToBanglaNumber";
import IconInfoTag from "../IconInfoTag";
import { useDispatch, useSelector } from "react-redux";
import RenderHTMLVerse from "./RenderHTMLVerse";
import CustomText from "../CustomText";
import { font } from "src/utils/fonts";
import AyahActionButton from "./AyahActionButton";
import { updateBookmarkList } from "src/redux/features/alQuran/alQuranSlice";
import useLanguage from "src/hooks/useLanguage";
import showToast from "src/utils/showToast";
import htmlToText from "src/utils/htmlToText";
import { useNavigation } from "@react-navigation/native";

interface VerseWithSurahInfo extends AyahInfo {
  surahInfo?: SingleSurahInfo;
}

interface AyahInQuranSubProps {
  ayah: VerseWithSurahInfo;
  index: number;
  playWord: (audioName: string) => void;
  handleWordMeaning: (position: string) => void;
  totalVerses: number;
}

const AyahInQuranSub: React.FC<AyahInQuranSubProps> = ({
  ayah,
  index,
  playWord,
  handleWordMeaning,
  totalVerses,
}) => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { color } = useTheme();
  const language = useLanguage();
  const [isCopied, setIsCopied] = useState(false);
  const {
    isShowBanglaText,
    isShowEnglishText,
    banglaTextSize,
    englishTextSize,
  } = useSelector((state: { app: ApplicationState }) => state.app);
  const { bnTranslator, bookmarkList, history } = useSelector(
    (state: { alQuran: AlQuranInfo }) => state.alQuran
  );
  const { surahInfo, verseHtml, meaningEn, verseId, surahId, isSajdahAyat } =
    ayah;
  const { nameBn, meaningBn } = surahInfo || {};
  const bookmarkKey = `${surahId}_${verseId}`;

  const copyToClipboard = async () => {
    setIsCopied(true);

    let textToCopy = htmlToText(verseHtml);

    if (isShowBanglaText) textToCopy += ayah[bnTranslator] + "   ";

    if (isShowEnglishText) textToCopy += meaningEn + "  ";

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
    <View
      style={{ marginBottom: index + 1 === totalVerses ? height - 200 : 0 }}
    >
      {index === 0 && (
        <View className="flex items-center my-1">
          <BismillahImage />
        </View>
      )}

      {surahInfo ? (
        <View style={{ backgroundColor: color.bgColor1 }}>
          <CustomText
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: color.activeColor1,
              textAlign: "center",
              borderTopWidth: 2,
              borderColor: color.activeColor1,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              marginBottom: -2,
              paddingTop: 2,
            }}
          >{`${nameBn} ${meaningBn}`}</CustomText>
        </View>
      ) : null}

      <View
        className={`w-full flex flex-row items-center justify-center mb-1 py-1`}
        style={{
          backgroundColor: color.bgColor1,
          borderBottomWidth: surahInfo ? 2 : 0,
          borderColor: color.activeColor1,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        }}
      >
        <QuranInfoTag
          title={`আয়াত - ${convertEnglishToBanglaNumber(verseId.toString())}`}
        />

        {isSajdahAyat ? <IconInfoTag title={"সিজদাহ আয়াত"} /> : null}

        {bookmarkList[bookmarkKey] ? (
          <IconInfoTag title={"বুকমার্ক করা"} />
        ) : null}

        {history[surahId] === verseId ? (
          <IconInfoTag title={"সর্বশেষ পঠিত"} />
        ) : null}
      </View>

      <RenderHTMLVerse
        handleWordMeaning={handleWordMeaning}
        playWord={playWord}
        verseHtml={verseHtml}
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
      </View>
    </View>
  );
};

export default React.memo(AyahInQuranSub);
