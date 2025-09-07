import './Chords.css';

function Chords() {
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
              <td>C Augmented</td>
              <td>C+</td>
            </tr>
            <tr className="section-header">
              <th>Seventh Chord</th>
              <th className="scale-degree">1</th>
              <th className="scale-degree">2</th>
              <th className="scale-degree">3</th>
              <th className="scale-degree">4</th>
              <th className="scale-degree">5</th>
              <th className="scale-degree">6</th>
              <th className="scale-degree">7</th>
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
              <td>C Minor-Major 7</td>
              <td>
                Cm<sup>maj7</sup>
              </td>
            </tr>
            <tr className="section-header">
              <th>Sus Chord</th>
              <th className="scale-degree">1</th>
              <th className="scale-degree">2</th>
              <th className="scale-degree">3</th>
              <th className="scale-degree">4</th>
              <th className="scale-degree">5</th>
              <th className="scale-degree">6</th>
              <th className="scale-degree">7</th>
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
              <td>C Sus4</td>
              <td>
                C<sup>sus4</sup>
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
              <td>C 7Sus4</td>
              <td>
                C<sup>7sus4</sup>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Chords;
