# Piano Keyboard App

An interactive web-based piano keyboard for learning and exploring music theory. Play notes, visualize musical patterns (scales, chords, intervals), and hear how they sound together.

## Features

### Interactive Piano Keyboard
- 4+ octave range (C2-C6) with realistic visual feedback
- Click or tap to play individual notes
- Touch support for mobile devices
- Mouse drag to play multiple notes in sequence

### Musical Pattern Visualization
- **Scales**: Major, Natural Minor, Harmonic Minor, Melodic Minor, Dorian, Phrygian, Lydian, Mixolydian, Locrian, Pentatonic Major/Minor, Blues, Chromatic
- **Chords**: Major, Minor, Diminished, Augmented triads; Major 7th, Dominant 7th, Minor 7th, Half-Diminished 7th, Fully-Diminished 7th
- **Intervals**: All standard intervals from unison to octave
- Pattern indicator bar shows which notes belong to the selected pattern
- Choose any root note (C through B with sharps/flats)

### Marking & Playback
- **Ctrl-click** (Mac) or **Right-click** to mark/unmark individual keys
- Mark keys to create custom chord voicings or melodies
- **Play** button plays all marked keys simultaneously
- **Arpeggiate** mode plays marked keys as a sequence (ascending then descending)
- Visual pitch display with sharp/flat notation toggle
- Pitch class reduction option to show unique note names

### Keyboard Shortcuts
- **Space**: Play marked keys
- **Esc**: Clear all marked keys
- **2-5**: Transpose marked keys to octave 2, 3, 4, or 5 (preserves intervals)

### Music Theory Reference
- Dedicated **Chords** page with comprehensive chord chart
- Shows scale degrees for triads, suspended chords, add chords, 7th chords, 9th chords, and 11th chords
- Progressive detail levels (Extend/Simplify buttons)

## Technical Details

Built with:
- **React 19** with TypeScript
- **Vite** for fast development and optimized builds
- **Web Audio API** for sound generation
- **React Router** for navigation
- Fully typed with TypeScript for better developer experience

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to use the app.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy

```bash
npm run deploy
```

Deploys to GitHub Pages.

## Usage Tips

1. **Learning scales**: Select a root note and scale type to see all notes highlighted on the keyboard
2. **Building chords**: Use Ctrl-click to mark individual notes and experiment with different voicings
3. **Ear training**: Mark notes of a chord, play them together, then use arpeggiate to hear each note individually
4. **Transposition practice**: Mark a pattern in one octave, then press 2-5 to instantly move it to different registers
5. **Creating melodies**: Mark a sequence of notes, then play with arpeggiate to hear your melody

## Browser Compatibility

Works in all modern browsers with Web Audio API support:
- Chrome/Edge 89+
- Firefox 88+
- Safari 14.1+

Mobile browsers supported with touch interaction.

## License

MIT
