import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import Ionicon from "react-native-vector-icons/Ionicons";
import useLanguage from "src/hooks/useLanguage";
import useTheme from "src/hooks/useTheme";
import vibrate from "src/utils/vibratie";
import { toggleLanguage } from "src/redux/features/app/appSlice";

const ToggleLanguage: React.FC = () => {
  const dispatch = useDispatch();
  const language = useLanguage();
  const { color } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        vibrate();
        dispatch(toggleLanguage());
      }}
    >
      <View className="flex flex-row items-center mt-1 ml-1">
        <Ionicon name="language-sharp" size={22} color={color.txtColor} />
        <Text
          className="font-bold -ml-0.5 text-[15px]"
          style={{ color: color.txtColor }}
        >
          -{language == "english" ? "en" : "bn"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ToggleLanguage;
