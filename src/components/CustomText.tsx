import React from "react";
import { Text, TextStyle, TextProps } from "react-native";
import useTheme from "src/hooks/useTheme";

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  style,
  ...props
}) => {
  const { color } = useTheme();

  let mergedStyles: TextStyle[] = [];

  if (style) {
    // If style is provided, merge custom color with existing styles
    if (Array.isArray(style)) {
      // If style is an array, concatenate styles
      mergedStyles = [
        {
          color: color.txtColor,
        },
        ...style,
      ];
    } else {
      // If style is an object, merge into an array
      mergedStyles = [
        {
          color: color.txtColor,
        },
        style,
      ];
    }
  } else {
    // If style is not provided, use only the custom color
    mergedStyles = [
      {
        color: color.txtColor,
      },
    ];
  }

  return (
    <>
      <Text style={mergedStyles} {...props}>
        {children}
      </Text>
    </>
  );
};

export default CustomText;
