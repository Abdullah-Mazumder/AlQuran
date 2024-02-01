/**
 * Converts English numerals to Bangla numerals in a given string.
 * @param number - The input string containing English numerals.
 * @returns A new string with Bangla numerals.
 */
function convertEnglishToBanglaNumber(number: string): string {
  if (!number) return "";
  // Define arrays for mapping English numerals to Bangla numerals
  const banglaNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const englishNumerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  // Initialize an empty string to store the converted Bangla numerals
  let banglaNumber = "";

  // Loop through each character in the input string
  for (let i = 0; i < number.length; i++) {
    // Get the current digit at the current position
    let digit = number.charAt(i);

    // Find the index of the digit in the English numerals array
    let englishIndex = englishNumerals.indexOf(digit);

    // Check if the digit is found in the English numerals array
    if (englishIndex !== -1) {
      // Append the corresponding Bangla numeral to the result string
      banglaNumber += banglaNumerals[englishIndex];
    } else {
      // If the digit is not found in the English numerals array, keep it unchanged
      banglaNumber += digit;
    }
  }

  // Return the final string with Bangla numerals
  return banglaNumber;
}

export default convertEnglishToBanglaNumber;
