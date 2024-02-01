import { View, useWindowDimensions, ScrollView } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import useTheme from "src/hooks/useTheme";
import QuranSettings from "src/screens/quran/QuranSettings";
import RippleButton from "../RippleButton";

const SettingsBoxModal: React.FC<{
  setsettingsBox: Dispatch<SetStateAction<boolean>>;
}> = ({ setsettingsBox }) => {
  const { color } = useTheme();
  const { height } = useWindowDimensions();
  return (
    <View
      className="pb-2"
      style={{ backgroundColor: color.bgColor2, borderRadius: -1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          maxHeight: height / 2.7,
        }}
      >
        <QuranSettings />
      </ScrollView>
      <View className="w-full flex items-center my-2 mt-5">
        <RippleButton
          vibration
          title="Close"
          onButtonPress={() => setsettingsBox(false)}
        />
      </View>
    </View>
  );
};

export default SettingsBoxModal;
