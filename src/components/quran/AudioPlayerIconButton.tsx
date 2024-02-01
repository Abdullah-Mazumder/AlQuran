import { PressableProps, View } from "react-native";
import React from "react";
import { Pressable } from "@react-native-material/core";
import Ionicon from "react-native-vector-icons/Ionicons";
import useTheme from "src/hooks/useTheme";

interface AudioPlayerIconButtonProps extends PressableProps {
  name: string;
}

const AudioPlayerIconButton: React.FC<AudioPlayerIconButtonProps> = ({
  name,
  ...props
}) => {
  const { color } = useTheme();
  return (
    <View
      className="rounded-full overflow-hidden"
      style={{ width: 40, height: 40 }}
    >
      <Pressable
        {...props}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicon
          name={name}
          size={28}
          color={color.activeColor1}
          className="mr-1"
        />
      </Pressable>
    </View>
  );
};

export default AudioPlayerIconButton;
