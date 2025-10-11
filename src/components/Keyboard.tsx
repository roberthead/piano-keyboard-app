import { useState, useCallback, useEffect } from "react";
import PianoKey from "./PianoKey";
import PitchList from "./PitchList";
import PatternBar from "./PatternBar";
import PatternControls from "./PatternControls";
import { PATTERNS, PATTERN_GROUPS, PITCH_CLASSES, getPitchClassIndex, type PitchClass } from "../constants";
import { usePianoAudio } from "../hooks/usePianoAudio";
import "./Keyboard.css";

interface OctaveProps {
  octaveNumber: number;
  activeNote: { note: string; octave: number } | null;
  markedKeys: Set<string>;
  onPlay: (note: string, octave: number) => void;
  onMark: (note: string, octave: number) => void;
  startNote?: string;
  endNote?: string;
}

const Octave = ({
  octaveNumber,
  activeNote,
  markedKeys,
  onPlay,
  onMark,
  startNote,
  endNote,
}: OctaveProps) => {
  const allNotes = [
    { note: "C", isBlack: false },
    { note: "C#", isBlack: true },
    { note: "D", isBlack: false },
    { note: "D#", isBlack: true },
    { note: "E", isBlack: false },
    { note: "F", isBlack: false },
    { note: "F#", isBlack: true },
    { note: "G", isBlack: false },
    { note: "G#", isBlack: true },
    { note: "A", isBlack: false },
    { note: "A#", isBlack: true },
    { note: "B", isBlack: false },
  ];

  let notes = allNotes;

  if (startNote) {
    const startIndex = allNotes.findIndex((n) => n.note === startNote);
    if (startIndex !== -1) {
      notes = allNotes.slice(startIndex);
    }
  }

  if (endNote) {
    const endIndex = notes.findIndex((n) => n.note === endNote);
    if (endIndex !== -1) {
      notes = notes.slice(0, endIndex + 1);
    }
  }

  return (
    <div className="octave">
      {notes.map(({ note, isBlack }) => {
        const keyId = `${note}${octaveNumber}`;
        return (
          <PianoKey
            key={keyId}
            note={note}
            octave={octaveNumber}
            isBlack={isBlack}
            isActive={
              activeNote?.note === note && activeNote?.octave === octaveNumber
            }
            isMarked={markedKeys.has(keyId)}
            onPlay={onPlay}
            onMark={onMark}
          />
        );
      })}
    </div>
  );
};

