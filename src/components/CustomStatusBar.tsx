import { StatusBar } from "react-native";
import React from "react";
import useTheme from "src/hooks/useTheme";

const CustomStatusBar = () => {
  const { color } = useTheme();
  return (
    <>
      <StatusBar backgroundColor={color.bgColor1} hidden={false} />
    </>
  );
};

export default CustomStatusBar;
