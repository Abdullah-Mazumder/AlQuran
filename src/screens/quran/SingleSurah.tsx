import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { useEffect, useRef, useState } from "react";
import * as RNFS from "react-native-fs";
import { View } from "react-native";
import Loader from "src/components/Loader";
import ModalWrapper from "src/components/ModalWrapper";
import SettingsBoxModal from "src/components/quran/SettingsBoxModal";
import SurahInfo from "src/components/quran/SurahInfo";
import useGetSingleSurah from "src/hooks/dataRelated/useGetSingleSurah";
import useGoToBackHandler from "src/hooks/useGoToBackHandler";
import useTheme from "src/hooks/useTheme";
import {
  AlQuranInfo,
  SingleAyahOfFullSurah,
  SingleSurahPageRouteParams,
  WordInfoInAyah,
} from "src/types/types";
import { FlashList } from "@shopify/flash-list";
import Ayah from "src/components/quran/Ayah";
import { useSelector } from "react-redux";
import AudioPlayer from "src/components/quran/AudioPlayer";
import useGetStoragePath from "src/hooks/useGetStoragePath";
import createAudioFileName, {
  createAudioTimingFileName,
} from "src/utils/createAudioFileName";
import RippleButton from "src/components/RippleButton";
import CustomText from "src/components/CustomText";
import useLanguage from "src/hooks/useLanguage";
import { AVPlaybackStatus, Audio } from "expo-av";
import { font } from "src/utils/fonts";
import { Slider } from "@miblanchard/react-native-slider";
import convertEnglishToBanglaNumber from "src/utils/convertEnglishToBanglaNumber";
import showToast from "src/utils/showToast";
import getStoragePermissions from "src/utils/getStoragePermissions";

type ModifiedAVPlaybackStatus = AVPlaybackStatus & {
  isBuffering?: boolean;
  isPlaying?: boolean;
  positionMillis?: number;
  didJustFinish?: boolean;
};

type AudioTimingFile = {
  verses: { start: number; end: number }[];
  versesTiming: number[];
  wordsTiming: number[];
};

