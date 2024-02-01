import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import useGetSingleSurah from "src/hooks/dataRelated/useGetSingleSurah";
import { useRoute } from "@react-navigation/native";
import MushafQuranSurahInfo from "src/components/quran/MushafQuranSurahInfo";
import useTheme from "src/hooks/useTheme";
import Loader from "src/components/Loader";
import { VersesByPageType } from "src/types/types";
import { FlashList } from "@shopify/flash-list";
import VersesByPage from "src/components/quran/VersesByPage";
import ModalWrapper from "src/components/ModalWrapper";
import SettingsBoxModal from "src/components/quran/SettingsBoxModal";

const MushafQuran = () => {
  const route = useRoute();
  const { color } = useTheme();
  const { surahNumber } = route.params as { surahNumber: number };
  const { isLoading, surah, surahInfo } = useGetSingleSurah(surahNumber);
  const [versesByPage, setVersesByPage] = useState<VersesByPageType[] | null>(
    null
  );
  const [settingsBox, setsettingsBox] = useState(false);

  useEffect(() => {
    if (surah.length > 0) {
      const groupByPage = surah.reduce((acc, surah) => {
        const { page, ruku, manzil, juz, verseId, verseHtml, isSajdahAyat } =
          surah;
        if (acc[page.toString()]) {
          acc[page.toString()].push({
            ruku,
            manzil,
            juz,
            verseId,
            verseHtml,
            isSajdahAyat,
          });
        } else {
          acc[page.toString()] = [
            { ruku, manzil, juz, verseId, verseHtml, isSajdahAyat },
          ];
        }

        return acc;
      }, {});

      const data = [];

      Object.keys(groupByPage).forEach((key) => {
        let html = "";

        groupByPage[key].forEach((verse) => {
          const { verseId, verseHtml, isSajdahAyat } = verse;
          html += verseHtml;
          if (isSajdahAyat) html += `<div class="sajdah">۩</div>`;
          html += `<div class="verseId">${verseId}</div>`;
        });

        data.push({
          page: +key,
          ruku: groupByPage[key][0].ruku,
          manzil: groupByPage[key][0].manzil,
          juz: groupByPage[key][0].juz,
          html,
        });
      });

      setVersesByPage(data);
    }
  }, [surah]);

  return (
    <View style={{ flex: 1 }}>
      <MushafQuranSurahInfo
        isLoading={isLoading}
        setsettingsBox={setsettingsBox}
        surahInfo={surahInfo}
      />
      <View style={{ flex: 1, backgroundColor: color.bgColor2 }}>
        {isLoading || !versesByPage ? (
          <View className="flex h-full items-center justify-center">
            <Loader />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <FlashList
              data={versesByPage}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <VersesByPage
                    index={index}
                    surahId={surahNumber}
                    versesByPage={item}
                  />
                );
              }}
              estimatedItemSize={1200}
            />
          </View>
        )}
      </View>

      <ModalWrapper
        isOpen={settingsBox}
        onClose={() => setsettingsBox(false)}
        placement="top"
        // animation="slideInDown"
      >
        <SettingsBoxModal setsettingsBox={setsettingsBox} />
      </ModalWrapper>
    </View>
  );
};

export default MushafQuran;
