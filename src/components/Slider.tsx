import React from "react";
import { View } from "react-native";
import {
  Slider as RangeSlider,
  SliderProps,
} from "@miblanchard/react-native-slider";
import { useDispatch, useSelector } from "react-redux";
import CustomText from "./CustomText";
import useTheme from "src/hooks/useTheme";
import { font } from "src/utils/fonts";
import convertEnglishToBanglaNumber from "src/utils/convertEnglishToBanglaNumber";
import { ApplicationState } from "src/types/types";

// Define the prop types for the TextSizeSlider component
interface TextSizeSliderProps {
  label: string;
  minValue: number;
  maxValue: number;
  value: number;
  actionName?: (value: number) => any;
}

const Slider: React.FC<TextSizeSliderProps> = ({
  label,
  minValue,
  maxValue,
  value,
  actionName,
}) => {
  const { color } = useTheme();
  const dispatch = useDispatch();
  const { language } = useSelector(
    (state: { app: ApplicationState }) => state.app
  );

  return (
    <View className="flex flex-row items-center justify-between">
      <CustomText
        style={[
          font.semiBoldFont,
          { fontSize: language === "bangla" ? 14 : 14.5 },
        ]}
      >
        {label}
      </CustomText>
      <View className="w-[170]">
        <RangeSlider
          minimumValue={minValue}
          maximumValue={maxValue}
          step={1}
          minimumTrackTintColor={color.activeColor1}
          maximumTrackTintColor={color.activeColor2}
          thumbStyle={{ backgroundColor: color.activeColor1 }}
          trackStyle={{ height: 6 }}
          value={value}
          onSlidingComplete={(newValue: number[]) => {
            // Dispatch the action with the new slider value
            dispatch(actionName(newValue[0]));
          }}
        />
      </View>

      {/* Display the slider value in Bangla number format */}
      <CustomText
        className="font-semibold"
        style={{ fontSize: language === "bangla" ? 14 : 14.5 }}
      >
        {language === "bangla"
          ? convertEnglishToBanglaNumber(value.toString())
          : value}
      </CustomText>
    </View>
  );
};

export default Slider;
