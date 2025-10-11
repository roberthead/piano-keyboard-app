import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PatternControls from './PatternControls';
import { PITCH_CLASSES, PATTERN_GROUPS } from '../constants';

describe('PatternControls', () => {
  const defaultProps = {
    rootNote: 'C' as const,
    selectedScale: 'None',
    selectedChord: 'None',
    selectedInterval: 'None',
    onRootNoteChange: vi.fn(),
    onScaleChange: vi.fn(),
    onChordChange: vi.fn(),
    onIntervalChange: vi.fn(),
  };

  describe('rendering', () => {
    it('renders all four dropdowns', () => {
      render(<PatternControls {...defaultProps} />);

      expect(screen.getByLabelText(/root/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/interval/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/chord/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/scale/i)).toBeInTheDocument();
    });

    it('renders all pitch classes in root dropdown', () => {
      render(<PatternControls {...defaultProps} />);

      const rootSelect = screen.getByLabelText(/root/i);
      const options = Array.from(rootSelect.querySelectorAll('option'));

      expect(options).toHaveLength(PITCH_CLASSES.length);
      expect(options.map(o => o.value)).toEqual(PITCH_CLASSES);
    });

    it('displays enharmonic equivalents for sharp notes', () => {
      render(<PatternControls {...defaultProps} />);

      const rootSelect = screen.getByLabelText(/root/i);

      expect(rootSelect.querySelector('option[value="C#"]')?.textContent).toBe('C#/Db');
      expect(rootSelect.querySelector('option[value="D#"]')?.textContent).toBe('D#/Eb');
      expect(rootSelect.querySelector('option[value="F#"]')?.textContent).toBe('F#/Gb');
      expect(rootSelect.querySelector('option[value="G#"]')?.textContent).toBe('G#/Ab');
      expect(rootSelect.querySelector('option[value="A#"]')?.textContent).toBe('A#/Bb');
    });

    it('renders interval options from PATTERN_GROUPS[2]', () => {
      render(<PatternControls {...defaultProps} />);

      const intervalSelect = screen.getByLabelText(/interval/i);
      const options = Array.from(intervalSelect.querySelectorAll('option'));

      expect(options).toHaveLength(PATTERN_GROUPS[2].options.length + 1); // +1 for "None"
      expect(options[0].value).toBe('None');
    });

    it('renders chord options from PATTERN_GROUPS[1]', () => {
      render(<PatternControls {...defaultProps} />);

      const chordSelect = screen.getByLabelText(/chord/i);
      const options = Array.from(chordSelect.querySelectorAll('option'));

      expect(options).toHaveLength(PATTERN_GROUPS[1].options.length + 1); // +1 for "None"
      expect(options[0].value).toBe('None');
    });

    it('renders scale options from PATTERN_GROUPS[0]', () => {
      render(<PatternControls {...defaultProps} />);

      const scaleSelect = screen.getByLabelText(/scale/i);
      const options = Array.from(scaleSelect.querySelectorAll('option'));

      expect(options).toHaveLength(PATTERN_GROUPS[0].options.length + 1); // +1 for "None"
      expect(options[0].value).toBe('None');
    });
  });

  describe('root note selection', () => {
    it('calls onRootNoteChange when root note changes', async () => {
      const user = userEvent.setup();
      const onRootNoteChange = vi.fn();

      render(<PatternControls {...defaultProps} onRootNoteChange={onRootNoteChange} />);

      const rootSelect = screen.getByLabelText(/root/i);
      await user.selectOptions(rootSelect, 'G');

      expect(onRootNoteChange).toHaveBeenCalledWith('G');
    });

    it('displays the selected root note', () => {
      render(<PatternControls {...defaultProps} rootNote="F#" />);

      const rootSelect = screen.getByLabelText(/root/i) as HTMLSelectElement;
      expect(rootSelect.value).toBe('F#');
    });
  });

  describe('interval selection', () => {
    it('calls onIntervalChange when interval changes', async () => {
      const user = userEvent.setup();
      const onIntervalChange = vi.fn();

      render(<PatternControls {...defaultProps} onIntervalChange={onIntervalChange} />);

      const intervalSelect = screen.getByLabelText(/interval/i);
      const intervalOption = PATTERN_GROUPS[2].options[0].value;
      await user.selectOptions(intervalSelect, intervalOption);

      expect(onIntervalChange).toHaveBeenCalledWith(intervalOption);
    });

    it('clears scale and chord when selecting an interval', async () => {
      const user = userEvent.setup();
      const onScaleChange = vi.fn();
      const onChordChange = vi.fn();

      render(
        <PatternControls
          {...defaultProps}
          onScaleChange={onScaleChange}
          onChordChange={onChordChange}
        />
      );

      const intervalSelect = screen.getByLabelText(/interval/i);
      const intervalOption = PATTERN_GROUPS[2].options[0].value;
      await user.selectOptions(intervalSelect, intervalOption);

      expect(onScaleChange).toHaveBeenCalledWith('None');
      expect(onChordChange).toHaveBeenCalledWith('None');
    });

    it('does not clear scale and chord when selecting None', async () => {
      const user = userEvent.setup();
      const onScaleChange = vi.fn();
      const onChordChange = vi.fn();

      render(
        <PatternControls
          {...defaultProps}
          onScaleChange={onScaleChange}
          onChordChange={onChordChange}
        />
      );

      const intervalSelect = screen.getByLabelText(/interval/i);
      await user.selectOptions(intervalSelect, 'None');

      expect(onScaleChange).not.toHaveBeenCalled();
      expect(onChordChange).not.toHaveBeenCalled();
    });
  });

  describe('chord selection', () => {
    it('calls onChordChange when chord changes', async () => {
      const user = userEvent.setup();
      const onChordChange = vi.fn();

      render(<PatternControls {...defaultProps} onChordChange={onChordChange} />);

      const chordSelect = screen.getByLabelText(/chord/i);
      const chordOption = PATTERN_GROUPS[1].options[0].value;
      await user.selectOptions(chordSelect, chordOption);

      expect(onChordChange).toHaveBeenCalledWith(chordOption);
    });

    it('clears scale and interval when selecting a chord', async () => {
      const user = userEvent.setup();
      const onScaleChange = vi.fn();
      const onIntervalChange = vi.fn();

      render(
        <PatternControls
          {...defaultProps}
          onScaleChange={onScaleChange}
          onIntervalChange={onIntervalChange}
        />
      );

      const chordSelect = screen.getByLabelText(/chord/i);
      const chordOption = PATTERN_GROUPS[1].options[0].value;
      await user.selectOptions(chordSelect, chordOption);

      expect(onScaleChange).toHaveBeenCalledWith('None');
      expect(onIntervalChange).toHaveBeenCalledWith('None');
    });

    it('does not clear scale and interval when selecting None', async () => {
      const user = userEvent.setup();
      const onScaleChange = vi.fn();
      const onIntervalChange = vi.fn();

      render(
        <PatternControls
          {...defaultProps}
          onScaleChange={onScaleChange}
          onIntervalChange={onIntervalChange}
        />
      );

      const chordSelect = screen.getByLabelText(/chord/i);
      await user.selectOptions(chordSelect, 'None');

      expect(onScaleChange).not.toHaveBeenCalled();
      expect(onIntervalChange).not.toHaveBeenCalled();
    });
  });

  describe('scale selection', () => {
    it('calls onScaleChange when scale changes', async () => {
      const user = userEvent.setup();
      const onScaleChange = vi.fn();

      render(<PatternControls {...defaultProps} onScaleChange={onScaleChange} />);

      const scaleSelect = screen.getByLabelText(/scale/i);
      const scaleOption = PATTERN_GROUPS[0].options[0].value;
      await user.selectOptions(scaleSelect, scaleOption);

      expect(onScaleChange).toHaveBeenCalledWith(scaleOption);
    });

    it('clears chord and interval when selecting a scale', async () => {
      const user = userEvent.setup();
      const onChordChange = vi.fn();
      const onIntervalChange = vi.fn();

      render(
        <PatternControls
          {...defaultProps}
          onChordChange={onChordChange}
          onIntervalChange={onIntervalChange}
        />
      );

      const scaleSelect = screen.getByLabelText(/scale/i);
      const scaleOption = PATTERN_GROUPS[0].options[0].value;
      await user.selectOptions(scaleSelect, scaleOption);

      expect(onChordChange).toHaveBeenCalledWith('None');
      expect(onIntervalChange).toHaveBeenCalledWith('None');
    });

    it('does not clear chord and interval when selecting None', async () => {
      const user = userEvent.setup();
      const onChordChange = vi.fn();
      const onIntervalChange = vi.fn();

      render(
        <PatternControls
          {...defaultProps}
          onChordChange={onChordChange}
          onIntervalChange={onIntervalChange}
        />
      );

      const scaleSelect = screen.getByLabelText(/scale/i);
      await user.selectOptions(scaleSelect, 'None');

      expect(onChordChange).not.toHaveBeenCalled();
      expect(onIntervalChange).not.toHaveBeenCalled();
    });
  });

  describe('mutual exclusivity', () => {
    it('maintains mutual exclusivity: interval > chord > scale', async () => {
      const user = userEvent.setup();
      const props = {
        ...defaultProps,
        selectedScale: 'major',
        selectedChord: 'None',
        selectedInterval: 'None',
      };

      render(<PatternControls {...props} />);

      const intervalSelect = screen.getByLabelText(/interval/i);
      const intervalOption = PATTERN_GROUPS[2].options[0].value;
      await user.selectOptions(intervalSelect, intervalOption);

      expect(props.onScaleChange).toHaveBeenCalledWith('None');
      expect(props.onChordChange).toHaveBeenCalledWith('None');
    });

    it('displays the selected pattern values correctly', () => {
      // Test with scale selected
      const scaleValue = PATTERN_GROUPS[0].options[0].value;
      const { rerender } = render(
        <PatternControls
          {...defaultProps}
          selectedScale={scaleValue}
        />
      );

      let scaleSelect = screen.getByLabelText(/scale/i) as HTMLSelectElement;
      expect(scaleSelect.value).toBe(scaleValue);

      // Test with chord selected
      const chordValue = PATTERN_GROUPS[1].options[0].value;
      rerender(
        <PatternControls
          {...defaultProps}
          selectedChord={chordValue}
        />
      );

      const chordSelect = screen.getByLabelText(/chord/i) as HTMLSelectElement;
      expect(chordSelect.value).toBe(chordValue);

      // Test with interval selected
      const intervalValue = PATTERN_GROUPS[2].options[0].value;
      rerender(
        <PatternControls
          {...defaultProps}
          selectedInterval={intervalValue}
        />
      );

      const intervalSelect = screen.getByLabelText(/interval/i) as HTMLSelectElement;
      expect(intervalSelect.value).toBe(intervalValue);
    });
  });
});
