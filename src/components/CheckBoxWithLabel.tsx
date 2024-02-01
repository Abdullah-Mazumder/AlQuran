import React from "react";
import { Pressable } from "@react-native-material/core";
import { useDispatch } from "react-redux";
import Checkbox, { CheckboxProps } from "expo-checkbox";
import useTheme from "src/hooks/useTheme";
import vibrate from "src/utils/vibratie";
import CustomText from "./CustomText";
import { font } from "src/utils/fonts";
import useLanguage from "src/hooks/useLanguage";

// Define the prop types for the CheckBoxWithLabel component
interface CheckBoxWithLabelProps extends CheckboxProps {
  label: string;
  value: boolean;
  actionName: (value: boolean) => any;
  vibration?: boolean;
}

const CheckBoxWithLabel: React.FC<CheckBoxWithLabelProps> = ({
  label,
  value,
  actionName,
  vibration,
  ...props
}) => {
  const dispatch = useDispatch();
  const { color } = useTheme();
  const language = useLanguage();

  return (
    <Pressable
      {...props}
      style={[
        {
          width: "100%",
          padding: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 1,
          paddingVertical: 15,
        },
        props.style && props.style,
      ]}
      onPress={() => {
        if (vibration) vibrate();
        // Dispatch the action with the new checkbox value
        dispatch(actionName(!value));
      }}
    >
      {/* Label */}
      <CustomText
        style={[
          font.semiBoldFont,
          { fontSize: language === "bangla" ? 14 : 14.5 },
        ]}
      >
        {label}
      </CustomText>

      {/* Checkbox */}
      <Checkbox
        style={{
          borderColor: color.activeColor1,
        }}
        value={value}
        color={color.activeColor1}
        onValueChange={() => {
          dispatch(actionName(!value));
        }}
      />
    </Pressable>
  );
};

export default CheckBoxWithLabel;
