/**
 * Calculate the frequency of a musical note in Hz.
 * Uses A4 = 440 Hz as the reference pitch.
 *
 * @param note - The pitch class (C, C#, D, etc.)
 * @param octave - The octave number
 * @returns The frequency in Hz
 */
export function getFrequency(note: string, octave: number): number {
  const noteMap: { [key: string]: number } = {
    C: -9,
    "C#": -8,
    D: -7,
    "D#": -6,
    E: -5,
    F: -4,
    "F#": -3,
    G: -2,
    "G#": -1,
    A: 0,
    "A#": 1,
    B: 2,
  };
  const halfSteps = noteMap[note] + (octave - 4) * 12;
  return 440 * Math.pow(2, halfSteps / 12);
}
