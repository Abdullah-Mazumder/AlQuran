import { Asset } from "expo-asset";
import React, { useEffect, useState } from "react";
import CustomStatusBar from "src/components/CustomStatusBar";
import useNavigationBarBgColorHandler from "src/hooks/useNavigationBarBgColorHandler";
import useTheme from "src/hooks/useTheme";
import * as Font from "expo-font";
import { Image, Text, View } from "react-native";
import Loader from "src/components/Loader";
import * as FileSystem from "expo-file-system";

interface SplashProps {
  navigation: any;
}

const Splash: React.FC<SplashProps> = ({ navigation }) => {
  // Apply custom navigation bar background color handler
  useNavigationBarBgColorHandler();
  const [dataLoaded, setDataLoadesd] = useState(false);
  const [err, seterr] = useState("");
  const { color } = useTheme();

  const loadDatabase = async () => {
    const targetDir = `${FileSystem.documentDirectory}SQLite`;
    await FileSystem.makeDirectoryAsync(targetDir, { intermediates: true });

    const { uri } = Asset.fromModule(require("../../assets/database/data.db"));

    await FileSystem.downloadAsync(uri, `${targetDir}/data.db`);
  };

  const downloadFonts = async () => {
    const targetPath = `${FileSystem.documentDirectory}fonts`;
    await FileSystem.makeDirectoryAsync(targetPath, { intermediates: true });

    const fonts = {
      noorehuda: require("../../assets/fonts/noorehuda.ttf"),
      arabicHafezi: require("../../assets/fonts/arabicHafezi.ttf"),
      lateef: require("../../assets/fonts/lateef.ttf"),
      noorehidayat: require("../../assets/fonts/noorehidayat.ttf"),
      noorehira: require("../../assets/fonts/noorehira.ttf"),
      PDMS_Saleem: require("../../assets/fonts/PDMS_Saleem.ttf"),
      XBNiloofar: require("../../assets/fonts/XBNiloofar.ttf"),
      amiriQuran: require("../../assets/fonts/amiriQuran.ttf"),
      kitab: require("../../assets/fonts/kitab.ttf"),
      meQuran: require("../../assets/fonts/meQuran.ttf"),
      qalam: require("../../assets/fonts/qalam.ttf"),
      regularFont: require("../../assets/fonts/regularFont.ttf"),
      semiBoldFont: require("../../assets/fonts/semiBoldFont.ttf"),
      boldFont: require("../../assets/fonts/boldFont.ttf"),
    };

    for (const fontName in fonts) {
      const { uri: fontPath } = Asset.fromModule(fonts[fontName]);

      const destinationUri = `${targetPath}/${fontName}.ttf`;
      await FileSystem.downloadAsync(fontPath, destinationUri);
    }
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      noorehuda: {
        uri: `${FileSystem.documentDirectory}fonts/noorehuda.ttf`,
      },
      arabicHafezi: {
        uri: `${FileSystem.documentDirectory}fonts/arabicHafezi.ttf`,
      },
      lateef: { uri: `${FileSystem.documentDirectory}fonts/lateef.ttf` },
      noorehidayat: {
        uri: `${FileSystem.documentDirectory}fonts/noorehidayat.ttf`,
      },
      noorehira: {
        uri: `${FileSystem.documentDirectory}fonts/noorehira.ttf`,
      },
      PDMS_Saleem: {
        uri: `${FileSystem.documentDirectory}fonts/PDMS_Saleem.ttf`,
      },
      XBNiloofar: {
        uri: `${FileSystem.documentDirectory}fonts/XBNiloofar.ttf`,
      },
      amiriQuran: {
        uri: `${FileSystem.documentDirectory}fonts/amiriQuran.ttf`,
      },
      kitab: { uri: `${FileSystem.documentDirectory}fonts/kitab.ttf` },
      meQuran: {
        uri: `${FileSystem.documentDirectory}fonts/meQuran.ttf`,
      },
      qalam: { uri: `${FileSystem.documentDirectory}fonts/qalam.ttf` },
      regularFont: {
        uri: `${FileSystem.documentDirectory}fonts/regularFont.ttf`,
      },
      semiBoldFont: {
        uri: `${FileSystem.documentDirectory}fonts/semiBoldFont.ttf`,
      },
      boldFont: {
        uri: `${FileSystem.documentDirectory}fonts/boldFont.ttf`,
      },
    });
  };

  useEffect(() => {
    const fn = async () => {
      try {
        const { exists: isExistsAudioDir } = await FileSystem.getInfoAsync(
          `${FileSystem.documentDirectory}audio`
        );

        if (!isExistsAudioDir) {
          await FileSystem.makeDirectoryAsync(
            `${FileSystem.documentDirectory}audio`
          );
        }

        const { exists: isExistsDatabase } = await FileSystem.getInfoAsync(
          `${FileSystem.documentDirectory}SQLite/data.db`
        );

        if (!isExistsDatabase) {
          await loadDatabase();
        }

        const { exists: isExistsFontsDir } = await FileSystem.getInfoAsync(
          `${FileSystem.documentDirectory}fonts`
        );

        if (!isExistsFontsDir) {
          await downloadFonts();
        }

        await loadFonts();

        setDataLoadesd(true);
      } catch (error) {
        seterr(error.message);
      }
    };

    fn();
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      navigation.replace("Home");
    }
  }, [dataLoaded]);

  return (
    <>
      {err ? (
        <>
          <Text className="text-xl">{err}</Text>
        </>
      ) : (
        <>
          <View
            style={{
              backgroundColor: color.bgColor2,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CustomStatusBar />

            <Image
              className="w-48 h-48"
              source={require("../../assets/image/brand.png")}
            />
          </View>

          <View style={{ backgroundColor: color.bgColor2 }} className="pb-10">
            <Loader />
          </View>
        </>
      )}
    </>
  );
};

export default Splash;
