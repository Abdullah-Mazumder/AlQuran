import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import useTheme from "src/hooks/useTheme";
import useGlobalStyle from "src/hooks/useGlobalStyle";
import HomeTopSection from "src/components/HomeTopSection";
import vibrate from "src/utils/vibratie";
import CustomText from "src/components/CustomText";
import { font } from "src/utils/fonts";
import FontAwesomeIcon from "src/components/FontAwesomeIcon";
import { ApplicationState } from "src/types/types";

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { color, isDark } = useTheme();
  const { borderStyle } = useGlobalStyle();
  const { language } = useSelector(
    (state: { app: ApplicationState }) => state.app
  );
  return (
    <>
      <HomeTopSection />
      <ScrollView
        style={{ flex: 1, backgroundColor: color.bgColor2 }}
        className="p-3"
      >
        <View className="flex flex-row flex-wrap gap-2 justify-center">
          <TouchableOpacity
            className="flex items-center justify-center py-2 px-1"
            style={borderStyle.border}
            onPress={() => {
              vibrate();
              navigation.navigate("NobleQuran");
            }}
          >
            <View
              className="w-12 h-12 rounded-md flex items-center justify-center"
              style={{ backgroundColor: color.bgColor1 }}
            >
              {isDark ? (
                <>
                  <Image
                    source={require("../../assets/image/quran_dark.png")}
                    className="w-8 h-8"
                  />
                </>
              ) : (
                <>
                  <Image
                    source={require("../../assets/image/quran_light.png")}
                    className="w-8 h-8"
                  />
                </>
              )}
            </View>
            <CustomText
              style={[
                font.semiBoldFont,
                { fontSize: language === "bangla" ? 14 : 14.5, marginTop: 3 },
              ]}
              className="text-center"
            >
              {language === "bangla" ? "আল-কুরআন" : "Al-Quran"}
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex items-center justify-center p-2"
            style={borderStyle.border}
            onPress={() => {
              vibrate();
              navigation.navigate("Tafsir");
            }}
          >
            <View
              className="w-12 h-12 rounded-md flex items-center justify-center"
              style={{ backgroundColor: color.bgColor1 }}
            >
              {isDark ? (
                <>
                  <Image
                    source={require("../../assets/image/kitab_dark.png")}
                    className="w-8 h-6"
                  />
                </>
              ) : (
                <>
                  <Image
                    source={require("../../assets/image/kitab_light.png")}
                    className="w-8 h-6"
                  />
                </>
              )}
            </View>
            <CustomText
              style={[
                font.semiBoldFont,
                { fontSize: language === "bangla" ? 14 : 14.5, marginTop: 3 },
              ]}
              className="text-center"
            >
              {language === "bangla" ? "তাফসীর" : "Tafseer"}
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex items-center justify-center p-2"
            style={borderStyle.border}
            onPress={() => {
              vibrate();
              navigation.navigate("Hadis");
            }}
          >
            <View
              className="w-12 h-12 rounded-md flex items-center justify-center"
              style={{ backgroundColor: color.bgColor1 }}
            >
              {isDark ? (
                <>
                  <Image
                    source={require("../../assets/image/hadith_dark.png")}
                    className="w-8 h-6"
                  />
                </>
              ) : (
                <>
                  <Image
                    source={require("../../assets/image/hadith_light.png")}
                    className="w-8 h-6"
                  />
                </>
              )}
            </View>
            <CustomText
              style={[
                font.semiBoldFont,
                { fontSize: language === "bangla" ? 14 : 14.5, marginTop: 3 },
              ]}
              className="text-center mx-2"
            >
              {language === "bangla" ? "হাদিস" : "Hadith"}
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex items-center justify-center p-2"
            style={borderStyle.border}
            onPress={() => {
              vibrate();
              navigation.navigate("Doa");
            }}
          >
            <View
              className="w-12 h-12 rounded-md flex items-center justify-center"
              style={{ backgroundColor: color.bgColor1 }}
            >
              {isDark ? (
                <>
                  <Image
                    source={require("../../assets/image/dua_dark.png")}
                    className="w-8 h-6"
                  />
                </>
              ) : (
                <>
                  <Image
                    source={require("../../assets/image/dua_light.png")}
                    className="w-8 h-6"
                  />
                </>
              )}
            </View>
            <CustomText
              style={[
                font.semiBoldFont,
                { fontSize: language === "bangla" ? 14 : 14.5, marginTop: 3 },
              ]}
              className="text-center mx-2"
            >
              {language === "bangla" ? "দো’আ" : "Doa"}
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex items-center justify-center p-2"
            style={borderStyle.border}
            onPress={() => {
              vibrate();
              navigation.navigate("MainSettings");
            }}
          >
            <View
              className="w-12 h-12 rounded-md flex items-center justify-center"
              style={{ backgroundColor: color.bgColor1 }}
            >
              <Ionicon
                name="settings-outline"
                size={30}
                color={color.txtColor}
              />
            </View>
            <CustomText
              style={[
                font.semiBoldFont,
                { fontSize: language === "bangla" ? 14 : 14.5, marginTop: 3 },
              ]}
              className="text-center mx-2"
            >
              {language === "bangla" ? "সেটিংস" : "Settings"}
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex items-center justify-center p-2"
            style={borderStyle.border}
            onPress={() => {
              vibrate();
              navigation.navigate("AboutMe");
            }}
          >
            <View
              className="w-12 h-12 rounded-md flex items-center justify-center"
              style={{ backgroundColor: color.bgColor1 }}
            >
              <Ionicon name="person" size={30} color={color.txtColor} />
            </View>
            <CustomText
              style={[
                font.semiBoldFont,
                { fontSize: language === "bangla" ? 14 : 14.5, marginTop: 3 },
              ]}
              className="text-center mx-2"
            >
              {language === "bangla" ? "প্রণেতা" : "Author"}
            </CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
