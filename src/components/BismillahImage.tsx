import { Image, View } from "react-native";
import useTheme from "src/hooks/useTheme";

const BismillahImage = () => {
  const { isDark } = useTheme();
  return (
    <>
      <View className="w-40 h-8">
        {isDark ? (
          <Image
            source={require("../../assets/image/bismillah-white.png")}
            className="w-full h-full"
          />
        ) : (
          <Image
            source={require("../../assets/image/bismillah-black.png")}
            className="w-full h-full"
          />
        )}
      </View>
    </>
  );
};

export default BismillahImage;
