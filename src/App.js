import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GameMenu from './pages/GameMenu.js';
import Game from './pages/Game.js';
import PlayerNamesForm from './pages/PlayerNamesForm';

function App() 
{
  return (
    
    <Router>
        <Routes>
            <Route path = "/" element = { <GameMenu />} />
            <Route path = "/names" element = { <PlayerNamesForm />} />
            <Route path = "/game" element = { <Game />} />
        </Routes>
    </Router>
  );

}

export default App;
