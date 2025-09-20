// Musical pitch classes in chromatic order
export const PITCH_CLASSES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;

export type PitchClass = typeof PITCH_CLASSES[number];

// Helper to get the index of a pitch class
export const getPitchClassIndex = (note: string): number => {
  return PITCH_CLASSES.indexOf(note as PitchClass);
};

// Helper to get pitch class from index (with modulo for wrapping)
export const getPitchClassFromIndex = (index: number): PitchClass => {
  const normalizedIndex = ((index % 12) + 12) % 12;
  return PITCH_CLASSES[normalizedIndex];
};