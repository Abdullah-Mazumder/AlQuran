import { View, Image } from "react-native";
import BismillahImage from "./BismillahImage";
import DarkOrLight from "./DarkOrLight";
import useNavigationBarBgColorHandler from "src/hooks/useNavigationBarBgColorHandler";
import useTheme from "src/hooks/useTheme";

const HomeTopSection = () => {
  useNavigationBarBgColorHandler();
  const { color } = useTheme();
  return (
    <View
      style={{
        backgroundColor: color.bgColor1,
      }}
      className="py-2"
    >
      <View className="flex flex-row items-center justify-between px-3">
        <View className="flex flex-row">
          <View className="w-9 h-9">
            <Image
              source={require("../../assets/image/allah.png")}
              className="w-full h-full"
            />
          </View>
          <View className="w-9 h-9 mt-[1px]">
            <Image
              source={require("../../assets/image/mohammad.png")}
              className="w-full h-full"
            />
          </View>
        </View>
        <>
          <BismillahImage />
        </>

        {/* <>
          <ToggleLanguage />
        </> */}
        <>
          <DarkOrLight />
        </>
      </View>
    </View>
  );
};

export default HomeTopSection;
