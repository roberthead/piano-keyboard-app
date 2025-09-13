import React, { useState } from "react";

interface PitchListProps {
  pitches: string[];
}

const PitchList: React.FC<PitchListProps> = ({ pitches }) => {
  const [useFlats, setUseFlats] = useState(false);
  const [showPitchClasses, setShowPitchClasses] = useState(false);

  const sharpToFlat: { [key: string]: string } = {
    'C#': 'Db',
    'D#': 'Eb',
    'F#': 'Gb',
    'G#': 'Ab',
    'A#': 'Bb'
  };

  const convertPitch = (pitch: string): string => {
    const match = pitch.match(/^([A-G]#?)(\d+)$/);
    if (match) {
      const [, note, octave] = match;
      let displayNote = note;

      // Convert to flat if needed
      if (useFlats) {
        const flatNote = sharpToFlat[note];
        displayNote = flatNote || note;
      }

      // Return pitch class or full pitch
      return showPitchClasses ? displayNote : `${displayNote}${octave}`;
    }
    return pitch;
  };

  const processedPitches = pitches.map(convertPitch);

  // Remove duplicates if showing pitch classes
  const displayPitches = showPitchClasses
    ? Array.from(new Set(processedPitches))
    : processedPitches;

  if (pitches.length === 0) return null;

  return (
    <div className="pitch-display-container">
      <div className="pitch-display-content">
        <div className="pitch-list">{displayPitches.join(" • ")}</div>
        <div className="pitch-toggles">
          <label className="accidental-toggle">
            <input
              type="checkbox"
              checked={useFlats}
              onChange={(e) => setUseFlats(e.target.checked)}
            />
            <span title="Use flat notation">♭</span>
          </label>
          <label className="accidental-toggle">
            <input
              type="checkbox"
              checked={showPitchClasses}
              onChange={(e) => setShowPitchClasses(e.target.checked)}
            />
            <span title="Show pitch classes only">reduce</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PitchList;
