import { useEffect, useState } from "react";
import * as RNFS from "react-native-fs";
import { useSelector } from "react-redux";
import { ApplicationState } from "src/types/types";

const useBase64Font = () => {
  const [base64TextFont, setBase64TextFont] = useState(null);
  const [base64WaqphFont, setBase64WaqphFont] = useState(null);
  const { arabicFont } = useSelector(
    (state: { app: ApplicationState }) => state.app
  );

  const { DocumentDirectoryPath, readFile } = RNFS;

  useEffect(() => {
    const fonts = {
      noorehuda: "noorehuda.ttf",
      arabicHafezi: "arabicHafezi.ttf",
      lateef: "lateef.ttf",
      noorehidayat: "noorehidayat.ttf",
      noorehira: "noorehira.ttf",
      PDMS_Saleem: "PDMS_Saleem.ttf",
      XBNiloofar: "XBNiloofar.ttf",
      amiriQuran: "amiriQuran.ttf",
      kitab: "kitab.ttf",
      meQuran: "meQuran.ttf",
      qalam: "qalam.ttf",
    };

    const loadFontData = async () => {
      try {
        const textFont = await readFile(
          `${DocumentDirectoryPath}/fonts/${fonts[arabicFont]}`,
          "base64"
        );
        setBase64TextFont(textFont);

        const waqphFont = await readFile(
          `${DocumentDirectoryPath}/fonts/${fonts.lateef}`,
          "base64"
        );
        setBase64WaqphFont(waqphFont);
      } catch (error) {
        console.error("Error reading font file:", error);
      }
    };

    loadFontData();
  }, [arabicFont]);
  return { base64TextFont, base64WaqphFont };
};

export default useBase64Font;
