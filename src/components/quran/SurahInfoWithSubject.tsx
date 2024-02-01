import { View, Text, useWindowDimensions } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { SingleAyahOfFullSurah, SingleSurahInfo } from "src/types/types";
import { IconButton } from "@react-native-material/core";
import Ionicon from "react-native-vector-icons/Ionicons";
import useTheme from "src/hooks/useTheme";
import vibrate from "src/utils/vibratie";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../CustomText";
import convertEnglishToBanglaNumber from "src/utils/convertEnglishToBanglaNumber";
import QuranInfoTag from "./QuranInfoTag";

interface SurahInfoWithSubjectProps {
  subject: string;
  surahInfo: SingleSurahInfo;
  ayah: SingleAyahOfFullSurah;
  setsettingsBox: Dispatch<SetStateAction<boolean>>;
}

const SurahInfoWithSubject: React.FC<SurahInfoWithSubjectProps> = ({
  subject,
  surahInfo,
  ayah,
  setsettingsBox,
}) => {
  const navigation = useNavigation();
  const { color } = useTheme();
  const { id, nameBn, meaningBn, totalAyah } = surahInfo || {};
  const { page, ruku, manzil, juz } = ayah || {
    page: 1,
    ruku: 1,
    manzil: 1,
    juz: 1,
  };
  return (
    <View
      style={{ backgroundColor: color.bgColor1 }}
      className="flex flex-row items-center justify-between"
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
            navigation.navigate("SubjectWiseQuran");
          }}
        />
      </View>

      {id ? (
        <View>
          <CustomText
            className="text-center"
            style={[{ fontSize: 16, fontWeight: "500" }]}
          >
            {subject}
          </CustomText>
          <CustomText
            className="text-center"
            style={[{ fontSize: 14.5, fontWeight: "500" }]}
          >
            {`${nameBn}  ${meaningBn}`}
          </CustomText>
          <CustomText
            className="text-center"
            style={{ fontSize: 13, fontWeight: "600" }}
          >
            {`সূরা - ${convertEnglishToBanglaNumber(
              id.toString()
            )}   আয়াত - ${convertEnglishToBanglaNumber(totalAyah.toString())}`}
          </CustomText>

          <View className="flex flex-row pb-1 pt-0.5">
            <QuranInfoTag
              title={`পৃষ্ঠা - ${convertEnglishToBanglaNumber(
                page?.toString()
              )}`}
            />

            <QuranInfoTag
              title={`পারা - ${convertEnglishToBanglaNumber(juz?.toString())}`}
            />

            <QuranInfoTag
              title={`রুকু - ${convertEnglishToBanglaNumber(ruku?.toString())}`}
            />

            <QuranInfoTag
              title={`মঞ্জিল - ${convertEnglishToBanglaNumber(
                manzil?.toString()
              )}`}
            />
          </View>
        </View>
      ) : null}

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

export default SurahInfoWithSubject;
