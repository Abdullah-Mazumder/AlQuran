import { View, Text, ImageBackground } from "react-native";
import React, { useState } from "react";
import useGetSubjectWiseQuranSubject from "src/hooks/dataRelated/useGetSubjectWiseQuranSubject";
import useTheme from "src/hooks/useTheme";
import CustomText from "src/components/CustomText";
import { font } from "src/utils/fonts";
import useLanguage from "src/hooks/useLanguage";
import FontAwesomeIcon from "src/components/FontAwesomeIcon";
import Loader from "src/components/Loader";
import { FlashList } from "@shopify/flash-list";
import Ripple from "react-native-material-ripple";
import vibrate from "src/utils/vibratie";
import convertEnglishToBanglaNumber from "src/utils/convertEnglishToBanglaNumber";
import useGoToBackHandler from "src/hooks/useGoToBackHandler";
import QuranSubListItem from "src/components/quran/QuranSubListItem";

const SubjectWiseQuran = () => {
  useGoToBackHandler("QuranHome");
  const { color } = useTheme();
  const language = useLanguage();
  const { isLoading, subjects } = useGetSubjectWiseQuranSubject();
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
            {language == "bangla"
              ? "বিষয় ভিত্তিক আল-কোরআন"
              : "Subject Wise Al-Quran"}
          </CustomText>
          <View className="mb-1">
            <FontAwesomeIcon
              name="book"
              solid
              size={20}
              color={color.activeColor1}
            />
          </View>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: color.bgColor2 }}>
        {isLoading ? (
          <View className="flex items-center justify-center h-full">
            <Loader />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <FlashList
              data={subjects}
              renderItem={({ item, index }) => {
                return <QuranSubListItem item={item} index={index} />;
              }}
              estimatedItemSize={70}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default SubjectWiseQuran;
