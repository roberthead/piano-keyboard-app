import { describe, it, expect } from 'vitest';
import { PATTERNS, PATTERN_GROUPS } from './musicPatterns';

describe('PATTERNS', () => {
  describe('Scale patterns', () => {
    it('should have 7 notes in Major Scale', () => {
      expect(PATTERNS['Major Scale']).toHaveLength(7);
    });

    it('should have correct intervals for Major Scale', () => {
      expect(PATTERNS['Major Scale']).toEqual([0, 2, 4, 5, 7, 9, 11]);
    });

    it('should have 7 notes in Natural Minor', () => {
      expect(PATTERNS['Aeolian Mode / Natural Minor']).toHaveLength(7);
    });

    it('should have correct intervals for Natural Minor', () => {
      expect(PATTERNS['Aeolian Mode / Natural Minor']).toEqual([0, 2, 3, 5, 7, 8, 10]);
    });

    it('should have 5 notes in Pentatonic Major', () => {
      expect(PATTERNS['Pentatonic Major']).toHaveLength(5);
    });

    it('should have 5 notes in Pentatonic Minor', () => {
      expect(PATTERNS['Pentatonic Minor']).toHaveLength(5);
    });

    it('should have 6 notes in Blues Scale', () => {
      expect(PATTERNS['Blues Scale']).toHaveLength(6);
    });

    it('should have 12 notes in Chromatic Scale', () => {
      expect(PATTERNS['Chromatic Scale']).toHaveLength(12);
    });

    it('should have correct intervals for Chromatic Scale', () => {
      expect(PATTERNS['Chromatic Scale']).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });

    it('should always start with 0 (root note)', () => {
      Object.keys(PATTERNS).forEach(patternName => {
        expect(PATTERNS[patternName][0]).toBe(0);
      });
    });

    it('should have intervals in ascending order', () => {
      Object.keys(PATTERNS).forEach(patternName => {
        const intervals = PATTERNS[patternName];
        for (let i = 1; i < intervals.length; i++) {
          expect(intervals[i]).toBeGreaterThan(intervals[i - 1]);
        }
      });
    });

    it('should have all intervals within one octave (0-12)', () => {
      Object.keys(PATTERNS).forEach(patternName => {
        const intervals = PATTERNS[patternName];
        intervals.forEach(interval => {
          expect(interval).toBeGreaterThanOrEqual(0);
          expect(interval).toBeLessThanOrEqual(12);
        });
      });
    });
  });

  describe('Triad patterns', () => {
    it('should have 3 notes in Major Triad', () => {
      expect(PATTERNS['Major Triad']).toHaveLength(3);
    });

    it('should have correct intervals for Major Triad (root, major 3rd, perfect 5th)', () => {
      expect(PATTERNS['Major Triad']).toEqual([0, 4, 7]);
    });

    it('should have correct intervals for Minor Triad (root, minor 3rd, perfect 5th)', () => {
      expect(PATTERNS['Minor Triad']).toEqual([0, 3, 7]);
    });

    it('should have correct intervals for Diminished Triad', () => {
      expect(PATTERNS['Diminished Triad']).toEqual([0, 3, 6]);
    });

    it('should have correct intervals for Augmented Triad', () => {
      expect(PATTERNS['Augmented Triad']).toEqual([0, 4, 8]);
    });
  });

  describe('Seventh chord patterns', () => {
    it('should have 4 notes in all seventh chords', () => {
      expect(PATTERNS['Major 7th']).toHaveLength(4);
      expect(PATTERNS['Dominant 7th']).toHaveLength(4);
      expect(PATTERNS['Minor 7th']).toHaveLength(4);
      expect(PATTERNS['Half-Diminished 7th']).toHaveLength(4);
      expect(PATTERNS['Fully-Diminished 7th']).toHaveLength(4);
    });

    it('should have correct intervals for Major 7th', () => {
      expect(PATTERNS['Major 7th']).toEqual([0, 4, 7, 11]);
    });

    it('should have correct intervals for Dominant 7th', () => {
      expect(PATTERNS['Dominant 7th']).toEqual([0, 4, 7, 10]);
    });

    it('should have correct intervals for Minor 7th', () => {
      expect(PATTERNS['Minor 7th']).toEqual([0, 3, 7, 10]);
    });
  });

  describe('Interval patterns', () => {
    it('should have 1 note for Unison', () => {
      expect(PATTERNS['P1 (Unison)']).toHaveLength(1);
      expect(PATTERNS['P1 (Unison)']).toEqual([0]);
    });

    it('should have 2 notes for all other intervals', () => {
      expect(PATTERNS['m2 (Minor 2nd)']).toHaveLength(2);
      expect(PATTERNS['M2 (Major 2nd)']).toHaveLength(2);
      expect(PATTERNS['P5 (Perfect 5th)']).toHaveLength(2);
      expect(PATTERNS['P8 (Octave)']).toHaveLength(2);
    });

    it('should have correct intervals for Perfect 5th', () => {
      expect(PATTERNS['P5 (Perfect 5th)']).toEqual([0, 7]);
    });

    it('should have correct intervals for Octave', () => {
      expect(PATTERNS['P8 (Octave)']).toEqual([0, 12]);
    });

    it('should have correct intervals for Tritone', () => {
      expect(PATTERNS['TT (Tritone)']).toEqual([0, 6]);
    });
  });
});

describe('PATTERN_GROUPS', () => {
  it('should have 3 groups (Scales & Modes, Chords, Intervals)', () => {
    expect(PATTERN_GROUPS).toHaveLength(3);
  });

  it('should have correct group labels', () => {
    expect(PATTERN_GROUPS[0].label).toBe('Scales & Modes');
    expect(PATTERN_GROUPS[1].label).toBe('Chords');
    expect(PATTERN_GROUPS[2].label).toBe('Intervals');
  });

  it('should have all patterns referenced in groups exist in PATTERNS', () => {
    PATTERN_GROUPS.forEach(group => {
      group.options.forEach(option => {
        expect(PATTERNS[option.value]).toBeDefined();
      });
    });
  });

  it('should have Major Scale in Scales & Modes group', () => {
    const scalesGroup = PATTERN_GROUPS[0];
    const hasMajorScale = scalesGroup.options.some(opt => opt.value === 'Major Scale');
    expect(hasMajorScale).toBe(true);
  });

  it('should have Major Triad in Chords group', () => {
    const chordsGroup = PATTERN_GROUPS[1];
    const hasMajorTriad = chordsGroup.options.some(opt => opt.value === 'Major Triad');
    expect(hasMajorTriad).toBe(true);
  });

  it('should have Perfect 5th in Intervals group', () => {
    const intervalsGroup = PATTERN_GROUPS[2];
    const hasP5 = intervalsGroup.options.some(opt => opt.value === 'P5 (Perfect 5th)');
    expect(hasP5).toBe(true);
  });

  it('should have value and label for each option', () => {
    PATTERN_GROUPS.forEach(group => {
      group.options.forEach(option => {
        expect(option.value).toBeDefined();
        expect(option.label).toBeDefined();
        expect(typeof option.value).toBe('string');
        expect(typeof option.label).toBe('string');
      });
    });
  });
});
