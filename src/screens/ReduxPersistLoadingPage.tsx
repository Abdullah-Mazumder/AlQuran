import { View, Image } from "react-native";
import CustomStatusBar from "src/components/CustomStatusBar";
import useNavigationBarBgColorHandler from "src/hooks/useNavigationBarBgColorHandler";
import useTheme from "src/hooks/useTheme";

const ReduxPersistLoadingPage = () => {
  // Apply the navigation bar color handler
  useNavigationBarBgColorHandler();

  // Get the color object from the theme hook
  const { color } = useTheme();

  return (
    <View
      style={{
        backgroundColor: color.bgColor2,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Render the custom status bar component */}
      <CustomStatusBar />

      {/* Render the image component with source */}
      <Image
        className="w-48 h-48"
        source={require("../../assets/image/brand.png")}
      />
    </View>
  );
};

export default ReduxPersistLoadingPage;
