import { useState } from 'react';
import './Chords.css';

function Chords() {
  const [extensionLevel, setExtensionLevel] = useState(0);

  const handleExtend = () => {
    setExtensionLevel(prev => Math.min(prev + 1, 2));
  };

  return (
    <div className="chords-container">
      <h1>Chords</h1>
      <div className="chord-table-container">
        <table className="chord-table">
          <thead>
            <tr>
              <th>Triad</th>
              <th className="scale-degree">1</th>
              <th className="scale-degree">2</th>
              <th className="scale-degree">3</th>
              <th className="scale-degree">4</th>
              <th className="scale-degree">5</th>
              <th className="scale-degree">6</th>
              <th className="scale-degree">7</th>
              {extensionLevel >= 2 && <th className="scale-degree">8</th>}
              {extensionLevel >= 2 && <th className="scale-degree">9</th>}
              <th>Example</th>
              <th>Shorthand</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Major</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">3</td>
              <td></td>
              <td className="scale-degree">5</td>
              <td></td>
              <td></td>
              {extensionLevel >= 2 && <td></td>}
              {extensionLevel >= 2 && <td></td>}
              <td>C Major</td>
              <td>C</td>
            </tr>
            <tr>
              <th>Minor</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">♭3</td>
              <td></td>
              <td className="scale-degree">5</td>
              <td></td>
              <td></td>
              {extensionLevel >= 2 && <td></td>}
              {extensionLevel >= 2 && <td></td>}
              <td>C Minor</td>
              <td>Cm</td>
            </tr>
            <tr>
              <th>Diminished</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">♭3</td>
              <td></td>
              <td className="scale-degree">♭5</td>
              <td></td>
              <td></td>
              {extensionLevel >= 2 && <td></td>}
              {extensionLevel >= 2 && <td></td>}
              <td>C Diminished</td>
              <td>C°</td>
            </tr>
            <tr>
              <th>Augmented</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">3</td>
              <td></td>
              <td className="scale-degree">♯5</td>
              <td></td>
              <td></td>
              {extensionLevel >= 2 && <td></td>}
              {extensionLevel >= 2 && <td></td>}
              <td>C Augmented</td>
              <td>C+</td>
            </tr>
            <tr className="section-header">
              <th>Suspended Chord</th>
              <th className="scale-degree">1</th>
              <th className="scale-degree">2</th>
              <th className="scale-degree">3</th>
              <th className="scale-degree">4</th>
              <th className="scale-degree">5</th>
              <th className="scale-degree">6</th>
              <th className="scale-degree">7</th>
              {extensionLevel >= 2 && <th className="scale-degree">8</th>}
              {extensionLevel >= 2 && <th className="scale-degree">9</th>}
              <th>Example</th>
              <th>Shorthand</th>
            </tr>
            <tr>
              <th>Sus2</th>
              <td className="scale-degree">1</td>
              <td className="scale-degree">2</td>
              <td></td>
              <td></td>
              <td className="scale-degree">5</td>
              <td></td>
              <td></td>
              {extensionLevel >= 2 && <td></td>}
              {extensionLevel >= 2 && <td></td>}
              <td>C Sus2</td>
              <td>
                C<sup>sus2</sup>
              </td>
            </tr>
            <tr>
              <th>Sus4</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td></td>
              <td className="scale-degree">4</td>
              <td className="scale-degree">5</td>
              <td></td>
              <td></td>
              {extensionLevel >= 2 && <td></td>}
              {extensionLevel >= 2 && <td></td>}
              <td>C Sus4</td>
              <td>
                C<sup>sus4</sup>
              </td>
            </tr>
            <tr className="section-header">
              <th>Add Chord</th>
              <th className="scale-degree">1</th>
              <th className="scale-degree">2</th>
              <th className="scale-degree">3</th>
              <th className="scale-degree">4</th>
              <th className="scale-degree">5</th>
              <th className="scale-degree">6</th>
              <th className="scale-degree">7</th>
              {extensionLevel >= 2 && <th className="scale-degree">8</th>}
              {extensionLevel >= 2 && <th className="scale-degree">9</th>}
              <th>Example</th>
              <th>Shorthand</th>
            </tr>
            <tr>
              <th>Add2 / Add9</th>
              <td className="scale-degree">1</td>
              <td className="scale-degree">2</td>
              <td className="scale-degree">3</td>
              <td></td>
              <td className="scale-degree">5</td>
              <td></td>
              <td></td>
              {extensionLevel >= 2 && <td></td>}
              {extensionLevel >= 2 && <td></td>}
              <td>C Add2 / C Add9</td>
              <td>
                C<sup>add2</sup> / C<sup>add9</sup>
              </td>
            </tr>
            <tr>
              <th>Add4</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">3</td>
              <td className="scale-degree">4</td>
              <td className="scale-degree">5</td>
              <td></td>
              <td></td>
              {extensionLevel >= 2 && <td></td>}
              {extensionLevel >= 2 && <td></td>}
              <td>C Add4</td>
              <td>
                C<sup>add4</sup>
              </td>
            </tr>
            <tr>
              <th>Add6</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">3</td>
              <td></td>
              <td className="scale-degree">5</td>
              <td className="scale-degree">6</td>
              <td></td>
              {extensionLevel >= 2 && <td></td>}
              {extensionLevel >= 2 && <td></td>}
              <td>C Add6</td>
              <td>
                C<sup>6</sup>
              </td>
            </tr>
            {extensionLevel >= 1 && (
              <>
                <tr className="section-header">
                  <th>Seventh Chord</th>
                  <th className="scale-degree">1</th>
                  <th className="scale-degree">2</th>
                  <th className="scale-degree">3</th>
                  <th className="scale-degree">4</th>
                  <th className="scale-degree">5</th>
                  <th className="scale-degree">6</th>
                  <th className="scale-degree">7</th>
                  {extensionLevel >= 2 && <th className="scale-degree">8</th>}
                  {extensionLevel >= 2 && <th className="scale-degree">9</th>}
                  <th>Example</th>
                  <th>Shorthand</th>
            </tr>
            <tr>
              <th>Major 7</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">3</td>
              <td></td>
              <td className="scale-degree">5</td>
              <td></td>
              <td className="scale-degree">7</td>
              {extensionLevel >= 2 && <td></td>}
              {extensionLevel >= 2 && <td></td>}
              <td>C Major 7</td>
              <td>
                C<sup>maj7</sup>
              </td>
            </tr>
            <tr>
              <th>Dominant 7</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">3</td>
              <td></td>
              <td className="scale-degree">5</td>
              <td></td>
              <td className="scale-degree">♭7</td>
              {extensionLevel >= 2 && <td></td>}
              {extensionLevel >= 2 && <td></td>}
              <td>C Dominant 7</td>
              <td>
                C<sup>7</sup>
              </td>
            </tr>
            <tr>
              <th>Minor 7</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">♭3</td>
              <td></td>
              <td className="scale-degree">5</td>
              <td></td>
              <td className="scale-degree">♭7</td>
              {extensionLevel >= 2 && <td></td>}
              {extensionLevel >= 2 && <td></td>}
              <td>C Minor 7</td>
              <td>
                Cm<sup>7</sup>
              </td>
            </tr>
            <tr>
              <th>Half-Diminished 7</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">♭3</td>
              <td></td>
              <td className="scale-degree">♭5</td>
              <td></td>
              <td className="scale-degree">♭7</td>
              {extensionLevel >= 2 && <td></td>}
              {extensionLevel >= 2 && <td></td>}
              <td>C Half-Diminished 7</td>
              <td>
                C<sup>ø7</sup>
              </td>
            </tr>
            <tr>
              <th>Fully-Diminished 7</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">♭3</td>
              <td></td>
              <td className="scale-degree">♭5</td>
              <td></td>
              <td className="scale-degree">𝄫7</td>
              {extensionLevel >= 2 && <td></td>}
              {extensionLevel >= 2 && <td></td>}
              <td>C Fully-Diminished 7</td>
              <td>
                C°<sup>7</sup>
              </td>
            </tr>
            <tr>
              <th>Minor-Major 7</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">♭3</td>
              <td></td>
              <td className="scale-degree">5</td>
              <td></td>
              <td className="scale-degree">7</td>
              {extensionLevel >= 2 && <td></td>}
              {extensionLevel >= 2 && <td></td>}
              <td>C Minor-Major 7</td>
              <td>
                Cm<sup>maj7</sup>
              </td>
            </tr>
            <tr>
              <th>7Sus4</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td></td>
              <td className="scale-degree">4</td>
              <td className="scale-degree">5</td>
              <td></td>
              <td className="scale-degree">♭7</td>
              {extensionLevel >= 2 && <td></td>}
              {extensionLevel >= 2 && <td></td>}
              <td>C7 Sus4</td>
              <td>
                C<sup>7sus4</sup>
              </td>
            </tr>
              </>
            )}
            {extensionLevel >= 2 && (
              <>
                <tr className="section-header">
                  <th>9th Chord</th>
                  <th className="scale-degree">1</th>
                  <th className="scale-degree">2</th>
                  <th className="scale-degree">3</th>
                  <th className="scale-degree">4</th>
                  <th className="scale-degree">5</th>
                  <th className="scale-degree">6</th>
                  <th className="scale-degree">7</th>
                  <th className="scale-degree">8</th>
                  <th className="scale-degree">9</th>
                  <th>Example</th>
                  <th>Shorthand</th>
            </tr>
            <tr>
              <th>Major 9</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">3</td>
              <td></td>
              <td className="scale-degree">5</td>
              <td></td>
              <td className="scale-degree">7</td>
              <td></td>
              <td className="scale-degree">9</td>
              <td>C Major 9</td>
              <td>
                C<sup>maj9</sup>
              </td>
            </tr>
            <tr>
              <th>Dominant 9</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">3</td>
              <td></td>
              <td className="scale-degree">5</td>
              <td></td>
              <td className="scale-degree">♭7</td>
              <td></td>
              <td className="scale-degree">9</td>
              <td>C Dominant 9</td>
              <td>
                C<sup>9</sup>
              </td>
            </tr>
            <tr>
              <th>Minor 9</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">♭3</td>
              <td></td>
              <td className="scale-degree">5</td>
              <td></td>
              <td className="scale-degree">♭7</td>
              <td></td>
              <td className="scale-degree">9</td>
              <td>C Minor 9</td>
              <td>
                Cm<sup>9</sup>
              </td>
            </tr>
            <tr>
              <th>Minor-Major 9</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">♭3</td>
              <td></td>
              <td className="scale-degree">5</td>
              <td></td>
              <td className="scale-degree">7</td>
              <td></td>
              <td className="scale-degree">9</td>
              <td>C Minor-Major 9</td>
              <td>
                Cm<sup>maj9</sup>
              </td>
            </tr>
            <tr>
              <th>Dominant 7♭9</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">3</td>
              <td></td>
              <td className="scale-degree">5</td>
              <td></td>
              <td className="scale-degree">♭7</td>
              <td></td>
              <td className="scale-degree">♭9</td>
              <td>C7♭9</td>
              <td>
                C<sup>7♭9</sup>
              </td>
            </tr>
            <tr>
              <th>Dominant 7♯9</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">3</td>
              <td></td>
              <td className="scale-degree">5</td>
              <td></td>
              <td className="scale-degree">♭7</td>
              <td></td>
              <td className="scale-degree">♯9</td>
              <td>C7♯9</td>
              <td>
                C<sup>7♯9</sup>
              </td>
            </tr>
            <tr>
              <th>6/9</th>
              <td className="scale-degree">1</td>
              <td></td>
              <td className="scale-degree">3</td>
              <td></td>
              <td className="scale-degree">5</td>
              <td className="scale-degree">6</td>
              <td></td>
              <td></td>
              <td className="scale-degree">9</td>
              <td>C 6/9</td>
              <td>
                C<sup>6/9</sup>
              </td>
            </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      {extensionLevel < 2 && (
        <button onClick={handleExtend} className="extend-button">
          {extensionLevel === 0 ? 'Extend to 7th Chords' : 'Extend to 9th Chords'}
        </button>
      )}
    </div>
  );
}

export default Chords;
