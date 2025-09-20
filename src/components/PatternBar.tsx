import { useMemo } from "react";
import { PATTERNS } from "../constants/musicPatterns";
import { PITCH_CLASSES } from "../constants/pitchClasses";
import "./PatternBar.css";

interface PatternBarProps {
  rootNote: string;
  pattern: string;
  octaveStart: number;
  octaveEnd: number;
}

const PatternBar = ({
  rootNote,
  pattern,
  octaveStart,
  octaveEnd,
}: PatternBarProps) => {
  const patternNotes = useMemo(() => {
    if (!rootNote || pattern === "None") return new Set<string>();

    const rootIndex = PITCH_CLASSES.indexOf(rootNote as unknown);
    if (rootIndex === -1) return new Set<string>();

    const intervals = PATTERNS[pattern] || [];
    const notes = new Set<string>();

    for (let octave = octaveStart; octave <= octaveEnd; octave++) {
      intervals.forEach((interval) => {
        const noteIndex = (rootIndex + interval) % 12;
        const adjustedOctave = octave + Math.floor((rootIndex + interval) / 12);
        if (adjustedOctave <= octaveEnd) {
          notes.add(`${PITCH_CLASSES[noteIndex]}${adjustedOctave}`);
        }
      });
    }

    return notes;
  }, [rootNote, pattern, octaveStart, octaveEnd]);

  const renderDots = () => {
    const dots = [];
    let noteIndex = 0;

    for (let octave = octaveStart; octave <= octaveEnd; octave++) {
      const notesToRender = octave === octaveEnd ? 1 : 12; // Only C for last octave

      for (let i = 0; i < notesToRender; i++) {
        const note = PITCH_CLASSES[i];
        const keyId = `${note}${octave}`;
        const hasPattern = patternNotes.has(keyId);
        const showDot = pattern !== "None";

        dots.push(
          <div
            key={keyId}
            className="pattern-indicator"
            style={{ left: `${noteIndex * 1.529 + 1}rem` }}
          >
            {showDot && (
              <div className={`pattern-dot ${!hasPattern ? "inactive" : ""}`} />
            )}
          </div>
        );
        noteIndex++;
      }
    }

    return dots;
  };

  return <div className="pattern-bar">{renderDots()}</div>;
};

export default PatternBar;