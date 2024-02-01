import useTheme from "./useTheme";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

// Define the useNavigationBarBgColorHandler hook
const useNavigationBarBgColorHandler = () => {
  // Get the color object from the useTheme hook
  const { color } = useTheme();

  // Effect to set the navigation bar background color when the color changes
  useEffect(() => {
    const setBackgroundColor = async () => {
      try {
        // Check if color and bgColor1 are defined before setting the navigation bar color
        if (color && color.bgColor1) {
          await NavigationBar.setBackgroundColorAsync(color.bgColor1);
        } else {
          console.warn("Color or bgColor1 is undefined.");
        }
      } catch (error) {
        console.error("Failed to set navigation bar color:", error);
      }
    };

    // Call the function to set the background color
    setBackgroundColor();
  }, [color]); // Re-run the effect when the color changes
};

export default useNavigationBarBgColorHandler;
