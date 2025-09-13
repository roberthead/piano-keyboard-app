import { useState, useCallback } from "react";
import PitchList from "./PitchList";
import "./Keyboard.css";

interface KeyProps {
  note: string;
  octave: number;
  isBlack: boolean;
  isActive?: boolean;
  isMarked?: boolean;
  onPlay: (note: string, octave: number) => void;
  onMark: (note: string, octave: number) => void;
}

const PianoKey = ({
  note,
  octave,
  isBlack,
  isActive,
  isMarked,
  onPlay,
  onMark,
}: KeyProps) => {
  const className = `key ${isBlack ? "black" : "white"} ${
    isActive ? "active" : ""
  } ${isMarked ? "marked" : ""}`;

  return (
    <div
      className={className}
      data-note={note}
      data-octave={octave}
      onMouseDown={() => onPlay(note, octave)}
      onMouseUp={() => onPlay("", 0)}
      onMouseEnter={(e) => e.buttons === 1 && onPlay(note, octave)}
      onContextMenu={(e) => {
        e.preventDefault();
        onMark(note, octave);
      }}
    />
  );
};

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
  const [audioContext] = useState(
    () => new (window.AudioContext || (window as unknown).webkitAudioContext)()
  );

  const getFrequency = useCallback((note: string, octave: number): number => {
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
  }, []);

  const playNote = useCallback(
    (note: string, octave: number) => {
      if (!note) {
        setActiveNote(null);
        return;
      }

      setActiveNote({ note, octave });

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = getFrequency(note, octave);
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.6, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 1.0
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1.0);
    },
    [audioContext, getFrequency]
  );

  const toggleMarkKey = useCallback((note: string, octave: number) => {
    const keyId = `${note}${octave}`;
    setMarkedKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  }, []);

  const clearMarks = useCallback(() => {
    setMarkedKeys(new Set());
  }, []);

  const playMarkedKeys = useCallback(() => {
    if (markedKeys.size === 0) return;

    if (isArpeggiate) {
      // Sort keys by frequency (lowest to highest)
      const sortedKeys = Array.from(markedKeys).sort((a, b) => {
        const matchA = a.match(/^([A-G]#?)(\d+)$/);
        const matchB = b.match(/^([A-G]#?)(\d+)$/);
        if (matchA && matchB) {
          const freqA = getFrequency(matchA[1], parseInt(matchA[2]));
          const freqB = getFrequency(matchB[1], parseInt(matchB[2]));
          return freqA - freqB;
        }
        return 0;
      });

      // Play as 1/8 notes at q=120 (120 BPM = 2 beats per second, 1/8 note = 0.25 seconds)
      const noteInterval = 0.25;
      const noteDuration = 0.5;

      sortedKeys.forEach((keyId, index) => {
        const match = keyId.match(/^([A-G]#?)(\d+)$/);
        if (match) {
          const [, note, octaveStr] = match;
          const octave = parseInt(octaveStr);
          const startTime = audioContext.currentTime + index * noteInterval;

          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.value = getFrequency(note, octave);
          oscillator.type = "sine";

          gainNode.gain.setValueAtTime(0.6, startTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            startTime + noteDuration
          );

          oscillator.start(startTime);
          oscillator.stop(startTime + noteDuration);
        }
      });
    } else {
      // Play all notes simultaneously (original behavior)
      const volumePerKey = 0.6 / markedKeys.size;

      markedKeys.forEach((keyId) => {
        const match = keyId.match(/^([A-G]#?)(\d+)$/);
        if (match) {
          const [, note, octaveStr] = match;
          const octave = parseInt(octaveStr);

          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.value = getFrequency(note, octave);
          oscillator.type = "sine";

          gainNode.gain.setValueAtTime(volumePerKey, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 2.0
          );

          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 2.0);
        }
      });
    }
  }, [markedKeys, audioContext, getFrequency, isArpeggiate]);

  const getMarkedPitches = useCallback(() => {
    return Array.from(markedKeys)
      .map((keyId) => {
        const match = keyId.match(/^([A-G]#?)(\d+)$/);
        if (match) {
          return `${match[1]}${match[2]}`;
        }
        return null;
      })
      .filter(Boolean)
      .sort((a, b) => {
        const matchA = a!.match(/^([A-G]#?)(\d+)$/);
        const matchB = b!.match(/^([A-G]#?)(\d+)$/);
        if (matchA && matchB) {
          const freqA = getFrequency(matchA[1], parseInt(matchA[2]));
          const freqB = getFrequency(matchB[1], parseInt(matchB[2]));
          return freqA - freqB;
        }
        return 0;
      });
  }, [markedKeys, getFrequency]);

  return (
    <div className="keyboard-container">
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
      <div className="controls">
        <span className="info">Click to play • Ctrl-click to mark/unmark</span>
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
    </div>
  );
};

export default Keyboard;
