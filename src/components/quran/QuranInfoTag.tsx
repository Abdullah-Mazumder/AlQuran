import { View, Text } from "react-native";
import React from "react";
import useTheme from "src/hooks/useTheme";

const QuranInfoTag: React.FC<{ title: string }> = ({ title }) => {
  const { color } = useTheme();
  return (
    <View className="mx-0.5" style={{ marginVertical: 1 }}>
      <Text
        style={{
          fontSize: 9.5,
          color: color.activeColor1,
          borderWidth: 1.2,
          borderColor: color.activeColor1,
          paddingHorizontal: 7,
          paddingTop: 0.5,
          borderRadius: 10,
          fontWeight: "700",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default QuranInfoTag;
