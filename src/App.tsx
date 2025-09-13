import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Keyboard from './components/Keyboard';
import Chords from './components/Chords';
import './App.css';

function NavBar() {
  const location = useLocation();
  
  return (
    <nav className="nav-bar">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Keyboard</Link>
      <Link to="/chords" className={location.pathname === '/chords' ? 'active' : ''}>Chords</Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Keyboard />} />
          <Route path="/chords" element={<Chords />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
