import { View } from "react-native";
import React, { useRef, useState } from "react";
import useTheme from "src/hooks/useTheme";
import vibrate from "src/utils/vibratie";
import Ionicon from "react-native-vector-icons/Ionicons";
import { Pressable } from "@react-native-material/core";
import * as Animatable from "react-native-animatable";
import AudioPlayerIconButton from "./AudioPlayerIconButton";
import Loader from "../Loader";
import CustomText from "../CustomText";
import useLanguage from "src/hooks/useLanguage";
import convertEnglishToBanglaNumber from "src/utils/convertEnglishToBanglaNumber";
import { Slider } from "@miblanchard/react-native-slider";
import { useDispatch, useSelector } from "react-redux";
import { AlQuranInfo } from "src/types/types";
import CheckBoxWithLabel from "../CheckBoxWithLabel";
import {
  setIsPlayFullSurah,
  setRepeatAyahPlaying,
} from "src/redux/features/alQuran/alQuranSlice";
import { font } from "src/utils/fonts";
import SelectBox from "../SelectBox";
import FontAwesomeIcon from "../FontAwesomeIcon";

interface AudioPlayerProps {
  isDownloadedSurah: boolean;
  isWantToPlaySurah: boolean;
  playSurahOnlineOrOffline: () => void;
  isSurahAudioLoading: boolean;
  isSurahAudioPlaying: boolean;
  playOrPauseSurahAudio: () => void;
  downloadSurah: () => void;
  deleteSurah: () => void;
  verseToScroll: number | null;
  totalAyah: number;
  updateAudioOnSlidingChange: (n: number) => void;
  playNext: () => void;
  playBack: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isDownloadedSurah,
  isWantToPlaySurah,
  playSurahOnlineOrOffline,
  isSurahAudioLoading,
  isSurahAudioPlaying,
  playOrPauseSurahAudio,
  downloadSurah,
  deleteSurah,
  verseToScroll,
  updateAudioOnSlidingChange,
  totalAyah,
  playBack,
  playNext,
}) => {
  const repeatAyahRef = useRef();
  const dispatch = useDispatch();
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);
  const { color } = useTheme();
  const language = useLanguage();
  const { isPlayFullSurah, repeatAyahPlaying } = useSelector(
    (state: { alQuran: AlQuranInfo }) => state.alQuran
  );

  const openRepeatAyahDropdown = () => {
    vibrate();
    (
      repeatAyahRef?.current as unknown as { openDropdown: () => void }
    )?.openDropdown();
  };

  const repeatNumbers = Array.from({ length: 20 }, (_, index) => index + 1);

  const defaultIndex = repeatNumbers.findIndex((n) => n === repeatAyahPlaying);
  return (
    <Animatable.View
      duration={300}
      animation={isAudioPlayerOpen ? "slideInUp" : "slideInDown"}
      className={`absolute ${
        isAudioPlayerOpen ? "bottom-[0]" : "bottom-[-235]"
      } right-0 w-full py-2`}
      style={{
        backgroundColor: color.bgColor1,
        borderTopWidth: 6,
        borderColor: color.activeColor1,
        borderRadius: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderRightWidth: 0.0001,
        borderLeftWidth: 0.0001,
        borderBottomWidth: 0.0001,
      }}
    >
      <View className="w-full absolute top-[-20] flex items-center justify-center z-10">
        <View
          className="w-8 h-8 rounded-full"
          style={{
            backgroundColor: color.bgColor2,
            borderWidth: 2,
            borderColor: color.activeColor1,
            overflow: "hidden",
          }}
        >
          <Pressable
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
            className="flex items-center justify-center"
            onPress={() => {
              vibrate();
              setIsAudioPlayerOpen(!isAudioPlayerOpen);
            }}
          >
            <Ionicon
              name="chevron-up-outline"
              size={22}
              color={color.activeColor1}
              style={{
                transform: [{ rotate: isAudioPlayerOpen ? "180deg" : "0deg" }],
              }}
            />
          </Pressable>
        </View>
      </View>

      <View className="flex flex-row items-center justify-center gap-3 mt-3 mb-2 ml-1">
        <AudioPlayerIconButton name="play-back" onPress={playBack} />
        {!isWantToPlaySurah ? (
          <AudioPlayerIconButton
            name="play"
            onPress={() => playSurahOnlineOrOffline()}
          />
        ) : (
          <>
            {isSurahAudioLoading ? (
              <>
                <Loader size={22} className="mx-4" />
              </>
            ) : (
              <>
                {isSurahAudioPlaying ? (
                  <AudioPlayerIconButton
                    name="pause"
                    onPress={playOrPauseSurahAudio}
                  />
                ) : (
                  <AudioPlayerIconButton
                    name="play"
                    onPress={playOrPauseSurahAudio}
                  />
                )}
              </>
            )}
          </>
        )}

        <AudioPlayerIconButton name="play-forward" onPress={playNext} />
      </View>

      <View className="w-full flex flex-row items-center justify-between px-2">
        <CustomText
          className="font-bold"
          style={[{ color: color.activeColor1 }]}
        >
          {language === "bangla"
            ? convertEnglishToBanglaNumber((verseToScroll || 1).toString())
            : verseToScroll || 1}
        </CustomText>
        <CustomText
          className="font-bold"
          style={[{ color: color.activeColor1 }]}
        >
          {language === "bangla"
            ? convertEnglishToBanglaNumber(totalAyah.toString())
            : totalAyah}
        </CustomText>
      </View>

      <View className="px-2">
        <Slider
          disabled={!isAudioPlayerOpen}
          value={verseToScroll || 1}
          minimumValue={0}
          maximumTrackTintColor={color.activeColor2}
          minimumTrackTintColor={color.activeColor1}
          maximumValue={totalAyah}
          thumbStyle={{ backgroundColor: color.activeColor1 }}
          thumbTouchSize={{ width: 50, height: 50 }}
          step={1}
          trackStyle={{ height: 6 }}
          onSlidingComplete={(value) => {
            updateAudioOnSlidingChange(value[0]);
          }}
        />
      </View>

      <View className="">
        <CheckBoxWithLabel
          label={
            language === "bangla" ? "সম্পূর্ণ সুরা শুনুন" : "Play Full Surah"
          }
          value={isPlayFullSurah}
          actionName={setIsPlayFullSurah}
          vibration
        />
      </View>

      <View className="my-1">
        <Pressable onPress={openRepeatAyahDropdown}>
          <View className="flex flex-row justify-between items-center px-2 my-3">
            <CustomText
              style={[
                font.semiBoldFont,
                { fontSize: language === "bangla" ? 14 : 14.5 },
              ]}
            >
              {language === "bangla" ? "আয়াত পুনরাবৃত্তি করুন" : "Repeat Ayah"}
            </CustomText>
            <SelectBox
              ref={repeatAyahRef}
              data={repeatNumbers}
              dropdownWidth={100}
              defaultValueByIndex={defaultIndex}
              onSelect={(selectedItem) => {
                dispatch(setRepeatAyahPlaying(selectedItem));
              }}
              buttonTextAfterSelection={(item: number) => {
                return language === "bangla"
                  ? convertEnglishToBanglaNumber(item.toString())
                  : item;
              }}
              rowTextForSelection={(item: number) => {
                return language === "bangla"
                  ? convertEnglishToBanglaNumber(item.toString())
                  : item;
              }}
            />
          </View>
        </Pressable>
      </View>

      {isDownloadedSurah ? (
        <View>
          <Pressable onPress={deleteSurah}>
            <View className="px-2 flex flex-row justify-between items-center py-4">
              <CustomText style={[font.semiBoldFont]}>
                {language === "bangla"
                  ? "সূরাটি ডিলিট করুন"
                  : "Delete The Surah"}
              </CustomText>
              <FontAwesomeIcon name="trash" size={22} />
            </View>
          </Pressable>
        </View>
      ) : (
        <View>
          <Pressable onPress={downloadSurah}>
            <View className="px-2 flex flex-row justify-between items-center py-4">
              <CustomText style={[font.semiBoldFont]}>
                {language === "bangla"
                  ? "সূরাটি ডাউনলোড করুন"
                  : "Download The Surah"}
              </CustomText>
              <FontAwesomeIcon name="download" size={22} />
            </View>
          </Pressable>
        </View>
      )}
    </Animatable.View>
  );
};

export default AudioPlayer;
