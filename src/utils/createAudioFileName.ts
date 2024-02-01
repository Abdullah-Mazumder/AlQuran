const createAudioFileName = (chapter: number, reciter: string) => {
  return `chapter_${chapter}_reciter_${reciter}.mp3`;
};

export default createAudioFileName;

export const createAudioTimingFileName = (chapter: number, reciter: string) => {
  return `chapter_${chapter}_reciter_${reciter}_timing.json`;
};
