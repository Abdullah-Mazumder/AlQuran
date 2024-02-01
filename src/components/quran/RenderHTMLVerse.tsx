import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { useSelector } from "react-redux";
import { AlQuranInfo, ApplicationState } from "src/types/types";
import useTheme from "src/hooks/useTheme";
import { tajweedCssStyle } from "src/utils/tajweedCssStyle";
import useBase64Font from "src/hooks/useBase64Font";
import { useIsFocused } from "@react-navigation/native";

interface RenderHTMLVerseProps {
  verseHtml: string;
  playWord: (audioName: string) => void;
  handleWordMeaning: (position: string) => void;
  verseId?: number;
  webViewRefs?: React.RefObject<WebView>[];
}

const RenderHTMLVerse: React.FC<RenderHTMLVerseProps> = ({
  verseHtml,
  playWord,
  handleWordMeaning,
  verseId,
  webViewRefs,
}) => {
  verseHtml = verseHtml.replace(/ٱ/g, "ا").replace(/اْ/g, "ا");
  const [height, setHeight] = useState(100);
  const isFocused = useIsFocused();
  const { base64TextFont, base64WaqphFont } = useBase64Font();
  const { isEnableTajweed } = useSelector(
    (state: { alQuran: AlQuranInfo }) => state.alQuran
  );
  const { arabicTextSize } = useSelector(
    (state: { app: ApplicationState }) => state.app
  );
  const { color } = useTheme();
  const webviewRef = useRef(null);

  const html = `
    <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>

      @font-face { font-family: "fontForText"; src: url(data:font/truetype;charset=utf-8;base64,${base64TextFont}) format("truetype"); }

      @font-face { font-family: "fontForWaqph"; src: url(data:font/truetype;charset=utf-8;base64,${base64WaqphFont}) format("truetype"); }
  
        body {
          font-size: ${arabicTextSize}px;
          direction: rtl;
          display: flex;
          flex-wrap: wrap;
          font-family: fontForText;
          background-color: ${color.bgColor2};
          padding-bottom: 20px;
          padding-right: 15px;
          padding-left: 15px;
          color: ${color.txtColor};
        }

        div.waqph {
          font-family: fontForWaqph;
          font-size: ${Math.min(arabicTextSize, 35)}px;
          margin-top: ${arabicTextSize > 35 ? 10 : 5}px;
          margin-right: 10px;
        }

        .active {
          color: ${color.activeColor1};
          // background-color: ${color.activeColor2};
        }

        ${isEnableTajweed ? tajweedCssStyle : ""}
      </style>
    </head>
    <body>
    ${verseHtml}
    <script>
        setTimeout(function() { 
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'scrollHeight', value: document.body.scrollHeight }));
        }, 50);

        const words = document.querySelectorAll(".word");

        words.forEach((word) => {
          word.addEventListener("click", () => {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'audioName', value: word.getAttribute("data-audio") }));
          });

          word.addEventListener("click", () => {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'wordPosition', value: word.classList[1] }));
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

  useEffect(() => {
    if (webviewRef && webviewRef.current && verseId) {
      webViewRefs[verseId - 1] = webviewRef.current;
    }
  }, [webviewRef, isFocused, verseId]);

  const onWebViewMessage = (event: WebViewMessageEvent) => {
    const { type, value } = JSON.parse(event.nativeEvent.data) as unknown as {
      type: string;
      value: string;
    };

    if (type === "scrollHeight") setHeight(Number(value));

    if (type === "audioName") playWord(value);

    if (type === "wordPosition") handleWordMeaning(value);
  };

  return (
    <View
      style={{ overflow: "hidden", height, backgroundColor: color.bgColor2 }}
      renderToHardwareTextureAndroid={true}
    >
      <WebView
        ref={webviewRef}
        showsVerticalScrollIndicator={false}
        source={{ html, baseUrl: "" }}
        originWhitelist={["*"]}
        onError={(syntheticEvent) =>
          console.error(syntheticEvent.nativeEvent.description)
        }
        onMessage={onWebViewMessage}
        // injectedJavaScript={js}
      />
    </View>
  );
};

export default React.memo(RenderHTMLVerse);
