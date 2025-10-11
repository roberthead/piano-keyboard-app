import PianoKey from "./PianoKey";

interface PianoOctaveProps {
  octaveNumber: number;
  activeNote: { note: string; octave: number } | null;
  markedKeys: Set<string>;
  onPlay: (note: string, octave: number) => void;
  onMark: (note: string, octave: number) => void;
  startNote?: string;
  endNote?: string;
}

const PianoOctave = ({
  octaveNumber,
  activeNote,
  markedKeys,
  onPlay,
  onMark,
  startNote,
  endNote,
}: PianoOctaveProps) => {
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

export default PianoOctave;
