import React, { useState } from "react";
import Ripple from "react-native-material-ripple";
import useTheme from "src/hooks/useTheme";
import CustomText from "./CustomText";
import { font } from "src/utils/fonts";
import vibrate from "src/utils/vibratie";

interface RippleButtonProps {
  title: string;
  scale?: number;
  onButtonPress: () => void;
  vibration?: boolean;
}

const RippleButton: React.FC<RippleButtonProps> = ({
  title,
  scale = 1,
  onButtonPress,
  vibration,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const { color } = useTheme();
  return (
    <Ripple
      style={{
        // backgroundColor: "#00887a80",
        backgroundColor: color.activeColor2,
        borderRadius: 3,
        paddingHorizontal: 15,
        paddingVertical: 1,
        borderColor: color.activeColor1,
        borderWidth: 2,
        transform: [{ scale: isPressed ? scale - 0.04 : scale }],
      }}
      rippleDuration={200}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={() => {
        if (vibration) vibrate();
        setTimeout(() => {
          onButtonPress();
        }, 200);
      }}
    >
      <CustomText
        className="text-white"
        style={[font.semiBoldFont, { fontSize: 15 }]}
      >
        {title}
      </CustomText>
    </Ripple>
  );
};

export default RippleButton;
