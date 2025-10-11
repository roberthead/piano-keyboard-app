import { describe, it, expect } from 'vitest';
import { getFrequency } from './audioUtils';

describe('getFrequency', () => {
  it('should return 440 Hz for A4 (reference pitch)', () => {
    expect(getFrequency('A', 4)).toBe(440);
  });

  it('should calculate correct frequency for C4 (middle C)', () => {
    // C4 is 9 semitones below A4
    // Expected: 440 * 2^(-9/12) ≈ 261.63 Hz
    const frequency = getFrequency('C', 4);
    expect(frequency).toBeCloseTo(261.63, 2);
  });

  it('should calculate correct frequency for A3 (one octave below A4)', () => {
    // A3 should be half the frequency of A4
    expect(getFrequency('A', 3)).toBe(220);
  });

  it('should calculate correct frequency for A5 (one octave above A4)', () => {
    // A5 should be double the frequency of A4
    expect(getFrequency('A', 5)).toBe(880);
  });

  it('should handle sharps correctly (C#4)', () => {
    // C#4 is 8 semitones below A4
    const frequency = getFrequency('C#', 4);
    expect(frequency).toBeCloseTo(277.18, 2);
  });

  it('should calculate frequencies for all notes in an octave', () => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const frequencies = notes.map(note => getFrequency(note, 4));

    // All frequencies should be positive numbers
    frequencies.forEach(freq => {
      expect(freq).toBeGreaterThan(0);
      expect(typeof freq).toBe('number');
    });

    // Frequencies should be in ascending order
    for (let i = 1; i < frequencies.length; i++) {
      expect(frequencies[i]).toBeGreaterThan(frequencies[i - 1]);
    }
  });

  it('should handle low octaves (C2)', () => {
    const frequency = getFrequency('C', 2);
    expect(frequency).toBeCloseTo(65.41, 2);
  });

  it('should handle high octaves (C6)', () => {
    const frequency = getFrequency('C', 6);
    expect(frequency).toBeCloseTo(1046.50, 2);
  });

  it('should maintain octave relationship (doubling every 12 semitones)', () => {
    const c4 = getFrequency('C', 4);
    const c5 = getFrequency('C', 5);
    const c6 = getFrequency('C', 6);

    expect(c5 / c4).toBeCloseTo(2, 5);
    expect(c6 / c5).toBeCloseTo(2, 5);
  });

  it('should maintain semitone relationship', () => {
    // The ratio between consecutive semitones should be 2^(1/12)
    const expectedRatio = Math.pow(2, 1/12);
    const c4 = getFrequency('C', 4);
    const cSharp4 = getFrequency('C#', 4);
    const d4 = getFrequency('D', 4);

    expect(cSharp4 / c4).toBeCloseTo(expectedRatio, 5);
    expect(d4 / cSharp4).toBeCloseTo(expectedRatio, 5);
  });
});
