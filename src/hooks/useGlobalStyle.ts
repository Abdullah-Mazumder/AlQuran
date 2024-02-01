import { StyleSheet, ViewStyle } from "react-native";
import useTheme from "./useTheme";

interface GlobalStyle {
  borderStyle: {
    border: ViewStyle;
  };
}

const useGlobalStyle = (): GlobalStyle => {
  // Use the useTheme hook to get the color from the theme
  const { color } = useTheme();

  // Create a StyleSheet object for the border style
  const borderStyle = StyleSheet.create({
    border: {
      borderWidth: 2,
      borderRadius: 5,
      borderColor: color.borderColor,
    },
  });

  // Return the StyleSheet object for the border style
  return { borderStyle };
};

export default useGlobalStyle;
