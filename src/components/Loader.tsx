import React from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import useTheme from "src/hooks/useTheme";

interface LoaderProps extends ActivityIndicatorProps {
  size?: "small" | "large" | number;
}

const Loader: React.FC<LoaderProps> = ({ size = "large", ...props }) => {
  const { color } = useTheme();
  return (
    <ActivityIndicator size={size} color={color.activeColor1} {...props} />
  );
};

export default Loader;
