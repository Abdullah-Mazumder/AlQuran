import React from "react";
import { View } from "react-native";
import FontAwesomeIcon5, {
  FontAwesome5IconProps,
} from "react-native-vector-icons/FontAwesome5";
import useTheme from "../hooks/useTheme";

interface TabsIconProps extends FontAwesome5IconProps {
  focused: boolean;
  name: string;
}

const TabsIcon: React.FC<TabsIconProps> = ({ focused, name, ...props }) => {
  const { color } = useTheme();

  return (
    <View>
      <FontAwesomeIcon5
        {...props}
        name={name} // Pass the name property
        size={20}
        color={focused ? color.activeColor1 : color.txtColor}
      />
    </View>
  );
};

export default TabsIcon;
