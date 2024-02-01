import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { BackHandler } from "react-native";
import showToast from "src/utils/showToast";

const useExitApp = () => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      let timer: NodeJS.Timeout | null;

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if (timer) {
            // If the timer is set (indicating the first press), exit the app
            BackHandler.exitApp();
          } else {
            // Set a timer for 500 milliseconds to capture the second press
            timer = setTimeout(() => {
              // After 500 milliseconds, reset the timer
              timer = null;
            }, 500);

            // Display a toast message indicating the need for a double press
            showToast("Double Press To Exit!");
          }

          // Return true to prevent the default behavior (e.g., navigating back)
          return true;
        }
      );

      return () => {
        // Cleanup: Remove the event listener when the component is unmounted or loses focus
        backHandler.remove();
      };
    }
  }, [isFocused]);

  // Return an empty object if no specific properties are needed
  return {};
};

export default useExitApp;
