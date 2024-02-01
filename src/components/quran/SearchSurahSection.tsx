import React from "react";
import { View, Image, TextInput } from "react-native";
import useTheme from "src/hooks/useTheme";
import FontAwesomeIcon from "../FontAwesomeIcon";
import useLanguage from "src/hooks/useLanguage";
import { font } from "src/utils/fonts";

interface SearchSurahSectionProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchSurahSection: React.FC<SearchSurahSectionProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  const { color } = useTheme();
  const language = useLanguage();

  return (
    <View style={{ backgroundColor: color.bgColor1 }} className="p-2">
      <View className="flex flex-row items-center justify-between">
        <View className="w-[10%]">
          <Image
            source={require("../../../assets/image/allah.png")}
            className="w-9 h-9"
          />
        </View>
        <View className="relative w-[80%]">
          <TextInput
            style={[
              {
                backgroundColor: color.bgColor2,
                color: color.activeColor1,
                fontSize: 14,
                fontWeight: "600",
              },
              font.semiBoldFont,
            ]}
            className="rounded-lg p-1 pl-3"
            placeholder={language === "bangla" ? "সূরা খুজুন" : "Search Surah"}
            multiline={false}
            placeholderTextColor={color.activeColor1}
            value={searchTerm}
            onChangeText={(value) => setSearchTerm(value)}
          ></TextInput>
          <View className="absolute top-2 right-3">
            <FontAwesomeIcon name="search" size={20} />
          </View>
        </View>
        <View className="w-[10%]">
          <Image
            source={require("../../../assets/image/allah.png")}
            className="w-9 h-9 ml-auto"
          />
        </View>
      </View>
    </View>
  );
};

export default SearchSurahSection;
