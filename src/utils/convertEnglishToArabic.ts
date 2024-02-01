/**
 * Converts a given English number string to its Arabic numeral representation.
 * @param {string} number - The English number string to be converted.
 * @returns {string} - The Arabic numeral representation of the input number.
 */
function convertEnglishToArabicNumber(number: string): string {
  // Define arrays for Arabic and English numerals
  const arabicNumerals: string[] = [
    "٠",
    "١",
    "٢",
    "٣",
    "٤",
    "٥",
    "٦",
    "٧",
    "٨",
    "٩",
  ];
  const englishNumerals: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  // Initialize an empty string to store the converted Arabic number
  let arabicNumber: string = "";

  // Iterate through each digit in the input number
  for (let i = 0; i < number.length; i++) {
    // Extract the current digit
    let digit: string = number.charAt(i);

    // Find the index of the current digit in the English numerals array
    let englishIndex: number = englishNumerals.indexOf(digit);

    // Check if the digit is found in the English numerals array
    if (englishIndex !== -1) {
      // Append the corresponding Arabic numeral to the result string
      arabicNumber += arabicNumerals[englishIndex];
    } else {
      // If the digit is not found in the English numerals array, append it as is
      arabicNumber += digit;
    }
  }

  // Return the final converted Arabic number
  return arabicNumber;
}

// Export the function for external use
export default convertEnglishToArabicNumber;
