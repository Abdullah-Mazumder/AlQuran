import React from "react";
import { View } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import CustomText from "src/components/CustomText";
import useLanguage from "src/hooks/useLanguage";
import useTheme from "src/hooks/useTheme";
import { font } from "src/utils/fonts";

const AboutMe: React.FC = () => {
  const { color } = useTheme();
  const language = useLanguage();

  return (
    <>
      {/* Header Section */}
      <View
        style={{ backgroundColor: color.bgColor1 }}
        className="py-2 flex justify-center items-center"
      >
        <View className="flex flex-row items-center justify-center gap-2">
          <CustomText
            style={[{ color: color.activeColor1 }, font.boldFont]}
            className="text-[20px] -mb-1"
          >
            {language === "bangla" ? "প্রণেতা সম্পর্কে" : "About The Author"}
          </CustomText>
          <Ionicon name="person" size={22} color={color.activeColor1} />
        </View>
      </View>

      {/* Main Content Section */}

      <View
        style={{ flex: 1, backgroundColor: color.bgColor2 }}
        className="flex items-center justify-center"
      >
        <View>
          <View className="flex flex-row items-center justify-center gap-1">
            <CustomText
              style={[{ color: color.activeColor1 }, font.semiBoldFont]}
              className="text-[15px]"
            >
              {language === "bangla" ? "নামঃ" : "Name:"}
            </CustomText>
            <CustomText style={[font.semiBoldFont]} className="text-[15px]">
              {language === "bangla"
                ? "আব্দুল্লাহ মজুমদার"
                : "Abdullah Mazumder"}
            </CustomText>
          </View>
          <View className="flex flex-row items-center justify-center gap-1">
            <CustomText
              style={[{ color: color.activeColor1 }, font.semiBoldFont]}
              className="text-[15px]"
            >
              {language === "bangla" ? "পড়াশুনা স্নাতকঃ" : "Study (BSc Hons.):"}
            </CustomText>
            <CustomText style={[font.semiBoldFont]} className="text-[15px]">
              {language === "bangla"
                ? "কুমিল্লা ভিক্টোরিয়া সরকারি কলেজ"
                : "Cumilla Govt. Victoria College"}
            </CustomText>
          </View>
          <View className="flex flex-row items-center justify-center gap-1">
            <CustomText
              style={[{ color: color.activeColor1 }, font.semiBoldFont]}
              className="text-[15px]"
            >
              {language === "bangla" ? "বিভাগঃ" : "Department:"}
            </CustomText>
            <CustomText style={[font.semiBoldFont]} className="text-[15px]">
              {language === "bangla"
                ? "গণিত (২৫ তম ব্যাচ)"
                : "Mathematics (25th Batch)"}
            </CustomText>
          </View>
        </View>
      </View>
    </>
  );
};

export default AboutMe;
