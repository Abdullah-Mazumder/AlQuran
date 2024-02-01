import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import CustomText from "src/components/CustomText";
import FontAwesomeIcon from "src/components/FontAwesomeIcon";
import Loader from "src/components/Loader";
import SurahListItem from "src/components/quran/SurahListItem";
import useGetSurahInfoWithSurahId from "src/hooks/dataRelated/useGetSurahInfoWithSurahId";
import useGoToBackHandler from "src/hooks/useGoToBackHandler";
import useLanguage from "src/hooks/useLanguage";
import useTheme from "src/hooks/useTheme";
import { AlQuranInfo } from "src/types/types";
import { font } from "src/utils/fonts";

const FavouriteSurahList = () => {
  useGoToBackHandler("QuranHome");
  const { favouriteSurahList, history } = useSelector(
    (state: { alQuran: AlQuranInfo }) => state.alQuran
  );
  const [idList, setIdList] = useState([]);
  let { isLoading, surahInfo } = useGetSurahInfoWithSurahId(idList);

  const { color } = useTheme();
  const language = useLanguage();

  useEffect(() => {
    const ids = Object.keys(favouriteSurahList).map((id) => Number(id));
    setIdList(ids);
  }, [favouriteSurahList]);

  return (
    <>
      <View
        style={{ backgroundColor: color.bgColor1 }}
        className="py-2 flex justify-center items-center"
      >
        <View className="flex flex-row items-center justify-center gap-2">
          <CustomText
            style={[{ color: color.activeColor1 }, font.boldFont]}
            className="text-[20px]"
          >
            {language == "bangla"
              ? "প্রিয় সূরা তালিকা"
              : "Favourite Surah List"}
          </CustomText>
          <View className="mb-1">
            <FontAwesomeIcon
              name="heart"
              solid
              size={20}
              color={color.activeColor1}
            />
          </View>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: color.bgColor2 }}>
        {isLoading ? (
          <View className="flex w-full h-full flex-row items-center justify-center">
            <Loader />
          </View>
        ) : (
          <>
            {surahInfo.length > 0 ? (
              <FlashList
                data={surahInfo}
                estimatedItemSize={65}
                renderItem={({ item }) => {
                  return (
                    <SurahListItem
                      surah={item}
                      fromWhichScreen="FavouriteSurahList"
                      isInHistory={Boolean(history[item.id])}
                      isFavourite={Boolean(favouriteSurahList[item.id])}
                    />
                  );
                }}
              />
            ) : (
              <View className="w-full h-full flex items-center justify-center">
                <CustomText
                  className="text-xl"
                  style={[font.semiBoldFont, { color: color.activeColor1 }]}
                >
                  {language === "bangla"
                    ? "আপনার প্রিয় সূরা তালিকা খালি!"
                    : "Your Favourite Surah List Is Empty!"}
                </CustomText>
              </View>
            )}
          </>
        )}
      </View>
    </>
  );
};

export default FavouriteSurahList;
