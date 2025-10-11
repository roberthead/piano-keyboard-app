import { describe, it, expect } from 'vitest';
import { PITCH_CLASSES, getPitchClassIndex, getPitchClassFromIndex, type PitchClass } from './pitchClasses';

describe('PITCH_CLASSES', () => {
  it('should contain 12 pitch classes', () => {
    expect(PITCH_CLASSES).toHaveLength(12);
  });

  it('should start with C', () => {
    expect(PITCH_CLASSES[0]).toBe('C');
  });

  it('should end with B', () => {
    expect(PITCH_CLASSES[11]).toBe('B');
  });

  it('should contain all chromatic notes', () => {
    const expectedNotes: PitchClass[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    expect(PITCH_CLASSES).toEqual(expectedNotes);
  });
});

describe('getPitchClassIndex', () => {
  it('should return 0 for C', () => {
    expect(getPitchClassIndex('C')).toBe(0);
  });

  it('should return 11 for B', () => {
    expect(getPitchClassIndex('B')).toBe(11);
  });

  it('should return 9 for A', () => {
    expect(getPitchClassIndex('A')).toBe(9);
  });

  it('should return correct index for sharps', () => {
    expect(getPitchClassIndex('C#')).toBe(1);
    expect(getPitchClassIndex('D#')).toBe(3);
    expect(getPitchClassIndex('F#')).toBe(6);
    expect(getPitchClassIndex('G#')).toBe(8);
    expect(getPitchClassIndex('A#')).toBe(10);
  });

  it('should return -1 for invalid note', () => {
    expect(getPitchClassIndex('X')).toBe(-1);
    expect(getPitchClassIndex('Db')).toBe(-1); // Only sharps are valid
    expect(getPitchClassIndex('')).toBe(-1);
  });

  it('should handle all natural notes', () => {
    expect(getPitchClassIndex('D')).toBe(2);
    expect(getPitchClassIndex('E')).toBe(4);
    expect(getPitchClassIndex('F')).toBe(5);
    expect(getPitchClassIndex('G')).toBe(7);
  });
});

describe('getPitchClassFromIndex', () => {
  it('should return C for index 0', () => {
    expect(getPitchClassFromIndex(0)).toBe('C');
  });

  it('should return B for index 11', () => {
    expect(getPitchClassFromIndex(11)).toBe('B');
  });

  it('should wrap around for index 12', () => {
    expect(getPitchClassFromIndex(12)).toBe('C');
  });

  it('should wrap around for index 24', () => {
    expect(getPitchClassFromIndex(24)).toBe('C');
  });

  it('should handle negative indices by wrapping', () => {
    expect(getPitchClassFromIndex(-1)).toBe('B');
    expect(getPitchClassFromIndex(-2)).toBe('A#');
    expect(getPitchClassFromIndex(-12)).toBe('C');
  });

  it('should return all pitch classes for indices 0-11', () => {
    const pitchClasses = [];
    for (let i = 0; i < 12; i++) {
      pitchClasses.push(getPitchClassFromIndex(i));
    }
    expect(pitchClasses).toEqual(PITCH_CLASSES);
  });

  it('should maintain modulo 12 arithmetic', () => {
    // Test that adding 12 to any index returns the same pitch class
    for (let i = 0; i < 12; i++) {
      expect(getPitchClassFromIndex(i)).toBe(getPitchClassFromIndex(i + 12));
      expect(getPitchClassFromIndex(i)).toBe(getPitchClassFromIndex(i + 24));
    }
  });
});

describe('PitchClass type integration', () => {
  it('should type getPitchClassIndex parameter correctly', () => {
    // This test ensures TypeScript accepts PitchClass type
    const pitch: PitchClass = 'C';
    const index = getPitchClassIndex(pitch);
    expect(index).toBe(0);
  });

  it('should type getPitchClassFromIndex return value correctly', () => {
    // This test ensures the return type is PitchClass
    const pitch = getPitchClassFromIndex(5);
    const index = getPitchClassIndex(pitch);
    expect(index).toBe(5);
  });
});
