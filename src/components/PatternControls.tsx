import { PATTERN_GROUPS, PITCH_CLASSES, type PitchClass } from "../constants";

interface PatternControlsProps {
  rootNote: PitchClass;
  selectedScale: string;
  selectedChord: string;
  selectedInterval: string;
  onRootNoteChange: (rootNote: PitchClass) => void;
  onScaleChange: (scale: string) => void;
  onChordChange: (chord: string) => void;
  onIntervalChange: (interval: string) => void;
}

const PatternControls = ({
  rootNote,
  selectedScale,
  selectedChord,
  selectedInterval,
  onRootNoteChange,
  onScaleChange,
  onChordChange,
  onIntervalChange,
}: PatternControlsProps) => {
  const handleRootNoteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onRootNoteChange(e.target.value as PitchClass);
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onIntervalChange(value);
    if (value !== "None") {
      onScaleChange("None");
      onChordChange("None");
    }
  };

  const handleChordChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onChordChange(value);
    if (value !== "None") {
      onScaleChange("None");
      onIntervalChange("None");
    }
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onScaleChange(value);
    if (value !== "None") {
      onChordChange("None");
      onIntervalChange("None");
    }
  };

  return (
    <div className="pattern-controls">
      <label>
        Root:
        <select value={rootNote} onChange={handleRootNoteChange}>
          {PITCH_CLASSES.map((pitch) => (
            <option key={pitch} value={pitch}>
              {pitch === "C#"
                ? "C#/Db"
                : pitch === "D#"
                ? "D#/Eb"
                : pitch === "F#"
                ? "F#/Gb"
                : pitch === "G#"
                ? "G#/Ab"
                : pitch === "A#"
                ? "A#/Bb"
                : pitch}
            </option>
          ))}
        </select>
      </label>
      <label>
        Interval:
        <select value={selectedInterval} onChange={handleIntervalChange}>
          <option value="None">None</option>
          {PATTERN_GROUPS[2].options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Chord:
        <select value={selectedChord} onChange={handleChordChange}>
          <option value="None">None</option>
          {PATTERN_GROUPS[1].options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Scale:
        <select value={selectedScale} onChange={handleScaleChange}>
          <option value="None">None</option>
          {PATTERN_GROUPS[0].options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default PatternControls;
