import * as MediaLibrary from "expo-media-library";

/**
 * Check and request storage permissions for accessing the media library using Expo MediaLibrary API.
 * @returns {Promise<boolean>} - A Promise that resolves to true if permissions are granted, false otherwise.
 */
const getStoragePermissions = async (): Promise<boolean> => {
  try {
    // Check if the app has permission to access the media library
    const { status } = await MediaLibrary.getPermissionsAsync();

    // If permission is not granted, request permission from the user
    if (status !== "granted") {
      const { status: newStatus } =
        await MediaLibrary.requestPermissionsAsync();

      // If the new status is still not granted, return false
      if (newStatus !== "granted") {
        return false;
      }
    }

    // Permissions are granted
    return true;
  } catch (error) {
    // Handle any errors that may occur during permission check/request
    console.error("Error checking or requesting storage permissions:", error);
    throw error; // Re-throw the error to be handled by the caller if needed
  }
};

export default getStoragePermissions;
