import { View, Text } from "react-native";
import React from "react";
import useTheme from "src/hooks/useTheme";
import Ionicon from "react-native-vector-icons/Ionicons";

const IconInfoTag: React.FC<{ title: string }> = ({ title }) => {
  const { color } = useTheme();
  return (
    <View
      className="flex items-center justify-center mx-0.5"
      style={{ marginVertical: 1 }}
    >
      <View
        style={{
          borderWidth: 0.7,
          borderColor: color.activeColor1,
          paddingHorizontal: 7,
          paddingVertical: 1,
          borderRadius: 10,
          backgroundColor: color.warnBg,
        }}
        className="flex flex-row items-center justify-center"
      >
        <Ionicon
          name="checkmark-circle"
          size={10}
          color={color.activeColor1}
          className="mr-2"
        />

        <Text
          style={{
            fontSize: 9,
            color: color.activeColor1,
            fontWeight: "bold",
            marginBottom: 0.5,
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

export default IconInfoTag;
