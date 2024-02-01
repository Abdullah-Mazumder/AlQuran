import React, { useState } from "react";
import useTheme from "src/hooks/useTheme";
import FontAwesomeIcon from "../FontAwesomeIcon";
import Ripple from "react-native-material-ripple";
import vibrate from "src/utils/vibratie";

interface AyahActionButtonProps {
  iconName: string;
  solid: boolean;
  action: () => void;
}

const AyahActionButton: React.FC<AyahActionButtonProps> = ({
  iconName,
  solid,
  action,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const { color } = useTheme();
  return (
    <Ripple
      style={{
        borderRadius: 3,
        borderColor: color.activeColor1,
        borderWidth: 1.5,
        width: 23,
        height: 23,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: [{ scale: isPressed ? 0.85 : 1 }],
        marginHorizontal: 3,
      }}
      rippleDuration={200}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={() => {
        vibrate();
        setTimeout(() => {
          action();
        }, 200);
      }}
    >
      <FontAwesomeIcon name={iconName} size={15} solid={solid} />
    </Ripple>
  );
};

export default AyahActionButton;
