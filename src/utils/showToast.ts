import { ToastAndroid } from "react-native";

/**
 * Displays a toast message using React Native's ToastAndroid.
 * @param {string} title - The message to be displayed in the toast. Default is "Something went wrong."
 */
const showToast = (title: string = "Something went wrong."): void => {
  try {
    // Display the toast message with specified parameters
    ToastAndroid.showWithGravityAndOffset(
      title,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      50
    );
  } catch (error) {
    // Handle any errors that may occur during toast display
    console.error("Error displaying toast:", error);
    // You can choose to re-throw the error or handle it as needed
    // throw error;
  }
};

export default showToast;
