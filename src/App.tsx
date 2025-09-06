import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Piano from './components/Piano';
import Chords from './components/Chords';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav-bar">
          <Link to="/">Piano</Link>
          <Link to="/chords">Chords</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Piano />} />
          <Route path="/chords" element={<Chords />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
