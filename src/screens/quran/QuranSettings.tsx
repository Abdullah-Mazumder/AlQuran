import { ScrollView, View } from "react-native";
import {
  setArabicTextSize,
  setBanglaTextSize,
  setEnglishTextSize,
  setIsShowBanglaText,
  setIsShowEnglishText,
  setArabicFont,
} from "src/redux/features/app/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { Pressable } from "@react-native-material/core";
import { useRef } from "react";
import useTheme from "src/hooks/useTheme";
import vibrate from "src/utils/vibratie";
import CustomText from "src/components/CustomText";
import { font } from "src/utils/fonts";
import FontAwesomeIcon from "src/components/FontAwesomeIcon";
import SelectBox from "src/components/SelectBox";
import Slider from "src/components/Slider";
import CheckBoxWithLabel from "src/components/CheckBoxWithLabel";
import { AlQuranInfo, ApplicationState } from "src/types/types";
import {
  setIsEnableTajweed,
  setBnTranslator,
  setReciter,
  setIsShowAudioPlayer,
} from "src/redux/features/alQuran/alQuranSlice";

const QuranSettings = () => {
  const fontsPickerRef = useRef(null);
  const bnTranslatorPickerRef = useRef(null);
  const reciterPickerRef = useRef(null);
  const { color } = useTheme();
  const dispatch = useDispatch();
  const {
    arabicTextSize,
    banglaTextSize,
    englishTextSize,
    arabicFont,
    isShowBanglaText,
    isShowEnglishText,
    language,
  } = useSelector((state: { app: ApplicationState }) => state.app);

  const { isEnableTajweed, bnTranslator, reciter, isShowAudioPlayer } =
    useSelector((state: { alQuran: AlQuranInfo }) => state.alQuran);

  const openRecitersDropdown = () => {
    vibrate();
    (
      reciterPickerRef?.current as unknown as { openDropdown: () => void }
    )?.openDropdown();
  };

  const openFontsDropdown = () => {
    vibrate();
    (
      fontsPickerRef?.current as unknown as { openDropdown: () => void }
    )?.openDropdown();
  };

  const openBnTranslatorDropdown = () => {
    vibrate();
    (
      bnTranslatorPickerRef?.current as unknown as {
        openDropdown: () => void;
      }
    )?.openDropdown();
  };

  const reciters = [
    {
      value: "10",
      label: "Saud Ash-Shuraym",
    },
    {
      value: "2",
      label: "AbdulBaset AbdulSamad",
    },
    {
      value: "4",
      label: "Abu Baka Al-Shatri",
    },
    {
      value: "7",
      label: "Mishar Rashid Al-Afasy",
    },
  ];

  const fonts = [
    {
      value: "noorehuda",
      labelBn: "ফন্ট-১",
      labelEn: "Font-1",
    },
    {
      value: "arabicHafezi",
      labelBn: "ফন্ট-২",
      labelEn: "Font-2",
    },
    {
      value: "lateef",
      labelBn: "ফন্ট-৩",
      labelEn: "Font-3",
    },
    {
      value: "noorehidayat",
      labelBn: "ফন্ট-৪",
      labelEn: "Font-4",
    },
    {
      value: "noorehira",
      labelBn: "ফন্ট-৫",
      labelEn: "Font-5",
    },
    {
      value: "PDMS_Saleem",
      labelBn: "ফন্ট-৬",
      labelEn: "Font-6",
    },
    {
      value: "XBNiloofar",
      labelBn: "ফন্ট-৭",
      labelEn: "Font-7",
    },
    {
      value: "amiriQuran",
      labelBn: "ফন্ট-৮",
      labelEn: "Font-8",
    },
    {
      value: "kitab",
      labelBn: "ফন্ট-৯",
      labelEn: "Font-9",
    },
    {
      value: "meQuran",
      labelBn: "ফন্ট-১০",
      labelEn: "Font-10",
    },
    {
      value: "qalam",
      labelBn: "ফন্ট-১১",
      labelEn: "Font-11",
    },
  ];

  const bnTranslators = [
    {
      value: "meaningBnMujibur",
      labelBn: "মুজিবুর",
      labelEn: "Mujibur",
    },
    {
      value: "meaningBnAhbayan",
      labelBn: "আহবায়ান",
      labelEn: "Ahbayan",
    },
    {
      value: "meaningBnTaisirul",
      labelBn: "তাইসীরুল",
      labelEn: "Taisirul",
    },
  ];

  const defaultReciterIndex = reciters.findIndex((r) => r.value === reciter);

  const defaultFontIndex = fonts.findIndex((font) => font.value === arabicFont);

  const defaultBnTranslatorIndex = bnTranslators.findIndex(
    (translator) => translator.value === bnTranslator
  );

  return (
    <>
      <View
        style={{ backgroundColor: color.bgColor1 }}
        className="py-2 flex justify-center items-center"
      >
        <View className="flex flex-row items-center justify-center gap-2">
          <CustomText
            style={[{ color: color.activeColor1 }, font.boldFont]}
            className="text-[20px]"
          >
            {language == "bangla" ? "সেটিংস" : "Settings"}
          </CustomText>
          <View>
            <FontAwesomeIcon name="cog" size={20} color={color.activeColor1} />
          </View>
        </View>
      </View>
      <View
        style={{ flex: 1, backgroundColor: color.bgColor2 }}
        className="container mx-auto p-0.5 px-1 pb-0"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-2 mb-1">
            <Slider
              label={
                language === "bangla" ? "আরবি লেখা সাইজ" : "Arabic Font Size"
              }
              minValue={20}
              maxValue={55}
              value={arabicTextSize}
              actionName={setArabicTextSize}
            />
            <Slider
              label={
                language === "bangla" ? "বাংলা লেখা সাইজ" : "Bangla Font Size"
              }
              minValue={14}
              maxValue={40}
              value={banglaTextSize}
              actionName={setBanglaTextSize}
            />
            <Slider
              label={
                language === "bangla" ? "ইংরেজি লেখা সাইজ" : "English Font Size"
              }
              minValue={14}
              maxValue={40}
              value={englishTextSize}
              actionName={setEnglishTextSize}
            />
          </View>

          <View>
            <CheckBoxWithLabel
              label={language === "bangla" ? "তাজবীদ" : "Tajweed"}
              value={isEnableTajweed}
              actionName={setIsEnableTajweed}
              vibration
              className="mb-1"
            />
            <CheckBoxWithLabel
              label={
                language === "bangla" ? "বাংলা অনুবাদ" : "Bangla Translation"
              }
              value={isShowBanglaText}
              actionName={setIsShowBanglaText}
              vibration
              className="mb-1"
            />
            <CheckBoxWithLabel
              label={
                language === "bangla" ? "ইংরেজি অনুবাদ" : "English Translation"
              }
              value={isShowEnglishText}
              actionName={setIsShowEnglishText}
              vibration
              className="mb-1"
            />
            <CheckBoxWithLabel
              label={language === "bangla" ? "অডিও প্লেয়ার" : "Audio Player"}
              value={isShowAudioPlayer}
              actionName={setIsShowAudioPlayer}
              vibration
              className="mb-1"
            />
          </View>

          <View className="mb-1">
            <Pressable onPress={openFontsDropdown}>
              <View className="flex flex-row justify-between items-center px-2 my-3">
                <CustomText
                  style={[
                    font.semiBoldFont,
                    { fontSize: language === "bangla" ? 14 : 14.5 },
                  ]}
                >
                  {language === "bangla" ? "আরবি ফন্ট" : "Arabic Font"}
                </CustomText>
                <SelectBox
                  ref={fontsPickerRef}
                  data={fonts}
                  defaultButtonText={language === "bangla" ? "ফন্ট" : "Font"}
                  defaultValueByIndex={defaultFontIndex}
                  onSelect={(selectedItem) => {
                    dispatch(setArabicFont(selectedItem.value));
                  }}
                  buttonTextAfterSelection={(selectedItem: {
                    labelBn: string;
                    labelEn: string;
                  }) => {
                    return language === "bangla"
                      ? selectedItem.labelBn
                      : selectedItem.labelEn;
                  }}
                  rowTextForSelection={(item: {
                    labelBn: string;
                    labelEn: string;
                  }) => {
                    return language === "bangla" ? item.labelBn : item.labelEn;
                  }}
                />
              </View>
            </Pressable>
          </View>

          <View className="mb-1">
            <Pressable onPress={openBnTranslatorDropdown}>
              <View className="flex flex-row justify-between items-center px-2 my-3">
                <CustomText
                  style={[
                    font.semiBoldFont,
                    { fontSize: language === "bangla" ? 14 : 14.5 },
                  ]}
                >
                  {language === "bangla"
                    ? "বাংলা অনুবাদক"
                    : "Bangla Translator"}
                </CustomText>
                <SelectBox
                  ref={bnTranslatorPickerRef}
                  data={bnTranslators}
                  dropdownHeight={150}
                  defaultButtonText={
                    language === "bangla" ? "অনুবাদক" : "Translator"
                  }
                  defaultValueByIndex={defaultBnTranslatorIndex}
                  onSelect={(selectedItem) => {
                    dispatch(setBnTranslator(selectedItem.value));
                  }}
                  buttonTextAfterSelection={(selectedItem: {
                    labelBn: string;
                    labelEn: string;
                  }) => {
                    return language === "bangla"
                      ? selectedItem.labelBn
                      : selectedItem.labelEn;
                  }}
                  rowTextForSelection={(item: {
                    labelBn: string;
                    labelEn: string;
                  }) => {
                    return language === "bangla" ? item.labelBn : item.labelEn;
                  }}
                />
              </View>
            </Pressable>
          </View>

          <View className="mb-1">
            <Pressable onPress={openRecitersDropdown}>
              <View className="flex flex-row justify-between items-center px-2 my-3">
                <CustomText
                  style={[
                    font.semiBoldFont,
                    { fontSize: language === "bangla" ? 14 : 14.5 },
                  ]}
                >
                  {language === "bangla" ? "আবৃত্তিকারী" : "Reciter"}
                </CustomText>
                <SelectBox
                  dropdownWidth={200}
                  ref={reciterPickerRef}
                  data={reciters}
                  dropdownHeight={180}
                  defaultButtonText={
                    language === "bangla" ? "আবৃত্তিকারী" : "Reciter"
                  }
                  defaultValueByIndex={defaultReciterIndex}
                  onSelect={(selectedItem) => {
                    dispatch(setReciter(selectedItem.value));
                  }}
                  buttonTextAfterSelection={(selectedItem: {
                    label: string;
                  }) => {
                    return selectedItem.label;
                  }}
                  rowTextForSelection={(item: { label: string }) => {
                    return item.label;
                  }}
                />
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default QuranSettings;