const SingleSurah = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const verseListRef = useRef(null);
  const route = useRoute();
  const language = useLanguage();
  const params = route.params as SingleSurahPageRouteParams;
  useGoToBackHandler(params?.fromWhichScreen || "QuranHome");

  const [surahNumber, setSurahNumber] = useState(params?.surahNumber);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [wordMeaning, setWordMeaning] = useState<WordInfoInAyah | null>(null);

  const [settingsBox, setsettingsBox] = useState(false);
  const [isOpenOnlAudPlMo, setIsOpenOnlAudPlMo] = useState(false);
  const [isOpenDownloadModal, setIsOpenDownloadModal] = useState(false);
  const [wordModal, setWordModal] = useState(false);
  const [deleteSurahModal, setDeleteSurahModal] = useState(false);

  const [isDownloadedSurah, setIsDownloadedSurah] = useState(false);
  const [isWantToPlaySurah, setIsWantToPlaySurah] = useState(false);

  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const [isSurahAudioLoading, setIsSurahAudioLoading] = useState(false);
  const [isSurahAudioPlaying, setIsSurahAudioPlaying] = useState(false);

  const [ayahInView, setAyahInView] = useState<SingleAyahOfFullSurah | null>(
    null
  );
  const [verseToScroll, setVerseToScroll] = useState<number>(1);

  const [currentVerse, setCurrentVerse] = useState<number | null>(null);
  const [currentWord, setCurrentWord] = useState<number | null>(null);

  const [audioTimingFile, setAudioTimingFile] =
    useState<AudioTimingFile | null>(null);

  const {
    isShowAudioPlayer,
    reciter,
    isPlayFullSurah,
    repeatAyahPlaying,
    history,
    lastReadSurah,
  } = useSelector((state: { alQuran: AlQuranInfo }) => state.alQuran);

  const { color } = useTheme();
  const { storagePath } = useGetStoragePath();
  const { surah, surahInfo, isLoading } = useGetSingleSurah(surahNumber);

  const webViewRefs = useRef([]);

  const playSurahOnlineOrOffline = () => {
    if (!isDownloadedSurah) {
      setIsOpenOnlAudPlMo(true);
    } else {
      setIsWantToPlaySurah(true);
      setIsSurahAudioLoading(true);
    }
  };

  const playOrPauseSurahAudio = async () => {
    if (sound) {
      if (isSurahAudioPlaying) {
        await sound.pauseAsync();
        setIsSurahAudioPlaying(false);
      } else {
        await sound.playAsync();
        setIsSurahAudioPlaying(true);
      }
    }
  };

  const downloadSurah = async () => {
    if ((await getStoragePermissions()) === false) return;
    if (!storagePath) {
      showToast("SD Card Not Found!");
      return;
    }

    const isExistsThisSurahFolderInFS = await RNFS.exists(
      `${storagePath}/audio`
    );
    if (!isExistsThisSurahFolderInFS) {
      await RNFS.mkdir(`${storagePath}/audio`);
    }

    setIsOpenDownloadModal(true);
    const url = `https://api.qurancdn.com/api/qdc/audio/reciters/${reciter}/audio_files?chapter=${surahNumber}&segments=true`;
    try {
      const r = await fetch(url);
      const res = await r.json();

      const timingFile = res.audio_files[0].verse_timings;
      const timingFileName = createAudioTimingFileName(surahNumber, reciter);
      await RNFS.writeFile(
        `${RNFS.DocumentDirectoryPath}/audio/${timingFileName}`,
        JSON.stringify(timingFile),
        "utf8"
      );

      const audioUrl = res.audio_files[0].audio_url;
      const fileName = createAudioFileName(surahNumber, reciter);
      const downloadDest = `${storagePath}/audio/${fileName}`;

      const options: RNFS.DownloadFileOptions = {
        fromUrl: audioUrl,
        toFile: downloadDest,
        background: true,
        progressDivider: 1,
        progress: (res) => {
          const percentage = (
            (res.bytesWritten / res.contentLength) *
            100
          ).toFixed(2);
          setDownloadProgress(parseFloat(percentage));
        },
      };

      const taskId = RNFS.downloadFile(options);
      await taskId.promise;

      setIsDownloadedSurah(true);
      setIsOpenDownloadModal(false);
      setDownloadProgress(0);
    } catch (error) {
      showToast("Something went wrong!");
    }
  };

  const deleteSurah = async () => {
    try {
      const fileName = createAudioFileName(surahNumber, reciter);
      const timingFileName = createAudioTimingFileName(surahNumber, reciter);

      await RNFS.unlink(
        `${RNFS.DocumentDirectoryPath}/audio/${timingFileName}`
      );
      await RNFS.unlink(`file://${storagePath}/audio/${fileName}`);

      setDeleteSurahModal(false);
      setIsDownloadedSurah(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTimingFile = (
    jsonObj: {
      verse_key: string;
      timestamp_from: number;
      timestamp_to: number;
      segments: number[];
    }[]
  ) => {
    const obj = {
      verses: [],
      versesTiming: [],
      wordsTiming: [],
    };

    jsonObj.forEach(
      (o: {
        verse_key: string;
        timestamp_from: number;
        timestamp_to: number;
        segments: any[];
      }) => {
        const verseId = +o.verse_key.split(":")[1];

        obj.verses.push({ start: o.timestamp_from, end: o.timestamp_to });

        for (let i = o.timestamp_from; i <= o.timestamp_to; i++) {
          obj.versesTiming[i] = verseId;
        }

        o.segments.forEach((w) => {
          if (w.length === 3) {
            for (let i = w[1]; i <= w[2]; i++) {
              obj.wordsTiming[i] = w[0];
            }
          }
        });
      }
    );

    return obj;
  };

  const updateAudioOnSlidingChange = async (verseNumber: number) => {
    if (verseNumber === 0) verseNumber = 1;
    setVerseToScroll(verseNumber);

    if (isSurahAudioPlaying) {
      await sound.setStatusAsync({
        positionMillis: audioTimingFile.verses[verseNumber - 1].start,
      });
    }
  };

  const playNext = async () => {
    const next = verseToScroll + 1;
    if (next <= surahInfo.totalAyah) {
      setVerseToScroll(next);

      if (isSurahAudioPlaying) {
        await sound.setStatusAsync({
          positionMillis: audioTimingFile.verses[next - 1].start,
        });
      }
    }
  };

  const playBack = async () => {
    const back = verseToScroll - 1;

    if (back > 0) {
      setVerseToScroll(back);

      if (isSurahAudioPlaying) {
        await sound.setStatusAsync({
          positionMillis: audioTimingFile.verses[back - 1].start,
        });
      }
    }
  };

  const playWord = async (audioName: string) => {
    if (isSurahAudioPlaying) await sound.pauseAsync();

    try {
      const wordSound = await Audio.Sound.createAsync({
        uri: `https://audio.qurancdn.com/${audioName}`,
      });

      await wordSound.sound.playAsync();
    } catch (error) {}
  };

  const handleWordMeaning = (position: string) => {
    setWordModal(false);
    const [_, verseId, wordId] = position.split("_");
    setWordMeaning(surah[+verseId - 1].words[+wordId - 1]);

    setWordModal(true);
  };

  const clearCache = async () => {
    if (sound) await sound?.unloadAsync();
    setIsWantToPlaySurah(false);
    setIsSurahAudioLoading(false);
    setIsSurahAudioPlaying(false);
    setSound(null);
    setCurrentVerse(null);
    setCurrentWord(null);
  };

  const ms = 200;

  const loadSurahSound = async () => {
    setIsSurahAudioLoading(true);
    try {
      let sound: Audio.Sound;

      let timingFile: AudioTimingFile;

      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
      });

      if (isDownloadedSurah) {
        const timingFileName = createAudioTimingFileName(surahNumber, reciter);
        let tmFile = await RNFS.readFile(
          `${RNFS.DocumentDirectoryPath}/audio/${timingFileName}`
        );
        tmFile = JSON.parse(tmFile);

        //@ts-ignore
        timingFile = updateTimingFile(tmFile);

        const fileName = createAudioFileName(surahNumber, reciter);
        const soundObj = new Audio.Sound();

        await soundObj.loadAsync(
          { uri: `${storagePath}/audio/${fileName}` },
          { shouldPlay: false, progressUpdateIntervalMillis: ms }
        );

        sound = soundObj;
      } else {
        const url = `https://api.qurancdn.com/api/qdc/audio/reciters/${reciter}/audio_files?chapter=${surahNumber}&segments=true`;
        const r = await fetch(url);
        const res = await r.json();

        timingFile = updateTimingFile(res.audio_files[0].verse_timings);

        const audioUrl = res.audio_files[0].audio_url;

        const soundInfo = await Audio.Sound.createAsync(
          {
            uri: audioUrl,
          },
          { shouldPlay: false, progressUpdateIntervalMillis: ms }
        );

        sound = soundInfo.sound;
      }

      return { sound, timingFile };
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (webViewRefs && webViewRefs.current) {
      if (currentVerse > 1) {
        webViewRefs.current[currentVerse - 2]?.injectJavaScript(
          "removeHighlight();"
        );
      }

      const js = `highlightWord(${surahNumber}, ${currentVerse}, ${currentWord})`;

      // @ts-ignore
      webViewRefs.current[currentVerse - 1]?.injectJavaScript(js);

      if (!currentVerse) {
        // @ts-ignore
        webViewRefs.current[surahInfo.totalAyah - 1]?.injectJavaScript(js);
      }
    }
  }, [webViewRefs, currentVerse, currentWord]);

  useEffect(() => {
    if (isWantToPlaySurah) {
      const fn = async () => {
        try {
          const { sound, timingFile } = await loadSurahSound();
          setAudioTimingFile(timingFile);

          await sound.setStatusAsync({
            positionMillis: timingFile.verses[ayahInView.verseId - 1].start,
          });
          await sound.playAsync();

          setSound(sound);
        } catch (error) {
          showToast("Something went wrong!");
          clearCache();
        }
      };

      fn();
    }
  }, [isWantToPlaySurah]);

  useEffect(() => {
    if (sound) {
      try {
        let ayahRepeatation = repeatAyahPlaying - 1;

        sound.setOnPlaybackStatusUpdate(
          async (status: ModifiedAVPlaybackStatus) => {
            setIsSurahAudioLoading(status.isBuffering);
            setIsSurahAudioPlaying(status.isPlaying);

            if (status.isBuffering) {
              setCurrentWord(null);
              setCurrentVerse(null);
            }

            if (ayahRepeatation === 0) {
              setVerseToScroll(
                audioTimingFile.versesTiming[status.positionMillis + 400]
              );
            }

            const verseId = audioTimingFile.versesTiming[status.positionMillis];

            setCurrentVerse((prevState: number | null) => {
              if (prevState !== verseId) return verseId;
              else return prevState;
            });

            let wordPosition: number =
              audioTimingFile.wordsTiming[status.positionMillis];
            if (wordPosition) setCurrentWord(wordPosition);

            const verseStartTime = audioTimingFile.verses[verseId - 1]?.start;
            const verseEndTime = audioTimingFile.verses[verseId - 1]?.end;

            const diff = verseEndTime - status.positionMillis;

            if (isPlayFullSurah) {
              if (diff <= ms && diff > 0) {
                if (ayahRepeatation) {
                  await sound.playFromPositionAsync(verseStartTime);
                  ayahRepeatation--;
                } else {
                  ayahRepeatation = repeatAyahPlaying - 1;
                }
              }
            } else {
              if (diff <= ms && diff > 0) {
                if (ayahRepeatation) {
                  await sound.playFromPositionAsync(verseStartTime);
                  ayahRepeatation--;
                } else {
                  setIsSurahAudioLoading(false);
                  setSound(null);
                  await sound.pauseAsync();
                  setIsSurahAudioPlaying(false);
                  setIsWantToPlaySurah(false);
                  setCurrentVerse(null);
                  setCurrentWord(null);
                }
              }
            }

            if (status.didJustFinish) {
              clearCache();
            }
          }
        );
      } catch (error) {
        showToast("Something went wrong!");
        clearCache();
      }
    }
  }, [sound, repeatAyahPlaying, isPlayFullSurah]);

  useEffect(() => {
    if (params?.surahNumber) setSurahNumber(params.surahNumber);
    else if (lastReadSurah) setSurahNumber(lastReadSurah);
    else setSurahNumber(1);
  }, [params?.surahNumber]);

  useEffect(() => {
    const fn = async () => {
      if (!storagePath) return;
      const fileName = createAudioFileName(surahNumber, reciter);
      const existsFile = await RNFS.exists(`${storagePath}/audio/${fileName}`);
      if (existsFile) setIsDownloadedSurah(true);
      else setIsDownloadedSurah(false);
    };

    fn();
  }, [surahNumber, reciter, isFocused, storagePath]);

  useEffect(() => {
    clearCache();

    return () => {
      clearCache();
    };
  }, [isFocused, surahNumber, reciter]);

  useEffect(() => {
    setVerseToScroll(1);
  }, [surahNumber]);

  useEffect(() => {
    if (verseListRef && verseListRef.current) {
      verseListRef.current.scrollToIndex({
        animated: true,
        index: verseToScroll - 1,
        viewPosition: -0.012,
      });
    }
  }, [verseToScroll]);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });

    return () => {
      clearCache();
    };
  }, []);

  useEffect(() => {
    let id: string | number | NodeJS.Timeout;

    if (wordModal) {
      id = setTimeout(() => {
        setWordModal(false);
      }, 4000);
    }

    return () => clearTimeout(id);
  }, [wordModal]);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <SurahInfo
          isLoading={isLoading}
          surahInfo={surahInfo}
          setsettingsBox={setsettingsBox}
        />
        <View
          style={{ flex: 1, backgroundColor: color.bgColor2 }}
          className="flex items-center justify-center"
        >
          <Loader />
        </View>
      </View>
    );
  }

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

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <SurahInfo
        isLoading={isLoading}
        surahInfo={surahInfo}
        setsettingsBox={setsettingsBox}
        ayahInView={ayahInView}
        fromWhichScreen={params?.fromWhichScreen}
        ayahNumber={params?.ayahNumber}
      />

      <View style={{ flex: 1, backgroundColor: color.bgColor2 }}>
        <FlashList
          ref={verseListRef}
          data={surah}
          // extraData={[currentWord, currentVerse]}
          showsVerticalScrollIndicator={false}
          {...(params?.fromWhichScreen === "BookMarkedList"
            ? { initialScrollIndex: params.ayahNumber - 1 }
            : history[surahNumber]
            ? { initialScrollIndex: history[surahNumber] - 1 }
            : { initialScrollIndex: 0 })}
          estimatedItemSize={600}
          onViewableItemsChanged={onViewableItemsChanged}
          renderItem={({ item }) => {
            return (
              <Ayah
                ayah={item}
                totalAyah={surahInfo.totalAyah}
                playWord={playWord}
                surahNameBn={surahInfo.nameBn}
                surahNameEn={surahInfo.nameEn}
                handleWordMeaning={handleWordMeaning}
                webViewRefs={webViewRefs.current}
              />
            );
          }}
        />
      </View>

      <ModalWrapper
        isOpen={settingsBox}
        onClose={() => setsettingsBox(false)}
        placement="top"
        // animation="slideInDown"
      >
        <SettingsBoxModal setsettingsBox={setsettingsBox} />
      </ModalWrapper>

      {isShowAudioPlayer && (
        <AudioPlayer
          isDownloadedSurah={isDownloadedSurah}
          isWantToPlaySurah={isWantToPlaySurah}
          playSurahOnlineOrOffline={playSurahOnlineOrOffline}
          isSurahAudioLoading={isSurahAudioLoading}
          isSurahAudioPlaying={isSurahAudioPlaying}
          playOrPauseSurahAudio={playOrPauseSurahAudio}
          downloadSurah={downloadSurah}
          deleteSurah={() => setDeleteSurahModal(true)}
          verseToScroll={verseToScroll}
          totalAyah={surahInfo.totalAyah}
          updateAudioOnSlidingChange={updateAudioOnSlidingChange}
          playNext={playNext}
          playBack={playBack}
        />
      )}

      <ModalWrapper
        isOpen={isOpenOnlAudPlMo}
        onClose={() => setIsOpenOnlAudPlMo(false)}
        placement="center"
        width={300}
      >
        <View
          className="pb-2"
          style={{ backgroundColor: color.bgColor2, borderRadius: -1 }}
        >
          <View className="p-2">
            <CustomText className="text-lg">
              {language === "bangla"
                ? "সূরাটি আপনার ডিভাইসে ডাউনলোড করা নাই। আপনি কি সূরাটি অনলাইনে শুনতে চান?"
                : "The surah is not downloaded to your device. Do you want to listen to surah online?"}
            </CustomText>
          </View>
          <View className="w-full flex flex-row justify-end gap-x-3 items-center my-2 mt-5">
            <View>
              <RippleButton
                vibration
                title="No"
                onButtonPress={() => setIsOpenOnlAudPlMo(false)}
              />
            </View>
            <View>
              <RippleButton
                vibration
                title="Yes"
                onButtonPress={() => {
                  setIsOpenOnlAudPlMo(false);
                  setIsWantToPlaySurah(true);
                  // setIsSurahAudioLoading(true);
                }}
              />
            </View>
          </View>
        </View>
      </ModalWrapper>

      <ModalWrapper
        isOpen={isOpenDownloadModal}
        onClose={() => setIsOpenDownloadModal(false)}
        placement="center"
      >
        <View
          className="p-3"
          style={{ backgroundColor: color.bgColor2, borderRadius: -1 }}
        >
          <View className="flex flex-row justify-between items-center">
            <CustomText style={[font.semiBoldFont, { fontSize: 17 }]}>
              {language === "bangla" ? "ডাউনলোড হচ্ছে..." : "Downloading..."}
            </CustomText>
            <CustomText style={[{ fontSize: 17, fontWeight: "600" }]}>
              {language === "bangla"
                ? `${convertEnglishToBanglaNumber(
                    downloadProgress.toString()
                  )}%`
                : `${downloadProgress}%`}
            </CustomText>
          </View>

          <View>
            <Slider
              disabled
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor={color.activeColor1}
              maximumTrackTintColor={color.activeColor2}
              thumbStyle={{ backgroundColor: color.activeColor1 }}
              trackStyle={{ height: 6 }}
              value={downloadProgress}
            />
          </View>
        </View>
      </ModalWrapper>

      <ModalWrapper
        isOpen={deleteSurahModal}
        onClose={() => setDeleteSurahModal(false)}
        placement="center"
      >
        <View style={{ backgroundColor: color.bgColor2 }} className="p-4">
          <CustomText className="text-lg font-semibold">
            {language === "bangla"
              ? "আপনি কি সূরাটি ডিলিট করতে চান?"
              : "Do you want to delete this surah?"}
          </CustomText>

          <View className="flex flex-row items-center justify-end gap-x-2 mt-4">
            <View>
              <RippleButton
                vibration
                title="No"
                onButtonPress={() => setDeleteSurahModal(false)}
              />
            </View>
            <View>
              <RippleButton vibration title="Yes" onButtonPress={deleteSurah} />
            </View>
          </View>
        </View>
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
    </View>
  );
};

export default SingleSurah;
