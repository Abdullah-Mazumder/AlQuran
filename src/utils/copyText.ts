import * as Clipboard from "expo-clipboard";

/**
 * Copies the given text to the clipboard using Expo Clipboard API.
 * @param {string} text - The text to be copied to the clipboard.
 */
export default async function copyTextToClipboard(text: string): Promise<void> {
  try {
    // Use Expo Clipboard API to set the provided text to the clipboard
    await Clipboard.setStringAsync(text);
  } catch (error) {
    // Handle any errors that may occur during clipboard operation
    console.error("Error copying text to clipboard:", error);
    throw error; // Re-throw the error to be handled by the caller if needed
  }
}
