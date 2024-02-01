import { View, ScrollView, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import useTheme from "src/hooks/useTheme";
import CustomText from "src/components/CustomText";
import { font } from "src/utils/fonts";
import useLanguage from "src/hooks/useLanguage";
import Ionicon from "react-native-vector-icons/Ionicons";
import Loader from "src/components/Loader";
import useGetTafseerData from "src/hooks/dataRelated/useGetTafseerData";
import { useSelector } from "react-redux";
import { AlQuranInfo, ApplicationState } from "src/types/types";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import useBase64Font from "src/hooks/useBase64Font";
import { WebViewMessageEvent, WebView } from "react-native-webview";
import { tajweedCssStyle } from "src/utils/tajweedCssStyle";

interface RouteParams {
  surahId: number;
  verseId: number;
}

const ShortTafseer = () => {
  const route = useRoute();
  const systemFonts = [...defaultSystemFonts, "regularFont"];
  const { width } = useWindowDimensions();
  const { base64TextFont, base64WaqphFont } = useBase64Font();
  const { surahId, verseId } = route.params as RouteParams;
  const [height, setHeight] = useState(100);
  const { color } = useTheme();
  const language = useLanguage();
  const { data, isLoading } = useGetTafseerData(surahId, verseId);
  const {
    arabicTextSize,
    banglaTextSize,
    englishTextSize,
    isShowBanglaText,
    isShowEnglishText,
  } = useSelector((state: { app: ApplicationState }) => state.app);
  const { bnTranslator, isEnableTajweed } = useSelector(
    (state: { alQuran: AlQuranInfo }) => state.alQuran
  );

  const { meaningEn, tafseer, verseHtml } = data;
  const tafseerHtml = tafseer?.replace(/\n/g, "<br/>");

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
          color: ${color.txtColor};
        }

        div.waqph {
          font-family: fontForWaqph;
          font-size: ${Math.min(arabicTextSize, 35)}px;
          margin-top: ${arabicTextSize > 35 ? 20 : 5}px;
          margin-right: 10px;
        }

        ${isEnableTajweed ? tajweedCssStyle : ""}
      </style>
    </head>
    <body>
    ${verseHtml}

    <script>
      setTimeout(function() {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'scrollHeight', value: document.body.scrollHeight }));
      }, 300);
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
  };

  return (
    <>
      <View
        style={{ backgroundColor: color.bgColor1 }}
        className="py-2 flex justify-center items-center"
      >
        <View className="flex flex-row items-center justify-center gap-2">
          <CustomText
            style={[{ color: color.activeColor1 }, font.boldFont]}
            className="text-[20px] -mb-1"
          >
            {language === "bangla" ? "সংক্ষিপ্ত তাফসীর" : "Short Tafseer"}
          </CustomText>
          <View className="-mb-[4px]">
            <Ionicon name="book" size={22} color={color.activeColor1} />
          </View>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: color.bgColor2 }}>
        {isLoading ? (
          <View className="flex w-full h-full items-center justify-center">
            <Loader />
          </View>
        ) : (
          <View className="mx-3">
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  overflow: "hidden",
                  backgroundColor: color.bgColor2,
                  height,
                }}
                renderToHardwareTextureAndroid={true}
              >
                <WebView
                  source={{ html, baseUrl: "" }}
                  originWhitelist={["*"]}
                  onMessage={onWebViewMessage}
                  style={{ overflow: "hidden", height }}
                  showsVerticalScrollIndicator={false}
                />
              </View>

              <View className="my-3">
                {isShowBanglaText ? (
                  <CustomText
                    style={[font.regularFont, { fontSize: banglaTextSize }]}
                  >
                    {data[bnTranslator]}
                  </CustomText>
                ) : null}

                {isShowEnglishText ? (
                  <CustomText
                    style={[font.regularFont, { fontSize: englishTextSize }]}
                  >
                    {meaningEn}
                  </CustomText>
                ) : null}
              </View>

              {tafseerHtml ? (
                <RenderHTML
                  source={{
                    html: `<div>${tafseerHtml}</div>`,
                  }}
                  tagsStyles={{
                    div: {
                      fontSize: banglaTextSize,
                      fontFamily: "regularFont",
                      color: color.txtColor,
                    },
                  }}
                  contentWidth={width}
                  systemFonts={systemFonts}
                />
              ) : (
                <CustomText
                  style={{
                    fontSize: banglaTextSize,
                    fontFamily: "regularFont",
                    color: color.txtColor,
                  }}
                >
                  এই আয়াতের তাফসীর পরবর্তিতে আলোচনা করা হয়েছে।
                </CustomText>
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </>
  );
};

export default ShortTafseer;
