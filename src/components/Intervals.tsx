import { useState, useRef, useEffect } from 'react';
import './Intervals.css';

const intervals = [
  { semitones: 0, label: 'P1', name: 'Perfect Unison' },
  { semitones: 1, label: 'm2', name: 'Minor 2nd' },
  { semitones: 2, label: 'M2', name: 'Major 2nd' },
  { semitones: 3, label: 'm3', name: 'Minor 3rd' },
  { semitones: 4, label: 'M3', name: 'Major 3rd' },
  { semitones: 5, label: 'P4', name: 'Perfect 4th' },
  { semitones: 6, label: 'TT', name: 'Tritone' },
  { semitones: 7, label: 'P5', name: 'Perfect 5th' },
  { semitones: 8, label: 'm6', name: 'Minor 6th' },
  { semitones: 9, label: 'M6', name: 'Major 6th' },
  { semitones: 10, label: 'm7', name: 'Minor 7th' },
  { semitones: 11, label: 'M7', name: 'Major 7th' },
  { semitones: 12, label: 'P8', name: 'Perfect Octave' },
  { semitones: 13, label: 'm9', name: 'Minor 9th' },
  { semitones: 14, label: 'M9', name: 'Major 9th' },
  { semitones: 15, label: 'm10', name: 'Minor 10th' },
  { semitones: 16, label: 'M10', name: 'Major 10th' },
];

function Intervals() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startDragX, setStartDragX] = useState(0);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  // Calculate average spacing based on keyboard dimensions
  // 7 white keys per octave = 12 semitones
  // Each white key is 2.5rem (40px)
  const whiteKeyWidth = 40;
  const whiteKeysPerOctave = 7;
  const semitonesPerOctave = 12;

  // Average distance per semitone
  const pixelsPerSemitone =
    (whiteKeysPerOctave * whiteKeyWidth) / semitonesPerOctave;

  const lineHeight = 25;
  const startX = 60;
  const startY = 20;
  // Make SVG wider to ensure it's draggable
  const svgWidth = Math.max(1400, 16 * pixelsPerSemitone + startX + 150);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartDragX(e.clientX - dragOffset);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newOffset = e.clientX - startDragX;
      setDragOffset(newOffset);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "grabbing";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
      };
    }
  }, [isDragging, startDragX]);

  return (
    <div className={`intervals-container ${isCollapsed ? "collapsed" : ""}`}>
      <div
        className="intervals-header"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h3>Musical Intervals</h3>
        <button className="collapse-toggle">{isCollapsed ? "❯" : "❯"}</button>
      </div>
      {!isCollapsed && (
        <div className="intervals-viewport">
          <div
            ref={svgContainerRef}
            className={`intervals-svg-container ${
              isDragging ? "dragging" : ""
            }`}
            style={{ transform: `translateX(${dragOffset}px)` }}
            onMouseDown={handleMouseDown}
          >
            <svg
              width={svgWidth}
              height={intervals.length * lineHeight + 40}
              className="intervals-svg"
            >
              {intervals.map((interval, index) => {
                const y = startY + index * lineHeight;
                const lineLength =
                  startX + interval.semitones * pixelsPerSemitone;

                return (
                  <g key={interval.semitones}>
                    <text
                      x={startX - 30}
                      y={y + 5}
                      className="interval-label"
                      textAnchor="middle"
                    >
                      {interval.label}
                    </text>
                    <circle cx={startX} cy={y} r="4" className="interval-dot" />
                    <line
                      x1={startX}
                      y1={y}
                      x2={lineLength}
                      y2={y}
                      className="interval-line"
                      strokeWidth="2"
                    />
                    <circle
                      cx={lineLength}
                      cy={y}
                      r="4"
                      className="interval-dot"
                    />
                    <text
                      x={lineLength + 20}
                      y={y + 3}
                      className="interval-name"
                      textAnchor="start"
                    >
                      {interval.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default Intervals;