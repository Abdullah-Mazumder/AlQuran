import { Pressable } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Animated } from "react-native";
import Ripple from "react-native-material-ripple";
import useTheme from "src/hooks/useTheme";
import { AlQuranInfo, ApplicationState, AyahInfo } from "src/types/types";
import FontAwesomeIcon from "../FontAwesomeIcon";
import CustomText from "../CustomText";
import { useDispatch, useSelector } from "react-redux";
import { font } from "src/utils/fonts";
import useLanguage from "src/hooks/useLanguage";
import convertEnglishToBanglaNumber from "src/utils/convertEnglishToBanglaNumber";
import vibrate from "src/utils/vibratie";
import { updateBookmarkList } from "src/redux/features/alQuran/alQuranSlice";
import htmlToText from "src/utils/htmlToText";

interface BookmarkItemProps {
  item: AyahInfo;
}

const BookmarkItem: React.FC<BookmarkItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const { color } = useTheme();
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const {
    arabicFont,
    arabicTextSize,
    banglaTextSize,
    englishTextSize,
    isShowBanglaText,
    isShowEnglishText,
  } = useSelector((state: { app: ApplicationState }) => state.app);
  const { bnTranslator } = useSelector(
    (state: { alQuran: AlQuranInfo }) => state.alQuran
  );
  const language = useLanguage();
  const { verseId, surahId, meaningEn, verseHtml } = item;

  let verse = htmlToText(verseHtml);
  verse = verse.length > 70 ? verse.slice(0, 70) + "..." : verse;

  const text1 =
    language === "bangla"
      ? `সূরা - ${convertEnglishToBanglaNumber(surahId.toString())}`
      : `Sura - ${surahId}`;

  const text2 =
    language === "bangla"
      ? `আয়াত - ${convertEnglishToBanglaNumber(verseId.toString())}`
      : `Ayah - ${verseId}`;

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
          rippleOpacity={0.2}
          rippleDuration={200}
          onStartShouldSetResponder={() => true}
          rippleSequential
          onPress={() => {
            vibrate();
            setTimeout(() => {
              //@ts-ignore
              navigation.navigate("SingleSurah", {
                fromWhichScreen: "BookMarkedList",
                surahNumber: surahId,
                ayahNumber: verseId,
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
            <View className="mr-10 ml-2">
              <View className="flex flex-row-reverse">
                <CustomText
                  style={{ fontFamily: arabicFont, fontSize: arabicTextSize }}
                >
                  {verse}
                </CustomText>
              </View>

              {isShowBanglaText ? (
                <View>
                  <CustomText
                    style={[font.regularFont, { fontSize: banglaTextSize }]}
                  >
                    {item[bnTranslator].length > 55
                      ? item[bnTranslator].slice(0, 55) + "..."
                      : item[bnTranslator]}
                  </CustomText>
                </View>
              ) : null}

              {isShowEnglishText ? (
                <View>
                  <CustomText
                    style={[font.regularFont, { fontSize: englishTextSize }]}
                  >
                    {meaningEn.length > 55
                      ? meaningEn.slice(0, 55) + "..."
                      : meaningEn}
                  </CustomText>
                </View>
              ) : null}

              <View className="flex flex-row items-center justify-start gap-2">
                <CustomText
                  style={{
                    color: color.activeColor1,
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                >
                  {text1}
                </CustomText>
                <CustomText
                  style={{
                    color: color.activeColor1,
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                >
                  {text2}
                </CustomText>
              </View>
            </View>
          </View>
        </Ripple>
      </View>

      <View className="absolute h-full flex flex-row items-center right-0 mr-3">
        <Animated.View
          style={[
            {
              width: 30,
              height: 30,
              overflow: "hidden",
              transform: [
                {
                  scale: isPressed ? 0.9 : 1,
                },
              ],
            },
          ]}
          className="rounded-full"
        >
          <Pressable
            onPress={() => {
              dispatch(updateBookmarkList({ surahId, verseId, language }));
            }}
          >
            <View className="flex items-center justify-center h-full w-full">
              <FontAwesomeIcon name="bookmark" solid size={17} />
            </View>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};

export default BookmarkItem;
