import { Vibration } from "react-native";

/**
 * Vibrates the device for the specified duration using React Native's Vibration API.
 * @param {number} duration - The duration of the vibration in milliseconds. Default is 40 milliseconds.
 */
const vibrate = (duration: number = 40): void => {
  try {
    // Trigger the device vibration with the specified duration
    Vibration.vibrate(duration);
  } catch (error) {
    // Handle any errors that may occur during vibration
    console.error("Error during vibration:", error);
  }
};

export default vibrate;
