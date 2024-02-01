import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import useGetSubjectWiseQuranData from "src/hooks/dataRelated/useGetSubjectWiseQuranData";
import useTheme from "src/hooks/useTheme";
import Loader from "src/components/Loader";
import SurahInfoWithSubject from "src/components/quran/SurahInfoWithSubject";
import ModalWrapper from "src/components/ModalWrapper";
import SettingsBoxModal from "src/components/quran/SettingsBoxModal";
import { FlashList } from "@shopify/flash-list";
import AyahInQuranSub from "src/components/quran/AyahInQuranSub";
import {
  SingleAyahOfFullSurah,
  SingleSurahInfo,
  WordInfoInAyah,
} from "src/types/types";
import CustomText from "src/components/CustomText";
import { Audio } from "expo-av";

interface PageRouteParams {
  subject: string;
  location: string;
}

const QuranSubject = () => {
  const route = useRoute();
  const { color } = useTheme();
  const { subject, location } = route.params as PageRouteParams;

  const [wordMeaning, setWordMeaning] = useState<WordInfoInAyah | null>(null);

  const [settingsBox, setSettingsBox] = useState(false);
  const [wordModal, setWordModal] = useState(false);

  const [verseConditions, setVerseConditions] = useState([]);
  const [surahIds, setSurahIds] = useState([]);

  const { isLoading, verses, surahInformations, wordsInformations } =
    useGetSubjectWiseQuranData(surahIds, verseConditions);

  const [surahInfoInView, setSurahInfoInView] = useState<SingleSurahInfo>(null);
  const [ayahInView, setAyahInView] = useState<SingleAyahOfFullSurah>(null);

  const handleWordMeaning = (position: string) => {
    setWordModal(false);
    const [surahId, verseId, wordId] = position.split("_");
    const key = `${surahId}_${verseId}`;

    setWordMeaning(wordsInformations[key][+wordId - 1]);
    setWordModal(true);
  };

  const playWord = async (audioName: string) => {
    try {
      const wordSound = await Audio.Sound.createAsync({
        uri: `https://audio.qurancdn.com/${audioName}`,
      });

      await wordSound.sound.playAsync();
    } catch (error) {}
  };

  useEffect(() => {
    if (verses.length > 0) {
      setSurahInfoInView(verses[0].surahInfo);
    }
  }, [verses]);

  useEffect(() => {
    const surahAndVerse = location.split(", ");

    const uniqueSurahIds = new Set();

    const surahAndVerseConditions = surahAndVerse.map((item) => {
      const surahId = +item.split(":")[0];
      const verseId = +item.split(":")[1];

      uniqueSurahIds.add(surahId);

      return { surahId, verseId };
    });

    setSurahIds([...uniqueSurahIds]);
    setVerseConditions(surahAndVerseConditions);
  }, [location]);

  useEffect(() => {
    if (ayahInView?.surahId) {
      setSurahInfoInView((prevState) => {
        if (prevState && prevState.id !== ayahInView.surahId) {
          return surahInformations[ayahInView.surahId.toString()];
        } else return prevState;
      });
    }
  }, [ayahInView]);

  useEffect(() => {
    let id: string | number | NodeJS.Timeout;

    if (wordModal) {
      id = setTimeout(() => {
        setWordModal(false);
      }, 4000);
    }

    return () => clearTimeout(id);
  }, [wordModal]);

  const onViewableItemsChanged = ({ viewableItems }) => {
    setAyahInView((prevState) => {
      if (
        viewableItems[0]?.item?.verseId &&
        viewableItems[0]?.item?.verseId != prevState?.verseId
      ) {
        return viewableItems[0].item;
      }
      return prevState;
    });
  };

  const totalVerses = verses.length;

  return (
    <>
      <View style={{ backgroundColor: color.bgColor2, flex: 1 }}>
        <SurahInfoWithSubject
          ayah={ayahInView}
          subject={subject}
          surahInfo={surahInfoInView}
          setsettingsBox={setSettingsBox}
          key={surahInfoInView?.id}
        />
        {isLoading ? (
          <View className="h-full flex justify-center items-center">
            <Loader />
          </View>
        ) : (
          <>
            <View style={{ flex: 1 }}>
              <FlashList
                data={verses}
                renderItem={({ item, index }) => {
                  return (
                    <AyahInQuranSub
                      ayah={item}
                      index={index}
                      handleWordMeaning={handleWordMeaning}
                      playWord={playWord}
                      totalVerses={totalVerses}
                    />
                  );
                }}
                estimatedItemSize={400}
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
              />
            </View>

            <ModalWrapper
              isOpen={settingsBox}
              onClose={() => setSettingsBox(false)}
              placement="top"
            >
              <SettingsBoxModal setsettingsBox={setSettingsBox} />
            </ModalWrapper>

            <Animatable.View
              animation={wordModal ? "slideInDown" : "slideInUp"}
              duration={300}
              className={`absolute flex items-center justify-center w-full ${
                wordModal ? "top-3" : "-top-48"
              }`}
            >
              <View
                className="rounded-[4px] p-3 min-w-[150px]"
                style={{ backgroundColor: color.activeColor1 }}
                onTouchStart={() => setWordModal(false)}
              >
                <View>
                  <CustomText className="text-white text-lg font-semibold">
                    {wordMeaning?.meaningBn}
                  </CustomText>
                  <CustomText className="text-white text-lg font-semibold">
                    {wordMeaning?.meaningEn}
                  </CustomText>
                </View>
              </View>
            </Animatable.View>
          </>
        )}
      </View>
    </>
  );
};

export default QuranSubject;
