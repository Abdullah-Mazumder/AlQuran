import { View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import {
  AlQuranInfo,
  SingleAyahOfFullSurah,
  SingleSurahInfo,
} from "src/types/types";
import useTheme from "src/hooks/useTheme";
import { IconButton } from "@react-native-material/core";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import vibrate from "src/utils/vibratie";
import CustomText from "../CustomText";
import useLanguage from "src/hooks/useLanguage";
import convertEnglishToBanglaNumber from "src/utils/convertEnglishToBanglaNumber";
import QuranInfoTag from "./QuranInfoTag";
import { useSelector } from "react-redux";

interface SurahInfoProps {
  isLoading: boolean;
  surahInfo: SingleSurahInfo;
  setsettingsBox: Dispatch<SetStateAction<boolean>>;
  ayahInView?: SingleAyahOfFullSurah;
  fromWhichScreen?: string;
  ayahNumber?: number;
}

const SurahInfo: React.FC<SurahInfoProps> = ({
  isLoading,
  surahInfo,
  setsettingsBox,
  ayahInView,
  fromWhichScreen,
  ayahNumber,
}) => {
  const navigation = useNavigation();
  const { color } = useTheme();
  const language = useLanguage();
  const { history, bookmarkList } = useSelector(
    (state: { alQuran: AlQuranInfo }) => state.alQuran
  );
  const { meaningBn, meaningEn, nameBn, nameEn, id, totalAyah } = surahInfo;

  if (isLoading) {
    return (
      <View
        style={{ backgroundColor: color.bgColor1 }}
        className="flex flex-row justify-between items-center"
      >
        <View>
          <IconButton
            icon={(props) => (
              <Ionicon
                name="arrow-back-outline"
                size={30}
                {...props}
                color={color.txtColor}
              />
            )}
            onPress={() => {
              vibrate();
              //@ts-ignore
              navigation.navigate("QuranHome");
            }}
          />
        </View>

        <View>
          <IconButton
            icon={(props) => (
              <Ionicon
                name="settings-outline"
                {...props}
                size={22}
                color={color.txtColor}
              />
            )}
            onPress={() => {
              vibrate();
              // setSettingBox(true);
            }}
          />
        </View>
      </View>
    );
  }

  const { page, ruku, manzil, juz } = ayahInView || {
    page: 1,
    ruku: 1,
    manzil: 1,
    juz: 1,
  };

  let text1 =
    language === "bangla"
      ? `${nameBn}  ${meaningBn}`
      : `${nameEn}  ${meaningEn}`;

  let text2 =
    language === "bangla"
      ? `সূরা - ${convertEnglishToBanglaNumber(
          id.toString()
        )}   আয়াত - ${convertEnglishToBanglaNumber(totalAyah.toString())}`
      : `Surah - ${id}   Ayah - ${totalAyah}`;

  return (
    <View
      style={{ backgroundColor: color.bgColor1 }}
      className="flex flex-row justify-between items-center"
    >
      <View>
        <IconButton
          icon={(props) => (
            <Ionicon
              name="arrow-back-outline"
              size={30}
              {...props}
              color={color.txtColor}
            />
          )}
          onPress={() => {
            vibrate();
            //@ts-ignore
            navigation.navigate(fromWhichScreen || "QuranHome");
          }}
        />
      </View>

      <View>
        <View>
          <CustomText
            className="text-center"
            style={[{ fontSize: 14.5, fontWeight: "500" }]}
          >
            {text1}
          </CustomText>
          <View className="flex flex-row items-center justify-center gap-x-2">
            <CustomText
              className="text-center"
              style={{ fontSize: 13, fontWeight: "600" }}
            >
              {text2}
            </CustomText>

            {fromWhichScreen !== "BookMarkedList" ? (
              <>
                {history[id] && (
                  <CustomText
                    className="ml-2 mt-[1.5px]"
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: color.activeColor1,
                    }}
                  >
                    {language === "bangla"
                      ? `সর্বশেষ পঠিত - ${convertEnglishToBanglaNumber(
                          history[id].toString()
                        )}`
                      : `Last Read - ${history[id]}`}
                  </CustomText>
                )}
              </>
            ) : (
              <>
                {bookmarkList[`${surahInfo.id}_${ayahNumber}`] && (
                  <CustomText
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: color.activeColor1,
                      marginLeft: 8,
                    }}
                  >
                    {language === "bangla"
                      ? `বুকমার্ক আয়াত - ${convertEnglishToBanglaNumber(
                          ayahNumber.toString()
                        )}`
                      : `Bookmarked Ayah - ${ayahNumber}`}
                  </CustomText>
                )}
              </>
            )}
          </View>

          <View className="flex flex-row pb-1 pt-0.5">
            <QuranInfoTag
              title={
                language === "bangla"
                  ? `পৃষ্ঠা - ${convertEnglishToBanglaNumber(page?.toString())}`
                  : `Page - ${page}`
              }
            />

            <QuranInfoTag
              title={
                language === "bangla"
                  ? `পারা - ${convertEnglishToBanglaNumber(juz?.toString())}`
                  : `Para - ${juz}`
              }
            />

            <QuranInfoTag
              title={
                language === "bangla"
                  ? `রুকু - ${convertEnglishToBanglaNumber(ruku?.toString())}`
                  : `Ruku - ${ruku}`
              }
            />

            <QuranInfoTag
              title={
                language === "bangla"
                  ? `মঞ্জিল - ${convertEnglishToBanglaNumber(
                      manzil?.toString()
                    )}`
                  : `Manzil - ${manzil}`
              }
            />
          </View>
        </View>
      </View>

      <View>
        <IconButton
          icon={(props) => (
            <Ionicon
              name="settings-outline"
              {...props}
              size={22}
              color={color.txtColor}
            />
          )}
          onPress={() => {
            vibrate();
            setsettingsBox(true);
          }}
        />
      </View>
    </View>
  );
};

export default React.memo(SurahInfo);
