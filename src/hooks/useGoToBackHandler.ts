import { useEffect } from "react";
import { BackHandler } from "react-native";
import {
  useIsFocused,
  useNavigation,
  CommonActions,
} from "@react-navigation/native";

const useGoToBackHandler = (screenName?: string) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          // Navigate to the specified screen or "Home" if no screenName is provided
          navigation.dispatch(
            CommonActions.navigate({ name: screenName || "Home" })
          );

          // Return true to prevent the default behavior (e.g., navigating back)
          return true;
        }
      );

      return () => {
        // Cleanup: Remove the event listener when the component is unmounted or loses focus
        backHandler.remove();
      };
    }
  }, [isFocused, navigation, screenName]);
};

export default useGoToBackHandler;
