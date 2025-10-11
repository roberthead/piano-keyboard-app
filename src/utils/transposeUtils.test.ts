import { describe, it, expect } from 'vitest';
import { transposeToOctave } from './transposeUtils';

describe('transposeToOctave', () => {
  describe('basic transposition', () => {
    it('should transpose a single note up one octave', () => {
      const marked = new Set(['C4']);
      const result = transposeToOctave(marked, 5);
      expect(result).toEqual(new Set(['C5']));
    });

    it('should transpose a single note down one octave', () => {
      const marked = new Set(['C4']);
      const result = transposeToOctave(marked, 3);
      expect(result).toEqual(new Set(['C3']));
    });

    it('should transpose multiple notes preserving intervals', () => {
      const marked = new Set(['C4', 'E4', 'G4']); // C major chord
      const result = transposeToOctave(marked, 5);
      expect(result).toEqual(new Set(['C5', 'E5', 'G5']));
    });

    it('should handle sharps correctly', () => {
      const marked = new Set(['C#4', 'E4', 'G#4']);
      const result = transposeToOctave(marked, 3);
      expect(result).toEqual(new Set(['C#3', 'E3', 'G#3']));
    });
  });

  describe('octave boundaries', () => {
    it('should not transpose below minimum octave', () => {
      const marked = new Set(['C3', 'E3', 'G3']);
      const result = transposeToOctave(marked, 2);
      // C2, E2, G2 should all be valid
      expect(result).toEqual(new Set(['C2', 'E2', 'G2']));
    });

    it('should filter out notes below minimum octave', () => {
      const marked = new Set(['C3', 'E3', 'G3']);
      const result = transposeToOctave(marked, 1); // Below min octave
      // All notes would be in octave 1, which is below minimum, so should be empty
      expect(result.size).toBe(0);
    });

    it('should allow C6 but not other notes in octave 6', () => {
      const marked = new Set(['C4', 'E4']);
      const result = transposeToOctave(marked, 6);
      // C6 is valid, but E6 would be above the max note in octave 6
      expect(result).toEqual(new Set(['C6']));
    });

    it('should handle notes spanning multiple octaves', () => {
      const marked = new Set(['C3', 'E3', 'C4']); // Notes across two octaves
      const result = transposeToOctave(marked, 4);
      // Lowest is C3, so shift by 1. C3->C4, E3->E4, C4->C5
      expect(result).toEqual(new Set(['C4', 'E4', 'C5']));
    });
  });

  describe('edge cases', () => {
    it('should return empty set for empty input', () => {
      const marked = new Set<string>();
      const result = transposeToOctave(marked, 4);
      expect(result.size).toBe(0);
    });

    it('should handle single note at boundary', () => {
      const marked = new Set(['C6']);
      const result = transposeToOctave(marked, 6);
      expect(result).toEqual(new Set(['C6']));
    });

    it('should filter invalid key IDs', () => {
      const marked = new Set(['C4', 'INVALID', 'E4']);
      const result = transposeToOctave(marked, 5);
      expect(result).toEqual(new Set(['C5', 'E5']));
    });

    it('should handle transposing to same octave (no change)', () => {
      const marked = new Set(['C4', 'E4', 'G4']);
      const result = transposeToOctave(marked, 4);
      expect(result).toEqual(new Set(['C4', 'E4', 'G4']));
    });
  });

  describe('interval preservation', () => {
    it('should preserve intervals in major scale', () => {
      const marked = new Set(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']);
      const result = transposeToOctave(marked, 3);
      expect(result).toEqual(new Set(['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3']));
    });

    it('should preserve intervals in diminished chord', () => {
      const marked = new Set(['C4', 'D#4', 'F#4', 'A4']);
      const result = transposeToOctave(marked, 5);
      expect(result).toEqual(new Set(['C5', 'D#5', 'F#5', 'A5']));
    });

    it('should calculate shift from lowest note', () => {
      // If lowest note is E4 and we transpose to octave 3,
      // all notes shift down by 1 octave
      const marked = new Set(['E4', 'G4', 'B4']);
      const result = transposeToOctave(marked, 3);
      expect(result).toEqual(new Set(['E3', 'G3', 'B3']));
    });
  });

  describe('custom boundaries', () => {
    it('should respect custom minimum octave', () => {
      const marked = new Set(['C4']);
      const result = transposeToOctave(marked, 1, 3, 6);
      // Octave 1 is below custom min of 3, so should be empty
      expect(result.size).toBe(0);
    });

    it('should respect custom maximum octave', () => {
      const marked = new Set(['C4']);
      const result = transposeToOctave(marked, 5, 2, 4);
      // Octave 5 is above custom max of 4, so should be empty
      expect(result.size).toBe(0);
    });

    it('should respect custom maximum note in max octave', () => {
      const marked = new Set(['C4', 'E4']);
      const result = transposeToOctave(marked, 6, 2, 6, 'E');
      // Both C6 and E6 should be valid with maxOctaveNote='E'
      expect(result).toEqual(new Set(['C6', 'E6']));
    });
  });
});