const Keyboard = () => {
  const [activeNote, setActiveNote] = useState<{
    note: string;
    octave: number;
  } | null>(null);
  const [markedKeys, setMarkedKeys] = useState<Set<string>>(new Set());
  const [isArpeggiate, setIsArpeggiate] = useState(false);
  const [selectedScale, setSelectedScale] = useState("None");
  const [selectedChord, setSelectedChord] = useState("None");
  const [selectedInterval, setSelectedInterval] = useState("None");
  const [rootNote, setRootNote] = useState<PitchClass>("C");
  const [announcement, setAnnouncement] = useState("");

  const { playNote: playAudioNote, playMarkedKeys: playMarkedAudioKeys, getFrequency } = usePianoAudio();

  const playNote = useCallback(
    (note: string, octave: number) => {
      if (!note) {
        setActiveNote(null);
        return;
      }

      setActiveNote({ note, octave });
      playAudioNote(note, octave);
    },
    [playAudioNote]
  );

  const toggleMarkKey = useCallback((note: string, octave: number) => {
    const keyId = `${note}${octave}`;
    setMarkedKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
        setAnnouncement(`${note}${octave} unmarked`);
      } else {
        newSet.add(keyId);
        setAnnouncement(`${note}${octave} marked`);
      }
      return newSet;
    });
  }, []);

  const clearMarks = useCallback(() => {
    setMarkedKeys(new Set());
    setAnnouncement("All marks cleared");
  }, []);

  useEffect(() => {
    // Determine which pattern is active (interval > chord > scale priority)
    const activePattern =
      selectedInterval !== "None"
        ? selectedInterval
        : selectedChord !== "None"
        ? selectedChord
        : selectedScale;

    if (activePattern === "None") {
      return;
    }

    const rootIndex = getPitchClassIndex(rootNote);
    if (rootIndex === -1) return;

    const intervals = PATTERNS[activePattern] || [];
    const newMarkedKeys = new Set<string>();

    // Find the octave closest to Middle C (C4) for the root note
    // If the root is C-F, use octave 4; if G-B, use octave 3 to stay closer to C4
    const startOctave = rootIndex >= 7 ? 3 : 4; // G=7, G#=8, A=9, A#=10, B=11

    // Mark only one iteration of the pattern
    intervals.forEach((interval) => {
      const noteIndex = (rootIndex + interval) % 12;
      const octaveAdjustment = Math.floor((rootIndex + interval) / 12);
      const targetOctave = startOctave + octaveAdjustment;

      // Only add if within keyboard range (2-6, with 6 only having C)
      if (targetOctave >= 2 && targetOctave <= 6) {
        if (targetOctave < 6 || PITCH_CLASSES[noteIndex] === "C") {
          newMarkedKeys.add(`${PITCH_CLASSES[noteIndex]}${targetOctave}`);
        }
      }
    });

    // For scales, add the root note one octave higher
    if (PATTERN_GROUPS[0].options.some((opt) => opt.value === activePattern)) {
      const highRootOctave = startOctave + 1;
      if (highRootOctave >= 2 && highRootOctave <= 6) {
        if (highRootOctave < 6 || rootNote === "C") {
          newMarkedKeys.add(`${rootNote}${highRootOctave}`);
        }
      }
    }

    setMarkedKeys(newMarkedKeys);
  }, [selectedScale, selectedChord, selectedInterval, rootNote]);

  const playMarkedKeys = useCallback(() => {
    playMarkedAudioKeys(markedKeys, isArpeggiate);
    const count = markedKeys.size;
    setAnnouncement(`Playing ${count} marked ${count === 1 ? 'key' : 'keys'}${isArpeggiate ? ' arpeggiated' : ''}`);
  }, [playMarkedAudioKeys, markedKeys, isArpeggiate]);

  const getMarkedPitches = useCallback((): string[] => {
    return Array.from(markedKeys)
      .map((keyId) => {
        const match = keyId.match(/^([A-G]#?)(\d+)$/);
        if (match) {
          return `${match[1]}${match[2]}`;
        }
        return null;
      })
      .filter((pitch): pitch is string => pitch !== null)
      .sort((a, b) => {
        const matchA = a.match(/^([A-G]#?)(\d+)$/);
        const matchB = b.match(/^([A-G]#?)(\d+)$/);
        if (matchA && matchB) {
          const freqA = getFrequency(matchA[1], parseInt(matchA[2]));
          const freqB = getFrequency(matchB[1], parseInt(matchB[2]));
          return freqA - freqB;
        }
        return 0;
      });
  }, [markedKeys, getFrequency]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Spacebar to play marked keys
      if (e.code === 'Space' && markedKeys.size > 0) {
        e.preventDefault(); // Prevent page scroll
        playMarkedKeys();
      }
      // Escape to clear marked keys
      if (e.code === 'Escape' && markedKeys.size > 0) {
        clearMarks();
      }
      // Number keys 2-5 to transpose marked pitches to that octave
      if (['Digit2', 'Digit3', 'Digit4', 'Digit5'].includes(e.code) && markedKeys.size > 0) {
        e.preventDefault();
        const targetOctave = parseInt(e.code.replace('Digit', ''));

        // Parse marked keys to get pitch classes and octaves
        const markedPitches = Array.from(markedKeys).map(keyId => {
          const match = keyId.match(/^([A-G]#?)(\d+)$/);
          if (match) {
            return { note: match[1], octave: parseInt(match[2]) };
          }
          return null;
        }).filter((p): p is { note: string; octave: number } => p !== null);

        if (markedPitches.length === 0) return;

        // Find the lowest octave among marked pitches
        const lowestOctave = Math.min(...markedPitches.map(p => p.octave));
        const octaveShift = targetOctave - lowestOctave;

        // Transpose all marked pitches by the octave shift
        const transposedKeys = new Set<string>();
        markedPitches.forEach(({ note, octave }) => {
          const newOctave = octave + octaveShift;
          // Only add if within valid range (2-6, with 6 only having C)
          if (newOctave >= 2 && newOctave <= 6) {
            if (newOctave < 6 || note === 'C') {
              transposedKeys.add(`${note}${newOctave}`);
            }
          }
        });

        setMarkedKeys(transposedKeys);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [markedKeys, playMarkedKeys, clearMarks]);

  return (
    <div className="keyboard-container">
      <PatternControls
        rootNote={rootNote}
        selectedScale={selectedScale}
        selectedChord={selectedChord}
        selectedInterval={selectedInterval}
        onRootNoteChange={setRootNote}
        onScaleChange={setSelectedScale}
        onChordChange={setSelectedChord}
        onIntervalChange={setSelectedInterval}
      />
      <div className="keyboard-wrapper">
        <PatternBar
          rootNote={rootNote}
          pattern={
            selectedInterval !== "None"
              ? selectedInterval
              : selectedChord !== "None"
              ? selectedChord
              : selectedScale
          }
          octaveStart={2}
          octaveEnd={6}
        />
        <div className="keyboard">
          {[2, 3, 4, 5].map((octave) => (
            <Octave
              key={octave}
              octaveNumber={octave}
              activeNote={activeNote}
              markedKeys={markedKeys}
              onPlay={playNote}
              onMark={toggleMarkKey}
            />
          ))}
          <Octave
            octaveNumber={6}
            activeNote={activeNote}
            markedKeys={markedKeys}
            onPlay={playNote}
            onMark={toggleMarkKey}
            endNote="C"
          />
        </div>
      </div>
      <div className="controls">
        <span className="info">Click to play • Ctrl-click or long-press to mark • Space to play marked • Esc to clear • 2-5 for octave</span>
        <button onClick={clearMarks} disabled={markedKeys.size === 0}>
          Clear
        </button>
        <button onClick={playMarkedKeys} disabled={markedKeys.size === 0}>
          Play
        </button>
        <label className="arpeggiate-checkbox">
          <input
            type="checkbox"
            checked={isArpeggiate}
            onChange={(e) => setIsArpeggiate(e.target.checked)}
          />
          Arpeggiate
        </label>
      </div>
      <PitchList pitches={getMarkedPitches()} />
      {/* Screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
    </div>
  );
};

export default Keyboard;
