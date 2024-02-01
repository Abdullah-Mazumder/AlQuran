import React, { forwardRef, Ref } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesomeIcon from "./FontAwesomeIcon";
import useTheme from "src/hooks/useTheme";

// Define the PropTypes for SelectBox component
interface SelectBoxProps {
  dropdownHeight?: number;
  dropdownWidth?: number;
  defaultButtonText?: string;
  defaultValueByIndex?: number;
  data: Array<any>;
  onSelect: (selectedItem: any, index: number) => void;
  buttonTextAfterSelection: (selectedItem: any, index: number) => void;
  rowTextForSelection: (selectedItem: any, index: number) => void;
}

// Forward Ref to allow parent components to use a ref on SelectBox
const SelectBox: React.ForwardRefRenderFunction<
  SelectDropdown,
  SelectBoxProps & TouchableOpacityProps
> = (
  { dropdownHeight = 300, dropdownWidth = 120, ...props },
  ref: Ref<SelectDropdown>
) => {
  const { color } = useTheme();

  return (
    <TouchableOpacity>
      {/* @ts-ignore */}
      <SelectDropdown
        ref={ref}
        {...props}
        statusBarTranslucent={true}
        buttonStyle={{
          backgroundColor: color.bgColor1,
          width: dropdownWidth,
          height: 30,
          borderRadius: 7,
          borderWidth: 2,
          borderColor: color.activeColor1,
        }}
        buttonTextStyle={
          {
            color: color.txtColor,
            fontSize: 13,
            fontWeight: 700,
            marginLeft: "auto",
            marginBottom: 1,
          } as any
        }
        renderDropdownIcon={(isOpened) => (
          <FontAwesomeIcon
            name={isOpened ? "chevron-up" : "chevron-down"}
            size={15}
          />
        )}
        dropdownStyle={{
          backgroundColor: color.bgColor1,
          borderRadius: 7,
          height: dropdownHeight,
        }}
        rowTextStyle={
          {
            color: color.txtColor,
            fontWeight: 700,
            fontSize: 14,
          } as any
        } // Cast to TextStyle
        selectedRowStyle={{
          backgroundColor: color.activeColor1,
        }}
        selectedRowTextStyle={{
          color: "white",
        }}
      />
    </TouchableOpacity>
  );
};

export default forwardRef(SelectBox);
