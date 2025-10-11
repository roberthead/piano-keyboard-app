/**
 * Transpose a set of marked keys to a target octave, preserving intervals.
 * The lowest note in the marked keys will be moved to the target octave.
 *
 * @param markedKeys - Set of key IDs in format "NoteOctave" (e.g., "C4", "E4", "G4")
 * @param targetOctave - The octave to transpose to
 * @param minOctave - Minimum valid octave (default: 2)
 * @param maxOctave - Maximum valid octave (default: 6)
 * @param maxOctaveNote - In the max octave, only this note is valid (default: "C")
 * @returns New set of transposed key IDs
 */
export function transposeToOctave(
  markedKeys: Set<string>,
  targetOctave: number,
  minOctave: number = 2,
  maxOctave: number = 6,
  maxOctaveNote: string = 'C'
): Set<string> {
  if (markedKeys.size === 0) {
    return new Set();
  }

  // Parse marked keys to get pitch classes and octaves
  const markedPitches = Array.from(markedKeys)
    .map(keyId => {
      const match = keyId.match(/^([A-G]#?)(\d+)$/);
      if (match) {
        return { note: match[1], octave: parseInt(match[2]) };
      }
      return null;
    })
    .filter((p): p is { note: string; octave: number } => p !== null);

  if (markedPitches.length === 0) {
    return new Set();
  }

  // Find the lowest octave among marked pitches
  const lowestOctave = Math.min(...markedPitches.map(p => p.octave));
  const octaveShift = targetOctave - lowestOctave;

  // Transpose all marked pitches by the octave shift
  const transposedKeys = new Set<string>();

  // Get the chromatic note order for comparison
  const noteOrder = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const maxNoteIndex = noteOrder.indexOf(maxOctaveNote);

  markedPitches.forEach(({ note, octave }) => {
    const newOctave = octave + octaveShift;
    const noteIndex = noteOrder.indexOf(note);

    // Only add if within valid range
    if (newOctave >= minOctave && newOctave <= maxOctave) {
      // In max octave, only allow notes up to and including maxOctaveNote
      if (newOctave < maxOctave || (maxNoteIndex >= 0 && noteIndex <= maxNoteIndex)) {
        transposedKeys.add(`${note}${newOctave}`);
      }
    }
  });

  return transposedKeys;
}
