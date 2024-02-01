import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Dimensions, ImageBackground, Image } from "react-native";
import useTheme from "src/hooks/useTheme";
import convertEnglishToBanglaNumber from "src/utils/convertEnglishToBanglaNumber";
import vibrate from "src/utils/vibratie";
import CustomText from "../CustomText";
import useLanguage from "src/hooks/useLanguage";
import { font } from "src/utils/fonts";
import FontAwesomeIcon from "../FontAwesomeIcon";
import { ApplicationState, SingleSurahInfo } from "src/types/types";
// import { Pressable } from "native-base";
import Ripple from "react-native-material-ripple";
import { Pressable } from "@react-native-material/core";
import { useDispatch, useSelector } from "react-redux";
import { updateFavouriteSurahList } from "src/redux/features/alQuran/alQuranSlice";

const MushafSurahListItem: React.FC<{
  surah: SingleSurahInfo;
  isInHistory: boolean;
  isFavourite: boolean;
}> = ({ surah, isInHistory, isFavourite }) => {
  const dispatch = useDispatch();
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const { color, isDark } = useTheme();
  const language = useLanguage();
  const { arabicFont } = useSelector(
    (state: { app: ApplicationState }) => state.app
  );
  const {
    nameBn,
    id,
    meaningBn,
    nameEn,
    meaningEn,
    totalAyah,
    locationEn,
    nameAr,
  } = surah;

  let text1 =
    language === "bangla"
      ? `${nameBn} - ${meaningBn}`
      : `${nameEn} - ${meaningEn}`;

  let text2 = language === "bangla" ? `আয়াত সংখ্যা - ` : `Total Ayah - `;

  return (
    <View className="relative">
      <View
        style={[
          {
            // marginTop: 0.2,
            overflow: "hidden",
            borderRadius: 5,
            backgroundColor: color.bgColor1,
            transform: [
              {
                scale: isPressed ? 0.95 : 0.97,
              },
            ],
          },
        ]}
      >
        <Ripple
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          rippleOpacity={0.5}
          rippleDuration={200}
          onStartShouldSetResponder={() => true}
          rippleSequential
          rippleColor={color.activeColor1}
          onPress={() => {
            vibrate();
            setTimeout(() => {
              //@ts-ignore
              navigation.navigate("MushafQuran", {
                surahNumber: id,
              });
            }, 200);
          }}
        >
          <View
            style={{
              padding: 10,
              paddingRight: 15,
            }}
          >
            <View className="flex flex-row items-center justify-between w-[100%] mx-auto gap-2">
              <View className="w-12 h-12">
                <ImageBackground
                  source={require("../../../assets/image/surahLogo.png")}
                  className="w-full h-full flex flex-row items-center justify-center"
                >
                  <CustomText
                    style={{
                      fontWeight: "700",
                      color: color.activeColor1,
                    }}
                  >
                    {language === "bangla"
                      ? convertEnglishToBanglaNumber(id.toString())
                      : id.toString()}
                  </CustomText>
                </ImageBackground>
              </View>
              <View
                className="flex flex-row items-center justify-between"
                style={{ width: screenWidth - 48 - 30 }}
              >
                <View className="w-[60%]">
                  <View className="w-full flex flex-row justify-start">
                    <CustomText
                      style={[
                        {
                          color: color.activeColor1,
                          fontSize: 25,
                          fontFamily: arabicFont,
                          marginTop: -15,
                          marginBottom: -5,
                        },
                      ]}
                    >
                      {nameAr}
                    </CustomText>
                  </View>
                  <CustomText
                    style={[
                      font.semiBoldFont,
                      { color: color.activeColor1, fontSize: 13 },
                    ]}
                  >
                    {text1}
                  </CustomText>
                  <View className="flex items-center flex-row">
                    <CustomText style={[font.semiBoldFont, { fontSize: 11 }]}>
                      {text2}
                    </CustomText>
                    <CustomText
                      className={`font-bold ${
                        language === "english" ? "-mt-0.5" : "-mt-0.5"
                      }`}
                      style={{
                        fontSize: language === "english" ? 10 : 12,
                      }}
                    >
                      {language === "bangla"
                        ? convertEnglishToBanglaNumber(totalAyah.toString())
                        : totalAyah}
                    </CustomText>

                    {language === "bangla" ? (
                      <CustomText
                        style={[
                          font.semiBoldFont,
                          { fontSize: 11, marginLeft: 5 },
                        ]}
                      >
                        {locationEn === "Madani" ? " মাদানী" : " মাক্কী"}
                      </CustomText>
                    ) : (
                      <CustomText
                        style={[
                          font.semiBoldFont,
                          { fontSize: 11, marginLeft: 10 },
                        ]}
                        className="ml-1"
                      >
                        {locationEn}
                      </CustomText>
                    )}
                  </View>
                </View>
                <View className="mr-10">
                  <View className="flex flex-row items-center gap-x-6">
                    {isInHistory ? (
                      <View className="">
                        <FontAwesomeIcon
                          name="history"
                          size={15}
                          className="pr-1"
                        />
                      </View>
                    ) : null}

                    <View className="">
                      {locationEn === "Madani" ? (
                        <>
                          <Image
                            style={{
                              objectFit: "fill",
                              width: 18,
                              height: 18,
                            }}
                            source={
                              isDark
                                ? require("../../../assets/image/madina_dark.png")
                                : require("../../../assets/image/madina_light.png")
                            }
                          />
                        </>
                      ) : (
                        <Image
                          style={{
                            objectFit: "fill",
                            width: 17,
                            height: 17,
                          }}
                          source={
                            isDark
                              ? require("../../../assets/image/mecca_dark.png")
                              : require("../../../assets/image/mecca_light.png")
                          }
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Ripple>
      </View>

      <View className="absolute h-full flex flex-row items-center right-0 mr-3">
        <View
          style={{
            width: 30,
            height: 30,
            overflow: "hidden",
            transform: [
              {
                scale: isPressed ? 0.9 : 1,
              },
            ],
          }}
          className="rounded-full"
        >
          <Pressable
            onPress={() => {
              dispatch(updateFavouriteSurahList(id));
            }}
          >
            <View className="flex items-center justify-center h-full w-full">
              <FontAwesomeIcon name="heart" solid={isFavourite} size={17} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default React.memo(MushafSurahListItem);
