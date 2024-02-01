function getWordAudioName(
  surahNumber: number,
  verseNumber: number,
  wordNumber: number
): string {
  const formattedSurah = String(surahNumber).padStart(3, "0");
  const formattedVerse = String(verseNumber).padStart(3, "0");
  const formattedWord = String(wordNumber).padStart(3, "0");

  return `${formattedSurah}_${formattedVerse}_${formattedWord}.mp3`;
}

export default getWordAudioName;
