import { useRef } from "react";

const LONG_PRESS_DURATION = 500; // milliseconds

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
  const longPressTimerRef = useRef<number | null>(null);
  const isLongPressRef = useRef(false);

  const className = `key ${isBlack ? "black" : "white"} ${
    isActive ? "active" : ""
  } ${isMarked ? "marked" : ""}`;

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent mouse events from firing
    isLongPressRef.current = false;
    onPlay(note, octave);

    // Clear any existing timer first
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }

    // Start long-press timer
    longPressTimerRef.current = window.setTimeout(() => {
      isLongPressRef.current = true;
      onMark(note, octave);
      longPressTimerRef.current = null; // Clear timer ref after firing
      // Provide haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, LONG_PRESS_DURATION);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event from bubbling

    // Clear long-press timer if it hasn't fired yet
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    onPlay("", 0);
  };

  const handleTouchCancel = () => {
    // Handle case where touch is cancelled (e.g., user drags off the key)
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    onPlay("", 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onPlay(note, octave);
      onMark(note, octave);
      // Stop playing after a short duration
      setTimeout(() => onPlay("", 0), 500);
    }
  };

  const ariaLabel = `${note} ${octave}${isMarked ? ', marked' : ''}`;

  return (
    <div
      className={className}
      data-note={note}
      data-octave={octave}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-pressed={isMarked}
      onMouseDown={() => onPlay(note, octave)}
      onMouseUp={() => onPlay("", 0)}
      onMouseEnter={(e) => e.buttons === 1 && onPlay(note, octave)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onKeyDown={handleKeyDown}
      onContextMenu={(e) => {
        e.preventDefault();
        // Only handle context menu if it wasn't triggered by a long-press
        // (on mobile, long-press can trigger context menu)
        if (!isLongPressRef.current) {
          onMark(note, octave);
        }
        isLongPressRef.current = false; // Reset flag
      }}
    />
  );
};

export default PianoKey;
