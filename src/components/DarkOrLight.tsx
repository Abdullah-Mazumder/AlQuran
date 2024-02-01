import { View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import Ionicon from "react-native-vector-icons/Ionicons";
import useTheme from "src/hooks/useTheme";
import vibrate from "src/utils/vibratie";
import { toggleIsDark } from "src/redux/features/theme/themeSlice";

const DarkOrLight = () => {
  const dispatch = useDispatch();
  const { isDark, color } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => {
        vibrate();
        dispatch(toggleIsDark(!isDark));
      }}
    >
      <View className="w-9 h-9 flex items-end justify-end">
        <Ionicon
          name={isDark ? "moon" : "sunny"}
          size={33}
          color={color.activeColor1}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DarkOrLight;
