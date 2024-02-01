import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicon from "react-native-vector-icons/Ionicons";

import TabsIcon from "./TabsIcon";
import SingleSurah from "../screens/quran/SingleSurah";
import BookMarkedList from "../screens/quran/BookMarkedList";
import QuranHome from "../screens/quran/QuranHome";
import FavouriteSurahList from "../screens/quran/FavouriteSurahList";
import QuranSettings from "../screens/quran/QuranSettings";
import useTheme from "../hooks/useTheme";
import SubjectWiseQuran from "src/screens/quran/SubjectWiseQuran";
import MushafSurahList from "src/screens/quran/MushafSurahList";

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

const QuranBottomTab: React.FC = () => {
  // Use the useTheme hook to get the color from the theme
  const { color } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="QuranHome"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 50,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: color.bgColor1,
        },
      }}
    >
      {/* Define each tab screen with its component and options */}
      <Tab.Screen
        name="SingleSurah"
        component={SingleSurah}
        options={{
          tabBarIcon: ({ color: _color, focused }) => (
            <TabsIcon name="book-open" focused={focused} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="BookMarkedList"
        component={BookMarkedList}
        options={{
          tabBarIcon: ({ color: _color, focused }) => (
            <TabsIcon name="bookmark" solid focused={focused} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="FavouriteSurahList"
        component={FavouriteSurahList}
        options={{
          tabBarIcon: ({ color: _color, focused }) => (
            <TabsIcon name="heart" solid focused={focused} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="QuranHome"
        component={QuranHome}
        options={{
          tabBarIcon: ({ color: _color, focused }) => (
            <TabsIcon name="home" focused={focused} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="MushafSurahList"
        component={MushafSurahList}
        options={{
          tabBarIcon: ({ color: _color, focused }) => (
            <TabsIcon name="quran" focused={focused} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="SubjectWiseQuran"
        component={SubjectWiseQuran}
        options={{
          tabBarIcon: ({ color: _color, focused }) => (
            <TabsIcon name="book" focused={focused} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="QuranSettings"
        component={QuranSettings}
        options={{
          tabBarIcon: ({ color: _color, focused }) => (
            <Ionicon
              name="settings"
              size={20}
              color={focused ? color.activeColor1 : color.txtColor}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default QuranBottomTab;
