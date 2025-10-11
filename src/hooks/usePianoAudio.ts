import { useCallback, useRef } from "react";

// Audio playback constants
const TEMPO_BPM = 120; // Beats per minute for arpeggiation
const EIGHTH_NOTE_DURATION = 0.25; // Duration of 1/8 note at 120 BPM (seconds)
const ARPEGGIATE_NOTE_DURATION = 0.5; // How long each note plays in arpeggiation (seconds)
const ARPEGGIATE_PAUSE_BETWEEN = 0.5; // Pause between ascending and descending sequences (seconds)
const SINGLE_NOTE_DURATION = 1.0; // Duration for single note playback (seconds)
const CHORD_NOTE_DURATION = 2.0; // Duration for chord (simultaneous) playback (seconds)
const DEFAULT_GAIN = 0.6; // Default volume level

interface UsePianoAudioReturn {
  playNote: (note: string, octave: number) => void;
  playMarkedKeys: (markedKeys: Set<string>, isArpeggiate: boolean) => void;
  getFrequency: (note: string, octave: number) => number;
}

export const usePianoAudio = (): UsePianoAudioReturn => {
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context lazily
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
    }
    return audioContextRef.current;
  }, []);

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
        return;
      }

      const audioContext = getAudioContext();

      // Resume audio context if suspended (required by browser autoplay policies)
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = getFrequency(note, octave);
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(DEFAULT_GAIN, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + SINGLE_NOTE_DURATION
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + SINGLE_NOTE_DURATION);
    },
    [getAudioContext, getFrequency]
  );

  const playMarkedKeys = useCallback(
    (markedKeys: Set<string>, isArpeggiate: boolean) => {
      if (markedKeys.size === 0) return;

      const audioContext = getAudioContext();

      // Resume audio context if suspended (required by browser autoplay policies)
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

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

        // Play as 1/8 notes at the configured tempo
        const noteInterval = EIGHTH_NOTE_DURATION;
        const noteDuration = ARPEGGIATE_NOTE_DURATION;
        const pauseBetween = ARPEGGIATE_PAUSE_BETWEEN; // Pause between ascending and descending

        // Create ascending and descending sequences
        const ascendingKeys = [...sortedKeys];
        const descendingKeys = [...sortedKeys].reverse();

        // Combine both sequences
        const playSequence = [...ascendingKeys, ...descendingKeys];

        playSequence.forEach((keyId, index) => {
          const match = keyId.match(/^([A-G]#?)(\d+)$/);
          if (match) {
            const [, note, octaveStr] = match;
            const octave = parseInt(octaveStr);

            // Add pause after the ascending sequence
            let timeOffset = index * noteInterval;
            if (index >= ascendingKeys.length) {
              timeOffset += pauseBetween;
            }

            const startTime = audioContext.currentTime + timeOffset;

            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = getFrequency(note, octave);
            oscillator.type = "sine";

            gainNode.gain.setValueAtTime(DEFAULT_GAIN, startTime);
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
        const volumePerKey = DEFAULT_GAIN / markedKeys.size;

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
              audioContext.currentTime + CHORD_NOTE_DURATION
            );

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + CHORD_NOTE_DURATION);
          }
        });
      }
    },
    [getAudioContext, getFrequency]
  );

  return {
    playNote,
    playMarkedKeys,
    getFrequency,
  };
};
