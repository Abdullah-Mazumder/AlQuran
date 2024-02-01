import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import CustomText from "src/components/CustomText";
import FontAwesomeIcon from "src/components/FontAwesomeIcon";
import Loader from "src/components/Loader";
import BookmarkItem from "src/components/quran/BookmarkItem";
import useGetBookmarkedList from "src/hooks/dataRelated/useGetBookmarkedList";
import useGoToBackHandler from "src/hooks/useGoToBackHandler";
import useLanguage from "src/hooks/useLanguage";
import useTheme from "src/hooks/useTheme";
import { AlQuranInfo, AyahInfo } from "src/types/types";
import { font } from "src/utils/fonts";

const BookMarkedList = () => {
  useGoToBackHandler("QuranHome");
  const { bookmarkList } = useSelector(
    (state: { alQuran: AlQuranInfo }) => state.alQuran
  );
  const [conditions, setConditions] = useState([]);
  const { isLoading, bookmarkedList } = useGetBookmarkedList(conditions);

  const language = useLanguage();
  const { color } = useTheme();

  useEffect(() => {
    const keys = Object.keys(bookmarkList);
    const conditions = keys.map((key) => {
      const surahId = +key.split("_")[0];
      const verseId = +key.split("_")[1];

      return { surahId, verseId };
    });

    setConditions(conditions);
  }, [bookmarkList]);

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
            {language == "bangla" ? "বুকমার্ক করা তালিকা" : "Bookmarked List"}
          </CustomText>
          <View className="mb-1">
            <FontAwesomeIcon
              name="bookmark"
              solid
              size={20}
              color={color.activeColor1}
            />
          </View>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: color.bgColor2 }}>
        {isLoading ? (
          <View className="flex items-center justify-center w-full h-full">
            <Loader />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            {bookmarkedList.length > 0 ? (
              <>
                <FlashList
                  data={bookmarkedList}
                  estimatedItemSize={100}
                  renderItem={({ item }: { item: AyahInfo }) => {
                    const { verseId, surahId } = item;
                    return (
                      <BookmarkItem item={item} key={`${verseId}_${surahId}`} />
                    );
                  }}
                />
              </>
            ) : (
              <View className="w-full h-full flex items-center justify-center">
                <CustomText
                  style={[
                    font.semiBoldFont,
                    { color: color.activeColor1, fontSize: 18 },
                  ]}
                >
                  {language === "bangla"
                    ? "আপনার বুকমার্ক করা তালিকা খালি!"
                    : "Your Bookmarked List Is Empty!"}
                </CustomText>
              </View>
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default BookMarkedList;
