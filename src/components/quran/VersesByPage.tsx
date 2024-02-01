import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  AlQuranInfo,
  ApplicationState,
  VersesByPageType,
} from "src/types/types";
import BismillahImage from "../BismillahImage";
import QuranInfoTag from "./QuranInfoTag";
import useLanguage from "src/hooks/useLanguage";
import useTheme from "src/hooks/useTheme";
import convertEnglishToBanglaNumber from "src/utils/convertEnglishToBanglaNumber";
import { useSelector } from "react-redux";
import useBase64Font from "src/hooks/useBase64Font";
import { tajweedCssStyle } from "src/utils/tajweedCssStyle";
import WebView, { WebViewMessageEvent } from "react-native-webview";

interface VersesByPage {
  versesByPage: VersesByPageType;
  index: number;
  surahId: number;
}

const VersesByPage: React.FC<VersesByPage> = ({
  versesByPage,
  index,
  surahId,
}) => {
  const { color } = useTheme();
  const language = useLanguage();
  const [height, setHeight] = useState(1200);
  const { base64TextFont } = useBase64Font();
  const { isEnableTajweed } = useSelector(
    (state: { alQuran: AlQuranInfo }) => state.alQuran
  );
  const { arabicTextSize } = useSelector(
    (state: { app: ApplicationState }) => state.app
  );
  const { html, juz, manzil, page, ruku } = versesByPage;

  const styledHtml = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>

    @font-face { font-family: "fontForText"; src: url(data:font/truetype;charset=utf-8;base64,${base64TextFont}) format("truetype"); }

      body {
        font-size: ${arabicTextSize}px;
        direction: rtl;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: justify;
        flex-wrap: wrap;
        font-family: fontForText;
        background-color: ${color.bgColor2};
        padding-bottom: 20px;
        padding-right: 15px;
        padding-left: 15px;
        color: ${color.txtColor};
      }

      div.waqph {
        display: none;
      }

      .verseId {
        display: flex;
        padding: 2px 4px;
        padding-bottom: 0;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: ${color.txtColor};
        margin: 0 5px;
        font-weight: 700;
        font-family: monospace;
        border: 1.5px solid ${color.txtColor};
        border-radius: 40%;
      }

      .active {
        color: ${color.activeColor1};
        // background-color: ${color.activeColor2};
      }

      ${isEnableTajweed ? tajweedCssStyle : ""}
    </style>
  </head>
  <body>
  ${html}
  <script>
      setTimeout(function() { 
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'scrollHeight', value: document.body.scrollHeight }));
      }, 50);

      const words = document.querySelectorAll(".word");

      words.forEach((word) => {
        word.addEventListener("click", () => {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'audioName', value: word.getAttribute("data-audio") }));
        });

        word.addEventListener("mousedown", () => {
          word.classList.add("active");

          setTimeout(() => {
            word.classList.remove("active");
          }, 1000)
        });
      });

      function removeHighlight() {
        const activeWords = document.getElementsByClassName("active");
        if (activeWords.length > 0) activeWords[0].classList.remove("active");
      }

      function highlightWord(s, v, w) {
        const activeWord = document.getElementsByClassName("active");
        if (activeWord.length > 0) activeWord[0].classList.remove("active");

        const wordClass = s + "_" + v + "_" + w;

        const word = document.getElementsByClassName(wordClass);
        word[0].classList.add("active");
      }
  </script>
  </body>
</html>
  `;

  const onWebViewMessage = (event: WebViewMessageEvent) => {
    const { type, value } = JSON.parse(event.nativeEvent.data) as unknown as {
      type: string;
      value: string;
    };

    if (type === "scrollHeight") setHeight(Number(value));

    // if (type === "audioName") playWord(value);

    // if (type === "wordPosition") handleWordMeaning(value);
  };

  return (
    <View>
      {surahId !== 1 && index === 0 && (
        <View className="flex items-center my-1">
          <BismillahImage />
        </View>
      )}

      <View
        className={`w-full flex flex-row items-center justify-center mb-1 py-1`}
        style={{
          backgroundColor: color.bgColor1,
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderColor: color.activeColor1,
          borderRadius: 20,
        }}
      >
        <QuranInfoTag
          title={
            language === "bangla"
              ? `পৃষ্ঠা - ${convertEnglishToBanglaNumber(page.toString())}`
              : `Page - ${page}`
          }
        />
        <QuranInfoTag
          title={
            language === "bangla"
              ? `পারা - ${convertEnglishToBanglaNumber(juz.toString())}`
              : `Juz - ${juz}`
          }
        />
        <QuranInfoTag
          title={
            language === "bangla"
              ? `রুকু - ${convertEnglishToBanglaNumber(ruku.toString())}`
              : `Ruku - ${ruku}`
          }
        />
        <QuranInfoTag
          title={
            language === "bangla"
              ? `মঞ্জিল - ${convertEnglishToBanglaNumber(manzil.toString())}`
              : `Page - ${manzil}`
          }
        />
      </View>

      <View
        style={{
          overflow: "hidden",
          height,
          backgroundColor: color.bgColor2,
        }}
        renderToHardwareTextureAndroid={true}
      >
        <WebView
          source={{ html: styledHtml }}
          originWhitelist={["*"]}
          onMessage={onWebViewMessage}
        />
      </View>
    </View>
  );
};

export default VersesByPage;
