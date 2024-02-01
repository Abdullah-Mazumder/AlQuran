import React from "react";
import FontAwesomeIcon5, {
  FontAwesome5IconProps,
} from "react-native-vector-icons/FontAwesome5";
import useTheme from "src/hooks/useTheme";

// Define the PropTypes for FontAwesomeIcon component
interface FontAwesomeIconProps extends FontAwesome5IconProps {
  color?: string;
}

// Functional component for FontAwesomeIcon
const FontAwesomeIcon: React.FC<FontAwesomeIconProps> = ({
  color,
  ...props
}) => {
  // Custom hook to get the theme color
  const { color: themeColor } = useTheme();

  // Render the FontAwesomeIcon with the specified color or theme color
  if (!color)
    return <FontAwesomeIcon5 {...props} color={themeColor.activeColor1} />;

  return <FontAwesomeIcon5 {...props} color={color} />;
};

export default FontAwesomeIcon;
