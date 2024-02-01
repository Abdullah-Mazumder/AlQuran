import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["In React 18, SSRProvider is not necessary and is a noop"]);
import Home from "./screens/Home";
import AboutMe from "./screens/AboutMe";
import HadisHome from "./screens/hadis/HadisHome";
import TafsirHome from "./screens/tafsir/TafsirHome";
import DoaHome from "./screens/doa/DoaHome";
import MainSettings from "./screens/MainSettings";
import QuranBottomTab from "./tabs/QuranBottomTab";
import Splash from "./screens/Splash";
import ShortTafseer from "./screens/quran/ShortTafseer";
import QuranSubject from "./screens/quran/QuranSubject";
import MushafQuran from "./screens/quran/MushafQuran";

const Stack = createNativeStackNavigator();

const Application = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AboutMe" component={AboutMe} />
        <Stack.Screen name="NobleQuran" component={QuranBottomTab} />
        <Stack.Screen name="Hadis" component={HadisHome} />
        <Stack.Screen name="Tafsir" component={TafsirHome} />
        <Stack.Screen name="Doa" component={DoaHome} />
        <Stack.Screen name="MainSettings" component={MainSettings} />
        <Stack.Screen name="ShortTafseer" component={ShortTafseer} />
        <Stack.Screen name="QuranSubject" component={QuranSubject} />
        <Stack.Screen name="MushafQuran" component={MushafQuran} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Application;
