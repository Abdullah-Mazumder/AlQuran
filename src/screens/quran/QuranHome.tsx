import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import CustomText from "src/components/CustomText";
import Loader from "src/components/Loader";
import SearchSurahSection from "src/components/quran/SearchSurahSection";
import SurahListItem from "src/components/quran/SurahListItem";
import useGetSurahList from "src/hooks/dataRelated/useGetSurahList";
import useGoToBackHandler from "src/hooks/useGoToBackHandler";
import useLanguage from "src/hooks/useLanguage";
import useTheme from "src/hooks/useTheme";
import { AlQuranInfo } from "src/types/types";
import { font } from "src/utils/fonts";

const QuranHome = () => {
  useGoToBackHandler();
  const { color } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const { isSurahListLoading, surahList } = useGetSurahList();
  const language = useLanguage();
  const { lastReadSurah, history, favouriteSurahList } = useSelector(
    (state: { alQuran: AlQuranInfo }) => state.alQuran
  );

  if (isSurahListLoading) {
    return (
      <View style={{ flex: 1 }}>
        <SearchSurahSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <View style={{ flex: 1, backgroundColor: color.bgColor2 }}>
          <View
            className="flex justify-center items-center"
            style={{ flex: 1 }}
          >
            <Loader />
          </View>
        </View>
      </View>
    );
  }

  const filterWithSearchTerm = () => {
    return surahList.filter((surahItem) => {
      const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapedTerm, "i");

      return (
        regex.test(surahItem.nameEn) ||
        regex.test(surahItem.meaningEn) ||
        regex.test(surahItem.nameBn) ||
        regex.test(surahItem.meaningBn) ||
        regex.test(surahItem.nameAr)
      );
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchSurahSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <View style={{ flex: 1, backgroundColor: color.bgColor2 }}>
        {filterWithSearchTerm()?.length > 0 ? (
          <View className="w-full h-full">
            <FlashList
              data={filterWithSearchTerm()}
              estimatedItemSize={65}
              showsVerticalScrollIndicator={false}
              {...(filterWithSearchTerm().length === 114 &&
                lastReadSurah && {
                  initialScrollIndex: lastReadSurah - 1,
                })}
              renderItem={({ item }) => {
                return (
                  <SurahListItem
                    surah={item}
                    fromWhichScreen="QuranHome"
                    isInHistory={Boolean(history[item.id])}
                    isFavourite={Boolean(favouriteSurahList[item.id])}
                  />
                );
              }}
            />
          </View>
        ) : (
          <View
            className="flex items-center justify-center"
            style={{ flex: 1 }}
          >
            <CustomText
              className="text-lg text-center"
              style={[font.semiBoldFont, { color: color.activeColor1 }]}
            >
              {language === "bangla"
                ? "কোনো সূরা পাওয়া যায় নি।"
                : "Surah List Is Empty."}
            </CustomText>
          </View>
        )}
      </View>
    </View>
  );
};

export default QuranHome;
