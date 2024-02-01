import { View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { SingleSurahInfo } from "src/types/types";
import useTheme from "src/hooks/useTheme";
import { IconButton } from "@react-native-material/core";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import vibrate from "src/utils/vibratie";
import CustomText from "../CustomText";
import useLanguage from "src/hooks/useLanguage";
import convertEnglishToBanglaNumber from "src/utils/convertEnglishToBanglaNumber";

interface SurahInfoProps {
  isLoading: boolean;
  surahInfo: SingleSurahInfo;
  setsettingsBox: Dispatch<SetStateAction<boolean>>;
}

const SurahInfo: React.FC<SurahInfoProps> = ({
  isLoading,
  surahInfo,
  setsettingsBox,
}) => {
  const navigation = useNavigation();
  const { color } = useTheme();
  const language = useLanguage();

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
              navigation.navigate("MushafSurahList");
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
      className="flex flex-row justify-between items-center py-1 px-0.5"
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
            navigation.navigate("MushafSurahList");
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
