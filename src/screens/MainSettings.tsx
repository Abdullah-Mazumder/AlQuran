import { ScrollView, View } from "react-native";
import {
  setArabicTextSize,
  setBanglaTextSize,
  setEnglishTextSize,
  setIsShowBanglaText,
  setIsShowEnglishText,
  setArabicFont,
  toggleLanguage,
  setStorage,
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
import { ApplicationState } from "src/types/types";

const MainSettings = () => {
  const fontsPickerRef = useRef(null);
  const languagePickerRef = useRef(null);
  const storagePickerRef = useRef(null);
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
    storage,
  } = useSelector((state: { app: ApplicationState }) => state.app);

  const openFontsDropdown = () => {
    vibrate();
    (
      fontsPickerRef?.current as unknown as { openDropdown: () => void }
    )?.openDropdown();
  };

  const openLanguagesDropdown = () => {
    vibrate();
    (
      languagePickerRef?.current as unknown as {
        openDropdown: () => void;
      }
    )?.openDropdown();
  };

  const openStoragesDropdown = () => {
    vibrate();
    (
      storagePickerRef?.current as unknown as {
        openDropdown: () => void;
      }
    )?.openDropdown();
  };

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

  const languages = [
    {
      value: "bangla",
      labelBn: "বাংলা",
      labelEn: "Bangla",
    },
    {
      value: "english",
      labelBn: "English",
      labelEn: "English",
    },
  ];

  const storages = [
    {
      value: "internal",
      label: "Device Memory",
    },
    {
      value: "external",
      label: "SD Card",
    },
  ];

  const defaultFontIndex = fonts.findIndex((font) => font.value === arabicFont);

  const defaultLanguageIndex = languages.findIndex(
    (lang) => lang.value === language
  );

  const defaultStorageIndex = storages.findIndex((st) => st.value === storage);

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
            <Pressable onPress={openLanguagesDropdown}>
              <View className="flex flex-row justify-between items-center px-2 my-3">
                <CustomText
                  style={[
                    font.semiBoldFont,
                    { fontSize: language === "bangla" ? 14 : 14.5 },
                  ]}
                >
                  {language === "bangla" ? "ভাষা" : "Language"}
                </CustomText>
                <SelectBox
                  ref={languagePickerRef}
                  data={languages}
                  defaultButtonText={
                    language === "bangla" ? "ভাষা" : "Language"
                  }
                  defaultValueByIndex={defaultLanguageIndex}
                  dropdownHeight={105}
                  onSelect={(selectedItem) => {
                    dispatch(toggleLanguage(selectedItem.value));
                  }}
                  buttonTextAfterSelection={(selectedItem: {
                    labelBn: string;
                    labelEn: string;
                  }) => {
                    return language === "bangla"
                      ? selectedItem.labelBn
                      : selectedItem.labelEn;
                  }}
                  rowTextForSelection={(selectedItem: {
                    labelBn: string;
                    labelEn: string;
                  }) => {
                    return language === "bangla"
                      ? selectedItem.labelBn
                      : selectedItem.labelEn;
                  }}
                />
              </View>
            </Pressable>
          </View>

          <View className="mb-1">
            <Pressable onPress={openStoragesDropdown}>
              <View className="flex flex-row justify-between items-center px-2 my-3">
                <CustomText
                  style={[
                    font.semiBoldFont,
                    { fontSize: language === "bangla" ? 14 : 14.5 },
                  ]}
                >
                  {language === "bangla" ? "স্টোরেজ" : "Storage"}
                </CustomText>
                <SelectBox
                  ref={storagePickerRef}
                  data={storages}
                  defaultButtonText={
                    language === "bangla" ? "স্টোরেজ" : "Storage"
                  }
                  dropdownWidth={150}
                  defaultValueByIndex={defaultStorageIndex}
                  dropdownHeight={105}
                  onSelect={(selectedItem) => {
                    dispatch(setStorage(selectedItem.value));
                  }}
                  buttonTextAfterSelection={(selectedItem) =>
                    selectedItem.label
                  }
                  rowTextForSelection={(selectedItem) => selectedItem.label}
                />
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default MainSettings;
