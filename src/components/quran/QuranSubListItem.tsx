import { ImageBackground, View } from "react-native";
import React, { useState } from "react";
import useTheme from "src/hooks/useTheme";
import Ripple from "react-native-material-ripple";
import vibrate from "src/utils/vibratie";
import CustomText from "../CustomText";
import convertEnglishToBanglaNumber from "src/utils/convertEnglishToBanglaNumber";
import useLanguage from "src/hooks/useLanguage";
import { font } from "src/utils/fonts";
import FontAwesomeIcon from "../FontAwesomeIcon";
import { useNavigation } from "@react-navigation/native";

const QuranSubListItem = ({ item, index }) => {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const { color } = useTheme();
  const language = useLanguage();
  const { subject, location } = item;
  const len = location.split(", ").length;
  return (
    <>
      <View
        style={[
          {
            marginTop: 2,
            overflow: "hidden",
            borderRadius: 5,
            backgroundColor: color.bgColor1,
            transform: [
              {
                scale: isPressed ? 0.95 : 0.98,
              },
            ],
          },
        ]}
      >
        <Ripple
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          rippleOpacity={0.4}
          rippleDuration={300}
          rippleColor={color.activeColor1}
          onStartShouldSetResponder={() => true}
          style={{
            padding: 5,
          }}
          rippleSequential
          onPress={() => {
            vibrate();
            setTimeout(() => {
              //@ts-ignore
              navigation.navigate("QuranSubject", {
                subject,
                location,
              });
            }, 200);
          }}
        >
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center justify-start w-4/6 gap-x-2">
              <View className="w-14 h-14">
                <ImageBackground
                  source={require("../../../assets/image/surahLogo.png")}
                  className="w-full h-full flex flex-row items-center justify-center"
                >
                  <CustomText
                    style={{
                      fontWeight: "700",
                      color: color.activeColor1,
                      fontSize: 16,
                    }}
                  >
                    {language === "bangla"
                      ? convertEnglishToBanglaNumber((index + 1).toString())
                      : (index + 1).toString()}
                  </CustomText>
                </ImageBackground>
              </View>

              <View>
                <CustomText
                  style={[
                    font.semiBoldFont,
                    { fontSize: 17.5, color: color.activeColor1 },
                  ]}
                >
                  {subject}
                </CustomText>
                <View className="flex flex-row items-center">
                  <CustomText
                    style={[
                      font.semiBoldFont,
                      { fontSize: 14, color: color.activeColor1 },
                    ]}
                  >
                    {"আয়াত সংখ্যা - "}
                  </CustomText>
                  <CustomText
                    style={[
                      {
                        fontSize: 14,
                        color: color.activeColor1,
                        fontWeight: "600",
                        marginBottom: 2,
                      },
                    ]}
                  >
                    {convertEnglishToBanglaNumber(len.toString())}
                  </CustomText>
                </View>
              </View>
            </View>

            <View
              className="mr-2 p-3 rounded-full"
              style={{ backgroundColor: color.bgColor2 }}
            >
              <FontAwesomeIcon
                name="book-reader"
                size={25}
                color={color.activeColor2}
              />
            </View>
          </View>
        </Ripple>
      </View>
    </>
  );
};

export default QuranSubListItem;
