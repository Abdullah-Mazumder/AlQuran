import { View } from "react-native";
import CustomText from "./CustomText";
import useTheme from "src/hooks/useTheme";
import useLanguage from "src/hooks/useLanguage";
import { font } from "src/utils/fonts";

const ComingSoon = () => {
  const { color } = useTheme();
  const language = useLanguage();
  return (
    <View
      style={{ flex: 1, backgroundColor: color.bgColor2 }}
      className="flex items-center justify-center"
    >
      <CustomText className="text-lg" style={[font.boldFont]}>
        {language === "bangla"
          ? "শীঘ্রই আসছে ইনশাআল্লাহ..."
          : "InshahAllah coming soon..."}
      </CustomText>
    </View>
  );
};

export default ComingSoon;
