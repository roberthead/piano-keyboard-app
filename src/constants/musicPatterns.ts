// Central definition of musical scale, mode, and chord interval patterns.
// Intervals are semitone offsets from the root (0-based) within one octave.

export type PatternIntervals = number[];

export const PATTERNS: Record<string, PatternIntervals> = {
  // Scales & Modes
  "Major Scale": [0, 2, 4, 5, 7, 9, 11],
  "Aeolian Mode / Natural Minor": [0, 2, 3, 5, 7, 8, 10],
  "Harmonic Minor Scale": [0, 2, 3, 5, 7, 8, 11],
  "Melodic Minor Scale": [0, 2, 3, 5, 7, 9, 11],
  "Dorian Mode": [0, 2, 3, 5, 7, 9, 10],
  "Phrygian Mode": [0, 1, 3, 5, 7, 8, 10],
  "Lydian Mode": [0, 2, 4, 6, 7, 9, 11], // corrected Lydian (#4)
  "Mixolydian Mode": [0, 2, 4, 5, 7, 9, 10],
  "Locrian Mode": [0, 1, 3, 5, 6, 8, 10],
  "Pentatonic Major": [0, 2, 4, 7, 9],
  "Pentatonic Minor": [0, 3, 5, 7, 10],
  "Blues Scale": [0, 3, 5, 6, 7, 10],
  "Chromatic Scale": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],

  // Chords
  "Major Triad": [0, 4, 7],
  "Minor Triad": [0, 3, 7],
  "Diminished Triad": [0, 3, 6],
  "Augmented Triad": [0, 4, 8],
  "Major 7th": [0, 4, 7, 11],
  "Dominant 7th": [0, 4, 7, 10],
  "Minor 7th": [0, 3, 7, 10],
  "Half-Diminished 7th": [0, 3, 6, 10],
  "Fully-Diminished 7th": [0, 3, 6, 9],
};

// Grouping metadata for UI dropdown rendering.
export interface PatternGroup {
  label: string;
  options: { value: string; label: string }[];
}

export const PATTERN_GROUPS: PatternGroup[] = [
  {
    label: "Scales & Modes",
    options: [
      { value: "Major Scale", label: "Major Scale" },
      {
        value: "Aeolian Mode / Natural Minor",
        label: "Natural Minor (Aeolian)",
      },
      { value: "Harmonic Minor Scale", label: "Harmonic Minor Scale" },
      { value: "Melodic Minor Scale", label: "Melodic Minor Scale" },
      { value: "Dorian Mode", label: "Dorian Mode" },
      { value: "Phrygian Mode", label: "Phrygian Mode" },
      { value: "Lydian Mode", label: "Lydian Mode" },
      { value: "Mixolydian Mode", label: "Mixolydian Mode" },
      { value: "Locrian Mode", label: "Locrian Mode" },
      { value: "Pentatonic Major", label: "Pentatonic Major" },
      { value: "Pentatonic Minor", label: "Pentatonic Minor" },
      { value: "Blues Scale", label: "Blues Scale" },
      { value: "Chromatic Scale", label: "Chromatic Scale" },
    ],
  },
  {
    label: "Chords",
    options: [
      { value: "Major Triad", label: "Major Triad" },
      { value: "Minor Triad", label: "Minor Triad" },
      { value: "Diminished Triad", label: "Diminished Triad" },
      { value: "Augmented Triad", label: "Augmented Triad" },
      { value: "Major 7th", label: "Major 7th" },
      { value: "Dominant 7th", label: "Dominant 7th" },
      { value: "Minor 7th", label: "Minor 7th" },
      { value: "Half-Diminished 7th", label: "Half-Diminished 7th" },
      { value: "Fully-Diminished 7th", label: "Fully-Diminished 7th" },
    ],
  },
];
